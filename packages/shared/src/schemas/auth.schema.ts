import * as z from 'zod';

const RoleEnum = z.enum(['USER', 'OWNER', 'ADMIN']);

export const RegisterSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password is too long'),
  name: z.string().min(2, 'Name must be 2 characters long').max(50, 'Name is too long'),
  role: z.enum(['USER', 'OWNER']),
});

export const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),

  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
