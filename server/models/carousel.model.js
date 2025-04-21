import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
  {
    carouselType: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Carousel = mongoose.model("carousel", carouselSchema);
export default Carousel;
