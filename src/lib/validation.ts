import { z } from "zod";

/**
 * Inquiry form schema (Brief §5.3). Name/Phone/Email required, Message optional.
 * Shared between the form (client validation) and any future server/Edge
 * validation so rules never drift.
 */
export const inquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "That name is too long"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number")
    .max(20, "Enter a valid phone number")
    .regex(/^[+\d][\d\s().-]{6,}$/, "Enter a valid phone number"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Enter a valid email address"),
  message: z.string().trim().max(1000, "Message is too long").optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
