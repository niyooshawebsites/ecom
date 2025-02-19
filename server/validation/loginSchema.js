import { z } from "zod";
import escapeHTML from "./sanitization.js";

const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .transform((val) => escapeHTML(val)),
});

export default loginSchema;
