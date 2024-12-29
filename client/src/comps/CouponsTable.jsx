import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { SlRefresh } from "react-icons/sl";

const CouponsTable = () => {
  const [coupons, setCoupons] = useState([]);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-coupons/1`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCoupons(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCoupon = async (ccid) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-coupon/${ccid}`,
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
    fetchCoupons();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
      <div className="flex">
        <h1 className="text-4xl py-3 poppins-light mt-10 mb-2">All Coupons</h1>
        <button onClick={fetchCoupons} className="ml-5">
          <SlRefresh className="text-4xl text-blue-600 hover:text-blue-700" />
        </button>
      </div>
      <table className="w-full border">
        <thead className="bg-blue-500 h-10 m-10">
          <tr>
            <th className="poppins-light text-white border text-sm p-1">#</th>
            <th className="poppins-light text-white border text-sm  p-1">
              Code
            </th>
            <th className="poppins-light text-white border text-sm  p-1">
              Discount Type
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Discount Value
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Min Order Value
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Max Order Value
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Start Date
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              End Date
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Usage Limit
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Used Count
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Applicable To
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Status
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Description
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Created on
            </th>
            <th className="poppins-light text-white border text-sm p-1">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => {
            return (
              <tr
                key={coupon._id}
                className="odd:bg-white even:bg-gray-300 h-10"
              >
                <td className="text-center border text-sm p-1">{index + 1}</td>
                <td className="text-center border text-sm p-1">
                  {coupon.couponCode}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.discountType}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.discountValue}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.minOrderValue}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.maxOrderValue}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.startDate
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.endDate.split("T")[0].split("-").reverse().join("-")}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.usageLimit}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.usedCount}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.applicableTo.length === 0
                    ? "All products"
                    : "Selected products"}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.isActive ? "Active" : "Inactive"}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.desc}
                </td>
                <td className="text-center border text-sm p-1">
                  {coupon.createdAt
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>
                <td className="text-center border text-sm p-1">
                  <Link to={`/dashboard/update-coupon/${coupon._id}`}>
                    <span className="bg-orange-600 px-1 rounded-md text-white hover:bg-orange-700 mr-2">
                      Update
                    </span>
                  </Link>{" "}
                  <button
                    onClick={() => {
                      deleteCoupon(coupon._id);
                    }}
                    className="bg-red-600 px-1 rounded-md text-white hover:bg-red-700 border text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CouponsTable;
