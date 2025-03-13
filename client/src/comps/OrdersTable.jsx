import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { SlRefresh } from "react-icons/sl";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import NoData from "./NoData";
import Loading from "../comps/Loading";
import { RiDeleteBin6Line } from "react-icons/ri";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const { uid, role } = useSelector((state) => state.user_Slice);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [orderDeleted, setOrderDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deleteOrders, setDeleteOrders] = useState([]);

  const handleCheckboxChange = (e) => {
    try {
      const { name, checked } = e.target;

      if (name === "selectAll") {
        const updatedOrders = orders.map((order) => ({
          ...order,
          isChecked: checked, // Ensure every coupon gets updated
        }));

        setOrders(updatedOrders);
        setDeleteOrders(checked ? updatedOrders.map((order) => order._id) : []);
      } else {
        const updatedOrders = orders.map((order) =>
          order._id === name ? { ...order, isChecked: checked } : order
        );

        setOrders(updatedOrders);
        setDeleteOrders(
          updatedOrders
            .filter((order) => order.isChecked)
            .map((order) => order._id)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkEveryCheckbox = () => {
    return orders.length > 0 && orders.every((order) => order.isChecked);
  };

  const deleteMultiple = async () => {
    if (deleteOrders.length === 0) {
      toast.warn("No orders selected!");
      return;
    }

    const confirmation = window.confirm(
      "Do you really want to delete selected orders?"
    );

    if (!confirmation) return;

    try {
      const res = await axios.delete(
        "http://localhost:8000/api/v1/delete-orders",
        {
          data: {
            oids: deleteOrders,
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        // Remove deleted products from state
        setOrders(orders.filter((order) => !deleteOrders.includes(order._id)));
        setDeleteOrders([]);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to delete selected orders");
    }
  };

  const fetchAllOrders = async (pageNo) => {
    setLoading(true);
    try {
      let res;
      // if admin
      if (role == "admin") {
        res = await axios.get(
          `http://localhost:8000/api/v1/fetch-all-orders/${pageNo}`,
          {
            withCredentials: true,
          }
        );
      }

      // if customer
      if (role == "customer") {
        res = await axios.get(
          `http://localhost:8000/api/v1/fetch-customer-orders/${uid}`,
          {
            withCredentials: true,
          }
        );
      }

      console.log(res.data.data);

      if (res.data.success) {
        setOrders(res.data.data);
        setTotalPages(res.data.totalPagesCount);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const updateOrder = async (formData) => {
    setLoading(true);
    try {
      const oid = formData.get("oid");
      const status = formData.get("status");
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-order/${oid}`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        setStatusUpdated((prev) => !prev);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const deleteOrder = async (oid) => {
    const confimation = confirm("Do you really want to delete?");

    if (!confimation) return;

    setLoading(true);

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-order/${oid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrderDeleted((prev) => !prev);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchOrdersByDates = async (formData) => {
    setLoading(true);
    try {
      const startDate = formData.get("startDate");
      const endDate = formData.get("endDate");

      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-orders-by-dates/${startDate}/${endDate}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrders(res.data.data);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const fetchOrderByOrderId = async (formData) => {
    setLoading(true);
    try {
      const oid = formData.get("oid");

      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-order/${oid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrders([res.data.data]);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const fetchOrdersByStatus = async (formData) => {
    setLoading(true);
    const status = formData.get("status");

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-orders-by-status/${status}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrders(res.data.data);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const downloadInvoice = async (oid) => {
    try {
      window.open(
        `http://localhost:8000/api/v1/generate-invoice/${oid}`,
        "_blank"
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllOrders(currentPage);
  }, [statusUpdated, orderDeleted, currentPage]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
          {orders.length > 0 ? (
            <>
              <div className="w-full flex-col flex justify-between items-center my-5">
                <div className="flex justify-center items-center my-5">
                  <h1 className="text-4xl py-3 poppins-light bg-gray-200 rounded-md p-3">
                    Orders (
                    {orders.length < 10 ? `0${orders.length}` : orders.length})
                  </h1>

                  <button onClick={fetchAllOrders} className="ml-5">
                    <SlRefresh
                      className="text-4xl text-blue-600 hover:text-orange-600"
                      title="Refresh"
                    />
                  </button>
                </div>

                <div className="flex">
                  <form action={fetchOrdersByDates} className=" flex mr-5">
                    <div className=" border p-1 rounded mr-3">
                      <label htmlFor="startDate" className="font-semibold">
                        From:{" "}
                      </label>
                      <input type="date" name="startDate" id="startDate" />
                    </div>

                    <div className=" border p-1 rounded mr-3">
                      <label htmlFor="endDate" className="font-semibold">
                        To:{" "}
                      </label>
                      <input type="date" name="endDate" id="endDate" />
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                      Search
                    </button>
                  </form>

                  <form action={fetchOrdersByStatus} className="mr-3">
                    <label htmlFor="status" className="font-semibold">
                      Status:{" "}
                    </label>
                    <select
                      className="border rounded-lg py-1 px-1 outline-none focus:border-blue-600 mr-2"
                      name="status"
                      id="status"
                    >
                      <option value="">Select</option>
                      <option value="Pending">Pending</option>
                      <option value="On hold">On hold</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Cancelled & Refunded">
                        Cancelled & Refunded
                      </option>
                    </select>

                    <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                      Search
                    </button>
                  </form>

                  <form action={fetchOrderByOrderId}>
                    <input
                      type="text"
                      name="oid"
                      id="oid"
                      placeholder="Order ID"
                      className="border border-gray-300 rounded p-1 mr-2"
                      required
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                      Search
                    </button>
                  </form>
                </div>
              </div>

              {role === "admin" ? (
                <>
                  <table className="w-full border">
                    <thead className="bg-blue-600 text-white h-10 m-10">
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
                        <th className="poppins-light border text-sm p-1">#</th>
                        <th className="poppins-light border text-sm p-1">
                          Order ID
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Name
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Img
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Qnty
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Price
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Status
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Payment
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Date
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Action
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Update status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => {
                        return (
                          <tr
                            key={order._id}
                            className="odd:bg-white even:bg-gray-300 h-10 text-center border"
                          >
                            <td>
                              <input
                                type="checkbox"
                                name={order._id}
                                value={order._id}
                                onChange={handleCheckboxChange}
                                checked={order.isChecked}
                              />
                            </td>
                            <td className="border text-sm p-1">{index + 1}</td>
                            <td className="border text-sm p-1">{order._id}</td>
                            <td className="border text-sm p-1">
                              {order.product?.name}
                            </td>
                            <td className="flex justify-center p-1">
                              <img
                                src={order.img}
                                alt={order.product?.name}
                                width={40}
                              />
                            </td>
                            <td className="border text-sm p-1">
                              {order.quantity}
                            </td>
                            <td className="border text-sm p-1">
                              {order.product?.price}
                            </td>
                            <td className="border text-sm p-1">
                              {order.status}
                            </td>
                            <td className="border text-sm p-1">
                              {order.paymentMethod}
                            </td>
                            <td className="border text-sm p-1">
                              {order.createdAt
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-")}
                            </td>
                            <td className="border text-sm p-1">
                              <Link
                                to={`/dashboard/order-details?oid=${order._id}`}
                              >
                                <span className="bg-green-600 px-1 rounded-md text-white hover:bg-green-700">
                                  View
                                </span>
                              </Link>
                              <button
                                className="bg-red-600 px-1 rounded-md text-white hover:bg-red-700 ml-2"
                                onClick={() => {
                                  deleteOrder(order._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                            <td>
                              <form action={updateOrder}>
                                <input
                                  type="text"
                                  name="oid"
                                  defaultValue={order._id}
                                  readOnly
                                  className="hidden"
                                />
                                <select
                                  name="status"
                                  id="status"
                                  className="border rounded-md mr-2"
                                  required
                                >
                                  <option>Select status</option>
                                  <option value="On hold">On hold</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Cancelled">Cancelled</option>
                                  <option value="Cancelled & Refunded">
                                    Cancelled & Refunded
                                  </option>
                                </select>
                                <button
                                  type="submit"
                                  className="bg-green-600 px-1 rounded-md text-white hover:bg-green-700"
                                >
                                  Update
                                </button>
                              </form>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              ) : (
                <>
                  <table className="w-full border">
                    <thead className="bg-blue-600 text-white h-10 m-10">
                      <tr>
                        <th className="poppins-light border text-sm p-1">#</th>
                        <th className="poppins-light border text-sm p-1">
                          Order ID
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Name
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Img
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Qnty
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Price
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Status
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Payment
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Date
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Invoice
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => {
                        return (
                          <tr
                            key={order._id}
                            className="odd:bg-white even:bg-gray-300 h-10 text-center border"
                          >
                            <td className="border text-sm p-1">{index + 1}</td>
                            <td className="border text-sm p-1">{order._id}</td>
                            <td className="border text-sm p-1">
                              {order.product?.name}
                            </td>
                            <td className="flex justify-center p-1">
                              <img
                                src={order.product?.img}
                                alt={order.product?.name}
                                width={40}
                              />
                            </td>
                            <td className="border text-sm p-1">
                              {order.quantity}
                            </td>
                            <td className="border text-sm p-1">
                              {order.product?.price}
                            </td>
                            <td className="border text-sm p-1">
                              {order.status}
                            </td>
                            <td className="border text-sm p-1">
                              {order.paymentMethod}
                            </td>
                            <td className="border text-sm p-1">
                              {order.createdAt
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-")}
                            </td>
                            <td className="border text-sm p-1">
                              {order.status === "Completed" ? (
                                <button
                                  className="bg-green-600 px-1 rounded-md text-white hover:bg-green-700 ml-2"
                                  onClick={() => {
                                    downloadInvoice(order._id);
                                  }}
                                >
                                  Download
                                </button>
                              ) : (
                                "Not available"
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </>
              )}
            </>
          ) : (
            <NoData data={"Orders"} />
          )}
        </div>
      )}
    </>
  );
};

export default OrdersTable;
