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
      default: null,
      required: true,
    },
    endDate: {
      type: Date,
      default: null,
    },
    usageLimit: {
      type: Number,
      default: null, // Null means unlimited usage
    },
    usedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    applicableTo: {
      type: [String], // Array of products or categories on which the coupon code will be applicable
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    desc: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coupon = mongoose.model("coupon", couponSchema);
export default Coupon;
