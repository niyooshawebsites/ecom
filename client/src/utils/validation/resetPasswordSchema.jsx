import { z } from "zod";

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Password must be 8 characters long")
    .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
    .regex(/[a-z]/, "Password must contain atleast one lowercase letter")
    .regex(/[0-9]/, "Password must contain atleast one number")
    .regex(/[\W_]/, "Password must contain altest one special character"),

  newConfirmPassword: z
    .string()
    .min(8, "Password must be 8 characters long")
    .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
    .regex(/[a-z]/, "Password must contain atleast one lowercase letter")
    .regex(/[0-9]/, "Password must contain atleast one number")
    .regex(/[\W_]/, "Password must contain altest one special character"),
});

export default resetPasswordSchema;
