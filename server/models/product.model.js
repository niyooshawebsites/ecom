import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    img: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
      trim: true,
    },
    shortDesc: {
      type: String,
      required: true,
      trim: true,
    },
    longDesc: {
      type: String,
      require: true,
      trim: true,
    },
    ratings: [
      {
        type: String,
        required: true,
        default: [],
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// pre save hook to generate the slug based on the name field
productSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
  }
});

const Product = mongoose.model("product", productSchema);

export default Product;
