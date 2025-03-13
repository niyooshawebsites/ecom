import Coupon from "../models/coupon.model.js";
import response from "../utils/response.js";
import couponSchema from "../validation/couponSchema.js";
import { z } from "zod";

const createCounponController = async (req, res) => {
  couponSchema.parse(req.body);

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

    if (!couponCode || !discountType || !discountValue || !startDate || !desc)
      return response(res, 400, false, "Coupon details missing");

    const coupon = await new Coupon(req.body).save();

    return response(res, 201, true, "Coupon created successfully", coupon);
  } catch (err) {
    if (err instanceof z.ZodError) {
      // If validation fails, send a detailed error response
      return res.status(400).json({
        errors: err.errors.map((e) => ({ message: e.message, path: e.path })),
      });
    }

    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const updateCouponController = async (req, res) => {
  couponSchema.parse(req.body);

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
    if (err instanceof z.ZodError) {
      // If validation fails, send a detailed error response
      return res.status(400).json({
        errors: err.errors.map((e) => ({ message: e.message, path: e.path })),
      });
    }

    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const fetchCouponForUpdationController = async (req, res) => {
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

const fetchCouponController = async (req, res) => {
  try {
    const { couponCode } = req.params;

    if (!couponCode)
      return response(res, 400, false, "No coupon code. No coupon fetching");

    const coupon = await Coupon.findOne({ couponCode });

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

    const couponsPerPage = await Coupon.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (couponsPerPage.length == 0)
      return response(res, 404, false, "No coupon found");

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

const applyCouponController = async (req, res) => {
  try {
    const { couponCode } = req.body;
    const { cartTotal } = req.params;
    const today = new Date();

    if (!couponCode)
      return response(res, 400, false, "No coupon code. No discount");

    const coupon = await Coupon.findOne({ couponCode });

    if (!coupon) return response(res, 404, false, "No coupon found");

    if (cartTotal < coupon.minOrderValue)
      return response(
        res,
        401,
        false,
        `Coupon applicable for order value above Rs ${coupon.minOrderValue}`
      );

    if (cartTotal > coupon.maxOrderValue)
      return response(
        res,
        401,
        false,
        `Coupon applicable for order value less than Rs ${coupon.minOrderValue}`
      );

    if (today < coupon.startDate)
      return response(res, 401, false, `Invalid coupon`);

    if (today > coupon.endDate)
      return response(res, 401, false, `Coupon expired`);

    return response(res, 200, true, "Coupon applied successfully", coupon);
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

const deleteCouponsController = async (req, res) => {
  try {
    const { ccids } = req.body;

    if (!ccids || !Array.isArray(ccids) || ccids.length === 0)
      return response(res, 400, false, "No cids. No multiple deletion");

    const result = await Coupon.deleteMany({ _id: { $in: ccids } });

    return response(res, 200, true, "Coupons deleted successfully");
  } catch (err) {
    console.error(err.message);
    return response(res, 500, false, "Internal server error");
  }
};

export {
  createCounponController,
  updateCouponController,
  fetchCouponForUpdationController,
  fetchCouponController,
  fetchAllCouponsController,
  deleteCouponController,
  applyCouponController,
  deleteCouponsController,
};
