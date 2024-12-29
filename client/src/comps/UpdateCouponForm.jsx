import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateCouponForm = () => {
  const [coupon, setCoupon] = useState({});
  const { ccid } = useParams();

  const fetchCoupon = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-coupon/${ccid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCoupon(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCouponUpdation = async (formData) => {
    try {
      const couponCode = formData.get("couponCode");
      const discountType = formData.get("discountType");
      const discountValue = formData.get("discountValue");
      const minOrderValue = formData.get("minOrderValue");
      const maxOrderValue = formData.get("maxOrderValue");
      const startDate = formData.get("startDate");
      const endDate = formData.get("endDate");
      const usageLimit = formData.get("usageLimit");
      const isActive = formData.get("isActive");
      const desc = formData.get("desc");

      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-coupon/${ccid}`,
        {
          couponCode,
          discountType,
          discountValue,
          minOrderValue,
          maxOrderValue,
          startDate,
          endDate,
          usageLimit,
          isActive,
          desc,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-light my-10">Update Coupon</h1>
      <div className="flex flex-col w-6/12 border rounded-lg p-5">
        <form className="mb-3" action={handleCouponUpdation}>
          <div className="flex flex-col mb-3">
            <label htmlFor="couponCode" className="mb-1">
              Coupon Code
            </label>
            <input
              type="text"
              name="couponCode"
              id="couponCode"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Enter a code"
              value={coupon.couponCode}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="desc" className="mb-1">
              Desctiption
            </label>
            <textarea
              name="desc"
              id="desc"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Enter the coupon description"
              value={coupon.desc}
            ></textarea>
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="discountType" className="mb-1">
              Discount Type
            </label>
            <select
              name="discountType"
              id="discountType"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              defaultValue={coupon.defaultValue}
            >
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed</option>
            </select>
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="discountValue" className="mb-1">
              Discount value
            </label>
            <input
              type="number"
              name="discountValue"
              id="discountValue"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Enter the discount value"
              value={coupon.discountValue}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="minOrderValue" className="mb-1">
              Minimum order value
            </label>
            <input
              type="number"
              name="minOrderValue"
              id="minOrderValue"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              defaultValue={0}
              placeholder="Enter the minimum order value"
              value={coupon.minOrderValue}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="maxOrderValue" className="mb-1">
              Maximum order value
            </label>
            <input
              type="number"
              name="maxOrderValue"
              id="maxOrderValue"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              defaultValue={1000000000}
              placeholder="Enter the minimum order value"
              value={coupon.maxOrderValue}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="startDate" className="mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              value={coupon.startDate}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="endDate" className="mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              value={coupon.endDate}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="usageLimit" className="mb-1">
              Usage Limit
            </label>
            <input
              type="number"
              name="usageLimit"
              id="usageLimit"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Enter the usage limit"
              value={coupon.usageLimit}
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="discountType" className="mb-1">
              Applicable On
            </label>
            <select
              name="discountType"
              id="discountType"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              defaultValue={coupon.discountType}
            >
              <option value="percentage">All products</option>
              <option value="percentage">Selected products</option>
            </select>
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="isActive" className="mb-1">
              Activation status
            </label>
            <select
              name="isActive"
              id="isActive"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              defaultValue={coupon.isActive}
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Update Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCouponForm;
