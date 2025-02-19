import { z } from "zod";
import escapeHTML from "./sanitization";

const cartSchema = z.object({
  couponCode: z
    .string()
    .toUpperCase()
    .trim()
    .transform((val) => escapeHTML(val)),
});

export default cartSchema;
