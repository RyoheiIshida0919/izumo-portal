export interface Image {
  url: string;
  alt: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  area: string;
  categories: string[];
  subcategories: string[];
  tags: string[];
  targetAges: string[];
  summary: string;
  body: string;
  address?: string;
  access?: string;
  phone?: string;
  website?: string;
  instagram?: string;
  hours?: string;
  closedDays?: string;
  parking?: string;
  price?: string;
  images: Image[];
  isFeatured: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  area: string;
  categories: string[];
  subcategories: string[];
  tags: string[];
  targetAges: string[];
  summary: string;
  body: string;
  venue?: string;
  startAt: string;
  endAt?: string;
  fee?: string;
  reservationUrl?: string;
  organizer?: string;
  contact?: string;
  images: Image[];
  isFeatured: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface SearchFilters {
  keyword: string;
  area: string;
  category: string;
  subcategory: string;
  targetAge: string;
  tags: string[];
}

export type SortOption = 'newest' | 'popular';
