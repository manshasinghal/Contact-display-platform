import { z } from "zod";

const optionalString = z
  .string()
  .trim()
  .min(1)
  .max(120)
  .optional()
  .or(z.literal(""))
  .transform((value) => (value ? value : undefined));

export const createContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .max(255)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined)),
  phone: optionalString,
  company: optionalString,
});

export const listContactsQuerySchema = z.object({
  search: z.string().trim().max(120).optional().default(""),
  page: z.coerce.number().int().positive().optional().default(1),
  pageSize: z.coerce.number().int().positive().max(50).optional().default(10),
});

export const contactIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type ListContactsQuery = z.infer<typeof listContactsQuerySchema>;
