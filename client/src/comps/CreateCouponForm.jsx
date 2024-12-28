import { useState, useEffect } from "react";

const CreateCouponForm = () => {
  const handleCouponCreation = async (formData) => {
    try {
      const couponCode = formData.get("couponCode");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-light my-10">Create Coupon</h1>
      <div className="flex flex-col w-6/12 border rounded-lg p-5">
        <form className="mb-3" action={handleCouponCreation}>
          <div className="flex flex-col mb-3">
            <label htmlFor="couponCode" className="mb-3">
              Coupon Code
            </label>
            <input
              type="text"
              name="couponCode"
              id="couponCode"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Enter a code"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="discountType" className="mb-3">
              Discount Type
            </label>
            <select
              name="discountType"
              id="discountType"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
            >
              <option value="percentage">Percentage</option>
              <option value="percentage">Fixed</option>
            </select>
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="discountValue" className="mb-3">
              Discount value
            </label>
            <input
              type="number"
              name="discountValue"
              id="discountValue"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Enter the discount value"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="minOrderValue" className="mb-3">
              Minimum order value
            </label>
            <input
              type="number"
              name="minOrderValue"
              id="minOrderValue"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              defaultValue={0}
              placeholder="Enter the minimum order value"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="maxOrderValue" className="mb-3">
              Maximum order value
            </label>
            <input
              type="number"
              name="maxOrderValue"
              id="maxOrderValue"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              defaultValue={1000000000}
              placeholder="Enter the minimum order value"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="startDate" className="mb-3">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="endDate" className="mb-3">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              id="endDate"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="usageLimit" className="mb-3">
              Usage Limit
            </label>
            <input
              type="number"
              name="usageLimit"
              id="usageLimit"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="discountType" className="mb-3">
              Applicable On
            </label>
            <select
              name="discountType"
              id="discountType"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
            >
              <option value="percentage">All products</option>
              <option value="percentage">Selected products</option>
            </select>
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
  );
};

export default CreateCouponForm;
