import React, { useEffect, useRef } from 'react';

/**
 * Portrait "liquide néon" : le visage de Tony émerge d'une nappe de lumière qui
 * coule (fragment shader fbm domain-warp), modulée par la luminance du visage.
 * Ce n'est plus une photo — le visage est fait de matière animée.
 * Repli : portrait duotone teal statique si WebGL indispo.
 */
const FRAG = `
precision highp float;
uniform float u_time; uniform vec2 u_res; uniform sampler2D u_face;
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.0-2.0*f);
  float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.));
  return mix(mix(a,b,f.x),mix(c,d,f.x),f.y); }
float fbm(vec2 p){ float v=0.0,amp=0.5; for(int i=0;i<5;i++){v+=amp*noise(p);p*=2.02;amp*=0.5;} return v; }
void main(){
  vec2 uv = gl_FragCoord.xy/u_res.xy;
  vec2 fuv = vec2(uv.x, 1.0-uv.y);          // flip Y pour la texture
  vec3 face = texture2D(u_face, fuv).rgb;
  float lum = dot(face, vec3(0.299,0.587,0.114));
  vec2 p = uv; p.x *= u_res.x/u_res.y;
  float t = u_time*0.06;
  vec2 q = vec2(fbm(p*2.2+vec2(0.,t)), fbm(p*2.2+vec2(5.2,-t)));
  vec2 r = vec2(fbm(p*2.2+4.0*q+vec2(1.7,9.2)+t*0.5), fbm(p*2.2+4.0*q+vec2(8.3,2.8)-t*0.5));
  float f = fbm(p*2.2+3.5*r);
  vec3 teal=vec3(0.239,0.769,0.761), blue=vec3(0.227,0.549,0.863), viol=vec3(0.486,0.361,1.0);
  vec3 liquid = teal*(0.35+0.75*f) + viol*smoothstep(0.55,1.0,r.x)*0.5 + blue*smoothstep(0.4,0.95,q.y)*0.35;
  // le visage émerge : la matière n'apparaît qu'où le visage est lumineux
  float mask = smoothstep(0.14,0.55,lum);
  vec3 col = liquid * (0.06 + 0.98*mask);
  // liseré néon sur les contours du visage
  float edge = smoothstep(0.30,0.45,lum) * (1.0-smoothstep(0.45,0.62,lum));
  col += teal * edge * 0.5;
  gl_FragColor = vec4(col, 1.0);
}`;
const VERT = `attribute vec2 a; void main(){ gl_Position=vec4(a,0.0,1.0); }`;
const FACE_SRC = 'hero-face.jpg';

const FaceReveal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    let raf = 0, running = true, t0 = performance.now();
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    const img = new Image();

    const fit = () => {
      const parent = canvas.parentElement!;
      const w = parent.clientWidth, h = parent.clientHeight;
      canvas.width = Math.floor(w * dpr); canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      return { w, h };
    };

    // cover-fit du visage dans un canvas offscreen aux dimensions du rendu
    const coverCanvas = (iw: number, ih: number) => {
      const off = document.createElement('canvas');
      off.width = canvas.width; off.height = canvas.height;
      const o = off.getContext('2d')!;
      const s = Math.max(off.width / iw, off.height / ih);
      const dw = iw * s, dh = ih * s;
      o.drawImage(img, (off.width - dw) / 2, (off.height - dh) / 2, dw, dh);
      return off;
    };

    if (gl) {
      const compile = (ty: number, src: string) => { const s = gl.createShader(ty)!; gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
      const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
      if (vs && fs) {
        const prog = gl.createProgram()!; gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
        if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
          gl.useProgram(prog);
          const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
          const loc = gl.getAttribLocation(prog, 'a'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
          const uTime = gl.getUniformLocation(prog, 'u_time'), uRes = gl.getUniformLocation(prog, 'u_res'), uFace = gl.getUniformLocation(prog, 'u_face');
          const tex = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,255]));
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          gl.uniform1i(uFace, 0);
          let ready = false;
          const upload = () => { if (!img.complete || !img.naturalWidth) return; const off = coverCanvas(img.naturalWidth, img.naturalHeight); gl.bindTexture(gl.TEXTURE_2D, tex); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off); ready = true; };
          const resize = () => { fit(); gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(uRes, canvas.width, canvas.height); if (img.naturalWidth) upload(); };
          const render = () => { if (!running) return; const t = reduce ? 8.0 : (performance.now() - t0) / 1000; gl.uniform1f(uTime, t); if (ready) gl.drawArrays(gl.TRIANGLES, 0, 3); if (!reduce) raf = requestAnimationFrame(render); };
          img.onload = () => { resize(); render(); };
          img.src = FACE_SRC;
          resize();
          window.addEventListener('resize', resize);
          const io = new IntersectionObserver((e) => { const v = e[0]?.isIntersecting; if (v && !running && !reduce) { running = true; render(); } else if (!v) { running = false; cancelAnimationFrame(raf); } }, { threshold: 0.02 });
          io.observe(canvas);
          render();
          return () => { running = false; cancelAnimationFrame(raf); window.removeEventListener('resize', resize); io.disconnect(); };
        }
      }
    }

    // Repli : duotone teal statique
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const drawFallback = () => {
        const { w, h } = fit(); if (!img.naturalWidth) return;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.fillStyle = '#0C0D18'; ctx.fillRect(0, 0, w, h);
        const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
        const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
        ctx.globalAlpha = 0.9; ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
        ctx.globalCompositeOperation = 'color'; ctx.fillStyle = '#3DC4C2'; ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      };
      img.onload = drawFallback; img.src = FACE_SRC;
      window.addEventListener('resize', drawFallback);
      return () => window.removeEventListener('resize', drawFallback);
    }
  }, []);
  return <canvas ref={canvasRef} aria-hidden="true" className="w-full h-full block" />;
};

export default FaceReveal;
