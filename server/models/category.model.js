import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// pre save hook to create slug from name
categorySchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
  }
});

const Category = mongoose.model("category", categorySchema);
export default Category;
