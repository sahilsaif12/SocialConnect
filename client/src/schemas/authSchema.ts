import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "username must be letters or numbers with underscores"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  first_name: z.string().min(1, "First name is required").max(30, "First name cannot exceed 30 characters"),
  last_name: z.string().min(1, "Last name is required").max(30, "Last name cannot exceed 30 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
