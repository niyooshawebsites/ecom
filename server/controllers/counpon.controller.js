import Coupon from "../models/coupon.model.js";
import response from "../utils/response.js";

const createCounponController = async (req, res) => {
  try {
    const { couponCode, discountType, discountValue, minOrderValue, maxOrderValue, startDate, endDate, usageLimit, usedCount, applicableTo, isActive} = req.body;

    if (!couponCode || !discountType || !discountValue || !startDate || !usedCount)
      return response(res, 400, false, "Coupon code details missing");

    const coupon = await new Coupon({
      couponCode,
      discountType,
      discountValue,
      minOrderValue,
      maxOrderValue,
      startDate,
      endDate,
      usageLimit,
      usedCount,
      applicableTo,
      isActive
    }).save();

    return response(res, 201, true, "Coupon code created successfully", coupon);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateCouponController = async (req, res) => {
  try {
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export { createCounponController };
