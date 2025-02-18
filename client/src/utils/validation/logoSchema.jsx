import { z } from "zod";

const logoSchema = z.object({
  logoKey: z
    .instanceof(File)
    .refine((file) => file.size > 0, {
      message: "File is required",
    })
    .refine((file) => file.type.startsWith("image"), {
      message: "Only image files are allowed",
    })
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size must be less than 5MB",
    }),
});

export default logoSchema;
