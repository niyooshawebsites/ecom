import { toast } from "react-toastify";
import axios from "axios";
import Loading from "./Loading";
import { useState } from "react";
import couponSchema from "../utils/validation/couponSchema";

const CreateCouponForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [couponDetails, setCouponDetails] = useState({
    couponCode: null,
    discountType: null,
    discountValue: null,
    minOrderValue: null,
    maxOrderValue: 10000000000,
    startDate: null,
    endDate: null,
    usageLimit: null,
    isActive: true,
    desc: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCouponDetails((prev) => {
      if (name === "isActive") {
        return {
          ...prev,
          [name]: value === "true",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleCouponCreation = async (e) => {
    e.preventDefault();

    try {
      const validateDates = (startDate, endDate) => {
        const parseDate = (dateString) => {
          const [year, month, date] = dateString.split("-");
          return new Date(year, month - 1, date);
        };

        const couponStartDate = parseDate(startDate).getTime();
        const couponEndDate = parseDate(endDate).getTime();

        return couponStartDate > couponEndDate ? false : true;
      };

      const dateComp = validateDates(
        couponDetails.startDate,
        couponDetails.endDate
      );

      if (!dateComp) {
        toast.error("End date is less than start date");
        return;
      }

      // Validate using Zod
      const result = couponSchema.safeParse({
        couponCode: couponDetails.couponCode,
        discountType: couponDetails.discountType,
        discountValue: Number(couponDetails.discountValue),
        minOrderValue: Number(couponDetails.minOrderValue),
        maxOrderValue: Number(couponDetails.maxOrderValue),
        startDate: couponDetails.startDate,
        endDate: couponDetails.endDate,
        usageLimit: Number(couponDetails.usageLimit),
        isActive: couponDetails.isActive,
        desc: couponDetails.desc,
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
        couponDetails,
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
            <form className="mb-3" onSubmit={handleCouponCreation}>
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
                >
                  <option>Select</option>
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
                  min={1}
                  max={
                    couponDetails.discountType === "percentage"
                      ? 100
                      : 100000000
                  }
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Enter the discount value"
                  onChange={handleChange}
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
                  placeholder="Enter the minimum order value"
                  onChange={handleChange}
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
                  placeholder="Enter the minimum order value"
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
                  required
                >
                  <option>Select</option>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
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
