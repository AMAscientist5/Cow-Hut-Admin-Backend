import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    role: z.enum(['seller', 'buyer']),
    password: z.string({
      required_error: 'Password is required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First name is required',
      }),
      lastName: z.string({
        required_error: 'First name is required',
      }),
    }),
    address: z.string({
      required_error: 'Address is required',
    }),
    budget: z.number({
      required_error: 'Budget is required',
    }),
    income: z.number({
      required_error: 'Income is required',
    }),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({}).optional(),
    password: z.string({}).optional(),
    name: z
      .object({
        firstName: z.string({}).optional(),
        lastName: z.string({}).optional(),
      })
      .optional(),
    address: z.string({}).optional(),
    budget: z.number({}).optional(),
    income: z.number({}).optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
