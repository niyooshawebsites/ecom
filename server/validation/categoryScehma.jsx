import { z } from "zod";
import escapeHTML from "./sanitization";

const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
});

export default categorySchema;
