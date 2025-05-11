import mongoose from "mongoose";

const sliderSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
      default: null,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
      default: null,
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
  },
  {
    timestamps: true,
  }
);

const Slider = mongoose.model("slider", sliderSchema);
export default Slider;
