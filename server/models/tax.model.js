import mongoose from "mongoose";

const taxSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId || null,
    },
    GSTRate: {
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
