import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    btnLink: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Slider = mongoose.model("slider", sliderSchema);
export default Slider;
