import Layout from "../comps/Layout";
import AdminSidebar from "../comps/AdminSidebar";
import Loading from "../comps/Loading";
import { useState } from "react";

const Homepage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <Layout>
      <div className="flex">
        <AdminSidebar />
        {loading ? (
          <Loading />
        ) : (
          <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
            {coupons.length > 0 ? (
              <>
                <div className="flex flex-col justify-between items-center my-5 w-full">
                  <div className="flex justify-center items-center">
                    <h1 className="text-4xl py-3 poppins-light my-5 bg-gray-200 rounded-md p-3">
                      All Coupons (
                      {coupons.length < 10
                        ? `0${coupons.length}`
                        : coupons.length}
                      )
                    </h1>
                    <button onClick={fetchCoupons} className="ml-5">
                      <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
                    </button>
                  </div>

                  <div>
                    <form action={fetchCoupon} className="">
                      <input
                        type="text"
                        name="couponCode"
                        id="couponCode"
                        placeholder="Coupon code"
                        required
                        className="border border-gray-300 rounded p-1 mr-2"
                      />
                      <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                        Search
                      </button>
                    </form>
                  </div>
                </div>
                <table className="w-full border">
                  <thead className="bg-blue-600 h-10 m-10">
                    <tr>
                      <th className="h-10 flex justify-evenly items-center">
                        <input
                          type="checkbox"
                          name="selectAll"
                          onChange={handleCheckboxChange}
                          checked={checkEveryCheckbox()}
                        />

                        <RiDeleteBin6Line
                          style={{
                            fontSize: "25px",
                            color: "gold",
                            cursor: "pointer",
                          }}
                          onClick={deleteMultiple}
                        />
                      </th>
                      <th className="poppins-light text-white border text-sm p-1">
                        #
                      </th>
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
                          <td>
                            <input
                              type="checkbox"
                              name={coupon._id}
                              value={coupon._id}
                              onChange={handleCheckboxChange}
                              checked={coupon.isChecked}
                            />
                          </td>
                          <td className="text-center border text-sm p-1">
                            {index + 1}
                          </td>
                          <td className="text-center border text-sm p-1">
                            {coupon.couponCode}
                          </td>
                          <td className="text-center border text-sm p-1">
                            {coupon.discountType === "percentage"
                              ? "%"
                              : "Fixed"}
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
                            {coupon.endDate
                              .split("T")[0]
                              .split("-")
                              .reverse()
                              .join("-")}
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
                              <span className="bg-green-600 px-1 rounded-md text-white hover:bg-green-700 mr-2">
                                Edit
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
              </>
            ) : (
              <h1 className="text-4xl py-3 poppins-light mt-10 mb-2">
                No Coupons
              </h1>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Homepage;
