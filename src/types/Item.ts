// Base interface for common fields
export interface BaseItem {
  id: string;
  name?: string;
  hindi_name?: string;
  category?: string;
  price?: string;
  availability?: boolean;
}

// Product Shop Item
export interface ProductItem extends BaseItem {
  shopType: 'product';
  name: string; // required
  category: string; // required
  price: string; // required (range like "10-100")
  brand_name: string; // required
  hindi_name?: string;
  variety?: string[];
  packs?: number;
  availability?: boolean;
}

// Menu Shop Item
export interface MenuItem extends BaseItem {
  shopType: 'menu';
  name: string; // required
  category: string; // required
  isAvailable: boolean; // required
  hindi_name?: string;
  description?: string;
  price?: string;
  unit?: string;
  variety?: string[];
  imageUrl?: string;
}

// Service Details interface
export interface ServiceDetails {
  duration?: string;
  priceRange?: string;
  serviceCategory?: string;
  serviceName?: string;
  description?: string[];
  features?: string[];
  availability?: {
    days: string[];
    timeSlots: string[];
  };
}

// Service Shop Item
export interface ServiceItem extends BaseItem {
  shopType: 'service';
  description: string; // required
  name?: string;
  highlights?: string[];
  tags?: string[];
  price?: string;
  availability?: boolean;
  serviceDetails?: ServiceDetails;
}

// Union type for all items
export type Item = ProductItem | MenuItem | ServiceItem;

// Template interfaces for catalogs
export interface ProductTemplate {
  name: string;
  hindi_name: string;
  category: string;
  brand_name: string;
  typical_price_range: string;
  common_varieties: string[];
  typical_packs: number;
}

export interface MenuTemplate {
  name: string;
  hindi_name: string;
  category: string;
  description: string;
  typical_price: string;
  common_varieties: string[];
  unit: string;
}

export interface ServiceTemplate {
  name: string;
  description: string;
  category: string;
  highlights: string[];
  tags: string[];
  typical_price_range: string;
  serviceDetails: ServiceDetails;
}

export type ShopType = 'product' | 'menu' | 'service';