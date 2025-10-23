import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>["body"];