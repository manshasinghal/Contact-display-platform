import { z } from "zod";

const optionalTrimmed = z
  .string()
  .trim()
  .max(120)
  .optional()
  .or(z.literal(""))
  .transform((value) => (value ? value : undefined));

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email")
    .max(255)
    .optional()
    .or(z.literal(""))
    .transform((value) => (value ? value : undefined)),
  phone: optionalTrimmed,
  company: optionalTrimmed,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
