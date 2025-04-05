import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slider = mongoose.model("slider", sliderSchema);
export default Slider;
