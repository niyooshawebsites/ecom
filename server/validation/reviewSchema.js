import { z } from "zod";
import escapeHTML from "./sanitization.js";

const reviewSchema = z.object({
  rating: z.enum([1, 2, 3, 4, 5], {
    errorMap: () => ({
      message: "Rating is required and must be between 1 and 5.",
    }),
  }),
  reviewMsg: z
    .string()
    .min(1, {
      message: "Review message is required.",
    })
    .max(1000, {
      message: "Review message must be less than 1000 characters.",
    })
    .trim()
    .transform((val) => escapeHTML(val)),
});

export default reviewSchema;
