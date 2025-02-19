import { toast } from "react-toastify";
import axios from "axios";
import Loading from "./Loading";
import { useState } from "react";
import couponSchema from "../utils/validation/couponSchema";

const CreateCouponForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCouponCreation = async (formData) => {
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

      // Validate using Zod
      const result = couponSchema.safeParse({
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
      });

      if (result.success) {
        setLoading(true);
      }

      if (!result.success) {
        const formattedErrors = result.error.format();
        setErrors(formattedErrors);
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/api/v1/create-coupon",
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
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <h1 className="text-4xl py-3 poppins-light my-10">Create Coupon</h1>
          <div className="flex flex-col w-5/12 border rounded-lg p-5 mb-10">
            <form className="mb-3" action={handleCouponCreation}>
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
                  required
                />
                {errors.couponCode && (
                  <p className="text-red-500">{errors.couponCode._errors[0]}</p>
                )}
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
                  required
                ></textarea>
                {errors.desc && (
                  <p className="text-red-500">{errors.desc._errors[0]}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="discountType" className="mb-1">
                  Discount Type
                </label>
                <select
                  name="discountType"
                  id="discountType"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  required
                >
                  <option value="percentage">Percentage</option>
                  <option value="fixed">Fixed</option>
                </select>
                {errors.discountType && (
                  <p className="text-red-500">
                    {errors.discountType._errors[0]}
                  </p>
                )}
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
                  required
                />
                {errors.discountValue && (
                  <p className="text-red-500">
                    {errors.discountValue._errors[0]}
                  </p>
                )}
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
                  required
                />
                {errors.minOrderValue && (
                  <p className="text-red-500">
                    {errors.minOrderValue._errors[0]}
                  </p>
                )}
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
                  required
                />
                {errors.maxOrderValue && (
                  <p className="text-red-500">
                    {errors.maxOrderValue._errors[0]}
                  </p>
                )}
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
                  required
                />
                {errors.startDate && (
                  <p className="text-red-500">{errors.startDate._errors[0]}</p>
                )}
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
                  required
                />
                {errors.endDate && (
                  <p className="text-red-500">{errors.endDate._errors[0]}</p>
                )}
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
                  required
                />
                {errors.usageLimit && (
                  <p className="text-red-500">{errors.usageLimit._errors[0]}</p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="isActive" className="mb-1">
                  Activation status
                </label>
                <select
                  name="isActive"
                  id="isActive"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  required
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
                {errors.isActive && (
                  <p className="text-red-500">{errors.isActive._errors[0]}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Create Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCouponForm;
