import { z } from "zod";
import escapeHTML from "./sanitization.js";

const productSchema = z.object({
  category: z.string(),
  name: z
    .string()
    .min(3, "Product name must be atlease 3 characters long")
    .max(50, "Product name must be atmost 50 characters long")
    .trim()
    .transform((val) => escapeHTML(val)),
  price: z.number().transform((val) => parseFloat(val)), // Convert price to a float
  img: z
    .union([
      z.string().url("Main product image must be a valid URL"), // For pre-populated image (URL)
      z
        .instanceof(File)
        .refine(
          (file) => file instanceof File,
          "Main product image is required"
        ), // For new file
    ])
    .optional(), // Image is optional, but must be either a URL or a File
  gallery: z
    .array(
      z.union([
        z
          .instanceof(File)
          .refine((file) => file instanceof File, "Invalid gallery image"), // for file uploads
        z.string().url("Gallery image must be a valid URL"), // for URLs
      ])
    )
    .optional(),
  shortDesc: z
    .string()
    .min(10, "Short description must be at least 10 characters")
    .max(300, "Short description cannot exceed 300 characters")
    .trim(),
  longDesc: z
    .string()
    .min(100, "Long description must be at least 100 characters")
    .max(5000, "Long description cannot exceed 5000 characters")
    .trim(),
});

export default productSchema;
