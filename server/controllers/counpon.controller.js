import Coupon from "../models/coupon.model.js";
import response from "../utils/response.js";

const createCounponController = async (req, res) => {
  try {
    const {
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
      isActive,
      desc,
    } = req.body;

    console.log(req.body);

    if (!couponCode || !discountType || !discountValue || !startDate || !desc)
      return response(res, 400, false, "Coupon details missing");

    const coupon = await new Coupon(req.body).save();

    return response(res, 201, true, "Coupon created successfully", coupon);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateCouponController = async (req, res) => {
  try {
    const { ccid } = req.params;
    const {
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
      isActive,
      desc,
    } = req.body;

    if (!ccid) return response(res, 400, false, "No ccid. No coupon updation");

    if (!couponCode || !discountType || !discountValue || !startDate || !desc)
      return response(res, 400, false, "Coupon details missing");

    const updatedCoupon = await Coupon.findByIdAndUpdate(ccid, req.body, {
      new: true,
    });

    return response(
      res,
      201,
      true,
      "Coupon updated successfully",
      updatedCoupon
    );
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchCouponController = async (req, res) => {
  try {
    const { ccid } = req.params;

    if (!ccid) return response(res, 400, false, "No ccid. No coupon fetching");

    const coupon = await Coupon.findById(ccid);

    if (!coupon) return response(res, 404, false, "No coupon found");

    return response(res, 201, true, "Coupon found successfully", coupon);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchAllCouponsController = async (req, res) => {
  try {
    const { pageNo } = req.params;
    const currentPageNo = parseInt(pageNo) || 1;
    const limit = 10;
    const skip = (currentPageNo - 1) * limit;

    const couponsPerPage = await Coupon.find().skip(skip).limit(limit);
    const tatalCouponsCount = await Coupon.countDocuments();
    const totalPagesCount = Math.ceil(tatalCouponsCount / limit);

    return response(
      res,
      200,
      true,
      "Coupons fected successfully",
      couponsPerPage,
      totalPagesCount
    );

    if (coupons.length == 0)
      return response(res, 404, false, "No coupon found");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteCouponController = async (req, res) => {
  try {
    const { ccid } = req.params;

    if (!ccid) return response(res, 400, false, "No ccid. No coupon deletion");

    const deletedCounpon = await Coupon.findByIdAndDelete(ccid);

    return response(res, 201, true, "Coupon deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createCounponController,
  updateCouponController,
  fetchCouponController,
  fetchAllCouponsController,
  deleteCouponController,
};
