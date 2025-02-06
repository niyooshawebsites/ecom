import mongoose from "mongoose";

const taxSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      required: true,
      trim: true,
      default: 18,
    },
  },
  {
    timestamps: true,
  }
);

const Tax = mongoose.model("tax", taxSchema);
export default Tax;
