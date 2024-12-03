import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "On hold",
        "Complete",
        "Cancelled",
        "Cancelled & Refunded",
      ],
      default: "Pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
