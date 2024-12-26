import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },
    expiresOn: {
      type: Date,
      default: null,
    },
    amountDiscount: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
    products: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("coupon", couponSchema);
export default Coupon;
