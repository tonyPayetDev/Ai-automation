import React, { useEffect, useRef } from 'react';

/**
 * Header animé "shader liquide" (style motionsites.ai) : un fragment shader WebGL
 * fait couler une nappe de lumière néon (teal → bleu → violet) par domain-warping
 * de bruit fbm. Repli automatique sur une aurora canvas-2D si WebGL est indispo.
 * - respecte prefers-reduced-motion (temps figé)
 * - pause hors viewport (IntersectionObserver)
 */

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2  u_res;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  f=f*f*(3.0-2.0*f);
  float a=hash(i), b=hash(i+vec2(1.,0.)), c=hash(i+vec2(0.,1.)), d=hash(i+vec2(1.,1.));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}
float fbm(vec2 p){ float v=0.0, amp=0.5; for(int i=0;i<5;i++){ v+=amp*noise(p); p*=2.02; amp*=0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv; p.x *= u_res.x/u_res.y;
  float t = u_time*0.05;
  vec2 q = vec2(fbm(p*1.6 + vec2(0.0,t)), fbm(p*1.6 + vec2(5.2,-t)));
  vec2 r = vec2(fbm(p*1.6 + 4.0*q + vec2(1.7,9.2) + t*0.5), fbm(p*1.6 + 4.0*q + vec2(8.3,2.8) - t*0.5));
  float f = fbm(p*1.6 + 3.5*r);
  vec3 base = vec3(0.047,0.051,0.094);   // #0C0D18
  vec3 teal = vec3(0.239,0.769,0.761);   // #3DC4C2
  vec3 blue = vec3(0.227,0.549,0.863);
  vec3 viol = vec3(0.486,0.361,1.0);
  vec3 col = base;
  col = mix(col, teal, smoothstep(0.32,0.95,f)*0.55);
  col = mix(col, viol, smoothstep(0.55,1.0,r.x)*0.30);
  col = mix(col, blue, smoothstep(0.40,0.95,q.y)*0.22);
  float d = distance(uv, vec2(0.5));
  col *= smoothstep(1.15,0.15,d);        // vignette → lisibilité du texte
  col = mix(base, col, 0.92);
  gl_FragColor = vec4(col,1.0);
}`;

const VERT = `attribute vec2 a; void main(){ gl_Position=vec4(a,0.0,1.0); }`;

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let W = 0, H = 0, raf = 0, running = true, t0 = performance.now();
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

    // ---------- Chemin WebGL (shader liquide) ----------
    if (gl) {
      const compile = (type: number, src: string) => {
        const s = gl.createShader(type)!; gl.shaderSource(s, src); gl.compileShader(s);
        return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
      };
      const vs = compile(gl.VERTEX_SHADER, VERT);
      const fs = compile(gl.FRAGMENT_SHADER, FRAG);
      if (vs && fs) {
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
        if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
          gl.useProgram(prog);
          const buf = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
          const loc = gl.getAttribLocation(prog, 'a');
          gl.enableVertexAttribArray(loc);
          gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
          const uTime = gl.getUniformLocation(prog, 'u_time');
          const uRes = gl.getUniformLocation(prog, 'u_res');

          const resize = () => {
            const parent = canvas.parentElement!; W = parent.clientWidth; H = parent.clientHeight;
            canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
            canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uRes, canvas.width, canvas.height);
          };
          const render = () => {
            if (!running) return;
            const t = reduce ? 12.0 : (performance.now() - t0) / 1000;
            gl.uniform1f(uTime, t);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            if (!reduce) raf = requestAnimationFrame(render);
          };
          resize();
          window.addEventListener('resize', resize);
          const io = new IntersectionObserver((e) => {
            const vis = e[0]?.isIntersecting;
            if (vis && !running && !reduce) { running = true; render(); }
            else if (!vis) { running = false; cancelAnimationFrame(raf); }
          }, { threshold: 0.02 });
          io.observe(canvas);
          render();
          return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); io.disconnect(); };
        }
      }
    }

    // ---------- Repli canvas-2D (aurora) ----------
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const palette = ['61,196,194', '61,196,194', '58,140,220', '124,92,255'];
    type Blob = { hue: string; r: number; ax: number; ay: number; bx: number; by: number; sx: number; sy: number; ph: number; a: number };
    let blobs: Blob[] = []; let t = 0;
    const build = () => {
      const base = Math.max(W, H);
      blobs = Array.from({ length: 6 }, (_, i) => ({
        hue: palette[i % palette.length], r: base * (0.28 + Math.random() * 0.22),
        ax: Math.random() * W, ay: Math.random() * H, bx: 0.12 + Math.random() * 0.2, by: 0.1 + Math.random() * 0.18,
        sx: 0.05 + Math.random() * 0.12, sy: 0.05 + Math.random() * 0.12, ph: Math.random() * Math.PI * 2, a: 0.1 + Math.random() * 0.1,
      }));
    };
    const resize = () => {
      const parent = canvas.parentElement!; W = parent.clientWidth; H = parent.clientHeight;
      canvas.width = Math.floor(W * dpr); canvas.height = Math.floor(H * dpr);
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); build(); if (reduce) draw();
    };
    const draw = () => {
      ctx.globalCompositeOperation = 'source-over'; ctx.fillStyle = '#0C0D18'; ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';
      for (const b of blobs) {
        const x = b.ax + Math.sin(t * b.sx + b.ph) * W * b.bx;
        const y = b.ay + Math.cos(t * b.sy + b.ph * 1.3) * H * b.by;
        const g = ctx.createRadialGradient(x, y, 0, x, y, b.r);
        g.addColorStop(0, `rgba(${b.hue},${b.a})`); g.addColorStop(0.5, `rgba(${b.hue},${b.a * 0.35})`); g.addColorStop(1, `rgba(${b.hue},0)`);
        ctx.fillStyle = g; ctx.fillRect(x - b.r, y - b.r, b.r * 2, b.r * 2);
      }
      ctx.globalCompositeOperation = 'source-over';
      const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.2, W / 2, H / 2, Math.max(W, H) * 0.75);
      vg.addColorStop(0, 'rgba(12,13,24,0)'); vg.addColorStop(1, 'rgba(12,13,24,0.72)');
      ctx.fillStyle = vg; ctx.fillRect(0, 0, W, H);
    };
    const loop = () => { if (!running) return; t += 0.016; draw(); raf = requestAnimationFrame(loop); };
    resize(); window.addEventListener('resize', resize);
    const io = new IntersectionObserver((e) => {
      const vis = e[0]?.isIntersecting;
      if (vis && !running && !reduce) { running = true; loop(); }
      else if (!vis) { running = false; cancelAnimationFrame(raf); }
    }, { threshold: 0.02 });
    io.observe(canvas);
    if (!reduce) loop(); else draw();
    return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); io.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />
  );
};

export default HeroBackground;
