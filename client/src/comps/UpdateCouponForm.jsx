import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BackBtn from "./BackBtn";
import Loading from "./Loading";
import couponSchema from "../utils/validation/couponSchema";

const UpdateCouponForm = () => {
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

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { ccid } = useParams();

  const fetchCoupon = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-coupon-for-updation/${ccid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCouponDetails((prev) => {
          return {
            ...prev,
            couponCode: res.data.data.couponCode,
            discountType: res.data.data.discountType,
            discountValue: res.data.data.discountValue,
            minOrderValue: res.data.data.minOrderValue,
            maxOrderValue: res.data.data.maxOrderValue,
            startDate: res.data.data.startDate
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-"),
            endDate: res.data.data.endDate
              .split("T")[0]
              .split("-")
              .reverse()
              .join("-"),
            usageLimit: res.data.data.usageLimit,
            isActive: res.data.data.isActive,
            desc: res.data.data.desc,
          };
        });

        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

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

  const handleCouponUpdation = async (e) => {
    e.preventDefault();

    try {
      const validateDates = (startDate, endDate) => {
        const parseDate = (dateString) => {
          const [date, month, year] = dateString.split("-");
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

      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-coupon/${ccid}`,
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

  useEffect(() => {
    fetchCoupon();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <BackBtn link={"/dashboard/coupons"} />
          <h1 className="text-4xl py-3 poppins-light mb-5">Update Coupon</h1>
          <div className="flex flex-col w-6/12 border rounded-lg p-5 mb-10">
            <form className="mb-3" onSubmit={handleCouponUpdation}>
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
                  value={couponDetails.couponCode}
                  onChange={handleChange}
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
                  value={couponDetails.desc}
                  onChange={handleChange}
                >
                  {couponDetails.desc}
                </textarea>
                {errors.desc && (
                  <p className="text-red-500">{errors.desc._errors[0]}</p>
                )}
              </div>

              <div className="flex">
                <div className="flex flex-col mb-3 w-6/12 mr-3">
                  <label htmlFor="discountType" className="mb-1">
                    Discount Type
                  </label>
                  <select
                    name="discountType"
                    id="discountType"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    value={couponDetails.discountType}
                    onChange={handleChange}
                  >
                    <option>Select</option>
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed</option>
                  </select>
                  {errors.discountType && (
                    <p className="text-red-500">
                      {errors.discountType._errors[0]}
                    </p>
                  )}
                </div>

                <div className="flex flex-col mb-3 w-6/12">
                  <label
                    htmlFor="currentDiscountType"
                    className="text-gray-400"
                  >
                    Current Discount Type
                  </label>
                  <input
                    type="text"
                    name="currentDiscountType"
                    id="currentDiscountType"
                    defaultValue={couponDetails.discountType}
                    className="border rounded-lg py-2 px-2 outline-none bg-gray-100 text-gray-400"
                    readOnly
                  />
                </div>
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
                  value={couponDetails.discountValue}
                  onChange={handleChange}
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
                  value={couponDetails.minOrderValue}
                  onChange={handleChange}
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
                  value={couponDetails.maxOrderValue}
                  placeholder="Enter the minimum order value"
                  onChange={handleChange}
                />
                {errors.maxOrderValue && (
                  <p className="text-red-500">
                    {errors.maxOrderValue._errors[0]}
                  </p>
                )}
              </div>

              <div className="flex">
                <div className="flex flex-col mb-3 w-6/12 mr-3">
                  <label htmlFor="startDate" className="mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    id="startDate"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    value={couponDetails.startDate}
                    onChange={handleChange}
                  />
                  {errors.startDate && (
                    <p className="text-red-500">
                      {errors.startDate._errors[0]}
                    </p>
                  )}
                </div>

                <div className="flex flex-col mb-3 w-6/12">
                  <label htmlFor="currentStartDate" className="text-gray-400">
                    Current Start Date
                  </label>
                  <input
                    type="text"
                    name="currentStartDate"
                    id="currentStartDate"
                    defaultValue={couponDetails.startDate}
                    className="border rounded-lg py-3 px-2 outline-none bg-gray-100 text-gray-400"
                    readOnly
                  />
                </div>
              </div>

              <div className="flex">
                <div className="flex flex-col mb-3 w-6/12 mr-3">
                  <label htmlFor="endDate" className="mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    id="endDate"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    value={couponDetails.endDate}
                    onChange={handleChange}
                  />
                  {errors.endDate && (
                    <p className="text-red-500">{errors.endDate._errors[0]}</p>
                  )}
                </div>

                <div className="flex flex-col mb-3 w-6/12">
                  <label htmlFor="currentEndDate" className="text-gray-400">
                    Current End Date
                  </label>
                  <input
                    type="text"
                    name="currentEndDate"
                    id="currentEndDate"
                    defaultValue={couponDetails.endDate}
                    className="border rounded-lg py-3 px-2 outline-none bg-gray-100 text-gray-400"
                    readOnly
                  />
                </div>
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
                  value={couponDetails.usageLimit}
                  onChange={handleChange}
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
                  value={couponDetails.isActive}
                  onChange={handleChange}
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
                Update Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCouponForm;
