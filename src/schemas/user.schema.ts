import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    fullName: z
      .string()
      .min(3, "Full name must be at least 3 characters long")
      .trim(),

    birthDate: z
      .string()
      .refine(
        (val) => !isNaN(Date.parse(val)),
        "Birth date must be a valid date"
      ),

    email: z
      .string()
      .email("Invalid email format")
      .trim(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters long"),

    role: z.enum(["admin", "user"]).default("user"),

    isActive: z.boolean().default(true)
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];
