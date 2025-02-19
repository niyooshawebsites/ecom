import { z } from "zod";
import escapeHTML from "./sanitization.js";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email({
      message: "Please enter a valid email address.",
    })
    .transform((val) => escapeHTML(val)),
});

export default forgotPasswordSchema;
