import { z } from 'zod'

export const registerSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().regex(/^9\d{9}$/, 'Must be 10 digits starting with 9'),
  password: z.string().min(8).max(128),
  province: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const loanSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().regex(/^9\d{9}$/),
  loanType: z.enum([
    'Agriculture Loan',
    'Business Loan',
    'Home Loan',
    'Education Loan',
    'Personal Loan',
  ]),
  amount: z.number().min(50_000).max(10_000_000),
  durationMonths: z.number().int().min(6).max(240),
  purpose: z.string().max(1000).optional(),
})