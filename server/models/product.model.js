import mongoose from "mongoose";
import slugigy from "";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
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
    ratings: {
      type: String,
      required: true,
    },
    reviews: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

export default Product;
