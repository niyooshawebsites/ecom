import { z } from "zod";
import escapeHTML from "./sanitization";

const categorySchema = z.object({
  name: z
    .string()
    .min(3, "Category name must be at least 3 characters")
    .trim()
    .transform((val) => escapeHTML(val)),
});

export default categorySchema;
