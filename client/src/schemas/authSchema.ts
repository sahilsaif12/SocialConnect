import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username cannot exceed 30 characters")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*_)[a-zA-Z0-9_]+$/,
      "Username must contain at least one letter, one number, and one underscore"
    ),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  first_name: z.string().min(1, "First name is required").max(30, "First name cannot exceed 30 characters"),
  last_name: z.string().min(1, "Last name is required").max(30, "Last name cannot exceed 30 characters"),
});

export type RegisterInput = z.infer<typeof registerSchema>;


export const loginSchema = z.object({
  identifier: z
    .string()
    .min(1, "user email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;



export const passwordResetSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),

}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords doesn't match",
  path: ["confirmPassword"],
});

export type PasswordResetInput = z.infer<typeof passwordResetSchema>;

