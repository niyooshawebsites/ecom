import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    couponCode: {
      type: String,
      unique: true,
      trim: true,
      uppercase: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: {
      type: Number,
      min: 0,
      required: true,
    },
    minOrderValue: {
      type: Number,
      min: 0,
      default: 0,
    },
    maxOrderValue: {
      type: Number,
      default: null,
      validate: function (value) {
        if (this.discountType === "percentage" && value === null) {
          return false;
        } else {
          return true;
        }
      },
    },
    startDate: {
      type: Date,
      required: true,
    },
    products: {
      type: Array,
      default: [],
    },
    usageLimit: {
      type: String,
      enum: ["unlimited", "once"],
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("coupon", couponSchema);
export default Coupon;
