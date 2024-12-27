import Coupon from "../models/coupon.model.js";
import response from "../utils/response.js";

const createCounponController = async (req, res) => {
  try {
    const { couponCode, discountType, discountValue, minOrderValue, maxOrderValue, startDate, endDate, usageLimit, usedCount, applicableTo, isActive} = req.body;

    if (!couponCode || !discountType || !discountValue || !startDate || !usedCount)
      return response(res, 400, false, "Coupon details missing");

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

    return response(res, 201, true, "Coupon created successfully", coupon);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateCouponController = async (req, res) => {
  try {
    const {ccid} = req.params;
    const { couponCode, discountType, discountValue, minOrderValue, maxOrderValue, startDate, endDate, usageLimit, usedCount, applicableTo, isActive} = req.body;

    if(!ccid) return response(res, 400, false, "No ccid. No coupon updation");
    
    if (!couponCode || !discountType || !discountValue || !startDate || !usedCount)
      return response(res, 400, false, "Coupon details missing");

    const updatedCoupon = await Coupon.findByIdAndUpdate(ccid, req.body, {new: true});

    return response(res, 201, true, "Coupon updated successfully", updatedCoupon);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchCouponController = async(req, res) => {
  try {
    const {ccid} = req.params;
    
    if(!ccid) return response(res, 400, false, "No ccid. No coupon fetching");

    const coupon = await Coupon.findById(ccid);

    if(!coupon) return response(res, 404, false, "No coupon found");

    return response(res, 201, true, "Coupon found successfully", coupon);
    
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
}

export { createCounponController, updateCouponController, fetchCouponController };
