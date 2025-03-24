import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema(
  {
    carouselType: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    pid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Carousel = mongoose.model("carousel", carouselSchema);
export default Carousel;
