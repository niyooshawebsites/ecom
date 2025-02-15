import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import BackBtn from "./BackBtn";
import Loading from "./Loading";

const UpdateCouponForm = () => {
  const [coupon, setCoupon] = useState({});
  const [loading, setLoading] = useState(false);

  const { ccid } = useParams();

  const fetchCoupon = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-coupon/${ccid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCoupon({
          ...res.data.data,
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
        });

        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const handleCouponUpdation = async (formData) => {
    setLoading(true);

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
                  defaultValue={coupon.couponCode}
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
                  defaultValue={coupon.desc}
                >
                  {coupon.desc}
                </textarea>
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
                    defaultValue={coupon.defaultValue}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed</option>
                  </select>
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
                    defaultValue={coupon.discountType}
                    className="border rounded-lg py-2 px-2 outline-none bg-gray-100 text-gray-400"
                    placeholder="Product name"
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
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Enter the discount value"
                  defaultValue={coupon.discountValue}
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
                  placeholder="Enter the minimum order value"
                  defaultValue={coupon.minOrderValue}
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
                  defaultValue={coupon.maxOrderValue}
                  placeholder="Enter the minimum order value"
                />
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
                    defaultValue={coupon.startDate}
                  />
                </div>

                <div className="flex flex-col mb-3 w-6/12">
                  <label htmlFor="currentStartDate" className="text-gray-400">
                    Current Start Date
                  </label>
                  <input
                    type="text"
                    name="currentStartDate"
                    id="currentStartDate"
                    defaultValue={coupon.startDate}
                    className="border rounded-lg py-3 px-2 outline-none bg-gray-100 text-gray-400"
                    placeholder="Product name"
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
                    defaultValue={coupon.endDate}
                  />
                </div>

                <div className="flex flex-col mb-3 w-6/12">
                  <label htmlFor="currentEndDate" className="text-gray-400">
                    Current End Date
                  </label>
                  <input
                    type="text"
                    name="currentEndDate"
                    id="currentEndDate"
                    defaultValue={coupon.endDate}
                    className="border rounded-lg py-3 px-2 outline-none bg-gray-100 text-gray-400"
                    placeholder="Product name"
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
                  defaultValue={coupon.usageLimit}
                />
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
      )}
    </>
  );
};

export default UpdateCouponForm;
