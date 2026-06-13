import { z } from 'zod';

export const CreateVenueSchema = z.object({
  name: z.string().min(2, 'Name should be at least 2 characters long'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 ')
    .max(1000, 'description is too long'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City name is required'),
  state: z.string().min(1, 'State is required'),
  capacity: z.number().int().positive(),
  pricePerHour: z.number().positive(),
  amenities: z.array(z.string()),
  images: z.array(z.string()).default([]),
});

export const UpdateVenueSchema = CreateVenueSchema.partial();
export const QueryVenueSchema = z.object({
  city: z.string().optional(),
  minPrice: z.coerce.number().positive().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  capacity: z.coerce.number().int().positive().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().default(10),
});

export type CreateVenueInput = z.infer<typeof CreateVenueSchema>;
export type UpdateVenueInput = z.infer<typeof UpdateVenueSchema>;
export type QueryVenueInput = z.infer<typeof QueryVenueSchema>;
