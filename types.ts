
import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface BoostOfferConfig {
  id: string;
  active: boolean;
  name: string;
  title: string;
  subtitle: string;
  problems: string[];
  solution1: {
    title: string;
    description: string;
    items: string[];
  };
  solution2: {
    title: string;
    description: string;
    steps: { title: string; desc: string; icon: string }[];
  };
  pricing: {
    originalPrice: string;
    discountedPrice: string;
    label: string;
    footerNote: string;
  };
}
