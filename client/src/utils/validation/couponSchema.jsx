import { z } from "zod";
import escapeHTML from "./sanitization";

const couponSchema = z.object({
  couponCode: z
    .string()
    .min(4, "Coupon code must be alteast 4 characters long")
    .max(50, "Coupon code must be atmost 15 characters long")
    .toUpperCase()
    .trim()
    .transform((val) => escapeHTML(val)),
  desc: z
    .string()
    .min(20, "Coupon code must be alteast 20 characters long")
    .max(100, "Coupon code must be atmost 50 characters long")
    .trim()
    .transform((val) => escapeHTML(val)),
  discountType: z.enum(["percentage", "fixed"], {
    errorMap: () => ({ message: "Invalid discount type" }),
  }),
  discountValue: z
    .number()
    .min(1, "Discount value must be at least 1")
    .max(100000000, "Discount value is too high"),
  minOrderValue: z.number().min(1, "Minimum order value cannot be 0"),
  maxOrderValue: z
    .number()
    .min(
      2,
      "Maximum order value must be greater than or equal to minimum order value"
    ),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),

  endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid start date",
  }),
  usageLimit: z.number().min(1, "Usage limit must be atleast 1"),
  isActive: z.boolean({
    errorMap: () => ({ message: "Invalid activation status" }),
  }),
});

export default couponSchema;
