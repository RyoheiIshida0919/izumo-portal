import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const imageSchema = z.object({
  url: z.string(),
  alt: z.string(),
});

const serviceSchema = z.object({
  title: z.string(),
  slug: z.string(),
  area: z.string(),
  categories: z.array(z.string()),
  subcategories: z.array(z.string()),
  tags: z.array(z.string()),
  targetAges: z.array(z.string()),
  summary: z.string(),
  address: z.string().optional(),
  access: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  hours: z.string().optional(),
  closedDays: z.string().optional(),
  parking: z.string().optional(),
  price: z.string().optional(),
  images: z.array(imageSchema).default([]),
  isFeatured: z.boolean().default(false),
  updatedAt: z.string(),
  createdAt: z.string(),
});

const eventSchema = z.object({
  title: z.string(),
  slug: z.string(),
  area: z.string(),
  categories: z.array(z.string()),
  subcategories: z.array(z.string()),
  tags: z.array(z.string()),
  targetAges: z.array(z.string()),
  summary: z.string(),
  venue: z.string().optional(),
  startAt: z.string(),
  endAt: z.string().optional(),
  fee: z.string().optional(),
  reservationUrl: z.string().optional(),
  organizer: z.string().optional(),
  contact: z.string().optional(),
  images: z.array(imageSchema).default([]),
  isFeatured: z.boolean().default(false),
  updatedAt: z.string(),
  createdAt: z.string(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: serviceSchema,
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: eventSchema,
});

export const collections = { services, events };
