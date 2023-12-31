import { z } from 'zod';

const createAdminZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.enum(['admin'], {
      required_error: 'role is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'last name is required',
      }),
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};
