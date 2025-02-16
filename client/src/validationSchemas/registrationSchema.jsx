import { z } from "zod";

// utility function to escape HTML characters
const escapeHTML = (str) => str.replace(/[&<>"'`=]/g, "");

const registrationSchema = z.object({
  username: z
    .string()
    .min(8, "Username must be atleast 8 characters long")
    .max(30)
    .trim()
    .transform((val) => escapeHTML(val)), // Sanitize to prevent XSS

  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .transform((val) => escapeHTML(val)),

  password: z
    .string()
    .min(8, "Password must be 8 characters long")
    .regex(/[A-Z]/, "Password must contain atleast one uppercase letter")
    .regex(/[a-z]/, "Password must contain atleast one lowercase letter")
    .regex(/[0-9]/, "Password must contain atleast one number")
    .regex(/[\W_]/, "Password must contain altest one special character"),
});

export default registrationSchema;
