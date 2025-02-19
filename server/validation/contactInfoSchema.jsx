import { z } from "zod";
import escapeHTML from "./sanitization";

const contactInfoSchema = z.object({
  bName: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  website: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  fName: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  lName: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  contactNo: z
    .string()
    .trim()
    .min(10, "Please enter 10 digits contact number")
    .max(10, "Please enter 10 digits contact number")
    .transform((val) => escapeHTML(val)),
  buildingNo: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  streetNo: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  locality: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  district: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  landmark: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  citys: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  state: z
    .string()
    .trim()
    .transform((val) => escapeHTML(val)),
  pincode: z
    .string()
    .trim()
    .min(6, "Please enter 10 digits pincode")
    .max(6, "Please enter 10 digits pincode")
    .transform((val) => escapeHTML(val)),
});

export default contactInfoSchema;
