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
    quantity: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      emum: ["Online", "COD"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      emum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    tnxId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: [
        "Pending",
        "On hold",
        "Completed",
        "Cancelled",
        "Cancelled & Refunded",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);
export default Order;
