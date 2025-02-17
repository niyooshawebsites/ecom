import { z } from "zod";

const taxTypeSchema = z.object({
  taxType: z.enum(["Signle store tax", "Category wise tax"], {
    errorMap: () => ({ message: "Invalid tax type selected" }),
  }),
});

const gstSchema = z.object({
  GSTRate: z
    .number({ invalid_type_error: "GST Rate must be a number" }) // Ensures input is a number
    .min(0, "GST Rate cannot be negative") // GST rate cannot be negative
    .max(100, "GST Rate cannot exceed 100%") // Prevents unrealistic values
    .refine((value) => value % 0.01 === 0, {
      message: "GST Rate must be a valid decimal value",
    }), // Ensures proper decimal values
});

const taxSchema = z.object({
  cid: z
    .string()
    .min(1, "Category is required")
    .regex(/^[a-fA-F0-9]{24}$/, "Invalid category ID"), // Assuming it's a MongoDB ObjectId
  GSTRate: z
    .number({
      required_error: "GST Rate is required",
      invalid_type_error: "GST Rate must be a number",
    })
    .min(0, "GST Rate cannot be negative")
    .max(100, "GST Rate cannot exceed 100"),
});

export { taxTypeSchema, gstSchema, taxSchema };
