import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { SlRefresh } from "react-icons/sl";
import { useSelector } from "react-redux";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const { uid, role } = useSelector((state) => state.user_Slice);

  const fetchAllOrders = async () => {
    try {
      let res;
      // if admin
      if (role == "admin") {
        res = await axios.get(`http://localhost:8000/api/v1/fetch-all-orders`, {
          withCredentials: true,
        });
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

      console.log(res);

      if (res.data.success) {
        console.log(res.data.data);
        setOrders(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateOrder = async (formData) => {
    try {
      const oid = formData.get("oid");
      const status = formData.get("status");
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-order/${oid}`,
        { status },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = async (oid) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-order/${oid}`,
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
    fetchAllOrders();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
      {orders.length > 0 ? (
        <>
          <div className="flex justify-center items-center mt-10">
            <h1 className="text-4xl py-3 poppins-light  mb-2">All Orders</h1>
            <button onClick={fetchAllOrders} className="ml-5">
              <SlRefresh
                className="text-4xl text-blue-600 hover:text-orange-600"
                title="Refresh"
              />
            </button>
          </div>
          <table className="w-full border">
            <thead className="bg-blue-600 text-white h-10 m-10">
              <tr>
                <th className="poppins-light border text-sm p-1">#</th>
                <th className="poppins-light border text-sm p-1">Order ID</th>
                <th className="poppins-light border text-sm p-1">
                  Product Name
                </th>
                <th className="poppins-light border text-sm p-1">
                  Product Img
                </th>
                <th className="poppins-light border text-sm p-1">Quantity</th>
                <th className="poppins-light border text-sm p-1">
                  Product Price
                </th>
                <th className="poppins-light border text-sm p-1">
                  Order Status
                </th>
                <th className="poppins-light border text-sm p-1">
                  Payment Method
                </th>
                <th className="poppins-light border text-sm p-1">Time</th>
                <th className="poppins-light border text-sm p-1">Action</th>
                <th className="poppins-light border text-sm p-1">Status</th>
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
                    <td className="border text-sm p-1">{order.quantity}</td>
                    <td className="border text-sm p-1">
                      {order.product?.price}
                    </td>
                    <td className="border text-sm p-1">{order.status}</td>
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
                      <Link to={`/dashboard/order-details/${order._id}`}>
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
        </>
      ) : (
        <h1 className="text-4xl py-3 poppins-light mt-10 mb-2">No Orders</h1>
      )}
    </div>
  );
};

export default OrdersTable;
