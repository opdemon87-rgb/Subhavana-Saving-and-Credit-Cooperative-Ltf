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
    'Fixed Deposit',
    'Regular Savings',
    'Recurring Deposit',
  ]),
  amount: z.number().min(50_000).max(10_000_000),
  durationMonths: z.number().int().min(6).max(240),
  purpose: z.string().max(1000).optional(),
})

const blankToUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value

export const supportRequestSchema = z
  .object({
    anonymous: z.boolean().default(false),
    fullName: z.preprocess(
      blankToUndefined,
      z.string().trim().min(2).max(120).optional(),
    ),
    email: z.preprocess(
      blankToUndefined,
      z.string().trim().email().max(254).optional(),
    ),
    phone: z.preprocess(
      blankToUndefined,
      z
        .string()
        .regex(/^9\d{9}$/, 'Enter a 10-digit Nepali mobile number')
        .optional(),
    ),
    category: z.enum([
      'ACCOUNT',
      'SAVINGS',
      'LOAN',
      'DIGITAL_SERVICE',
      'BRANCH',
      'OTHER',
    ]),
    subject: z.string().trim().min(4).max(160),
    message: z.string().trim().min(10).max(2000),
  })
  .superRefine((data, ctx) => {
    if (!data.anonymous && !data.fullName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['fullName'],
        message: 'Enter your name or choose anonymous submission',
      })
    }

    if (!data.anonymous && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phone'],
        message: 'Enter a phone number or choose anonymous submission',
      })
    }
  })