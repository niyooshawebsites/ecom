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
    },
    amount: {
      type: Number,
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
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

orderSchema.pre("save", function (next) {
  if (this.new) {
    this.amount = this.product.price * this.quantity;
  }

  next();
});

const Order = mongoose.model("order", orderSchema);
export default Order;
