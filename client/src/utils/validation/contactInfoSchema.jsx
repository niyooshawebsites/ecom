import { z } from "zod";
import escapeHTML from "./sanitization";

const contactInfoSchema = z.object({
  bName: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
});

export default contactInfoSchema;
