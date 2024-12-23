import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { SlRefresh } from "react-icons/sl";

const AdminOrdersTable = () => {
  const [adminOrders, setAdminOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-orders`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setAdminOrders(res.data.data);
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
      <div className="flex">
        <h1 className="text-4xl py-3 poppins-light my-10">All Orders</h1>
        <button onClick={fetchAllOrders} className="ml-5">
          <SlRefresh className="text-4xl text-blue-600 hover:text-blue-700" />
        </button>
      </div>
      <table className="w-full border">
        <thead className="bg-blue-600 text-white h-10 m-10">
          <tr>
            <th>#</th>
            <th className="poppins-light">Product Name</th>
            <th className="poppins-light">Product Img</th>
            <th className="poppins-light">Quantity</th>
            <th className="poppins-light">Product Price</th>
            <th className="poppins-light">Product Category</th>
            <th className="poppins-light">Order Status</th>
            <th className="poppins-light">Payment Method</th>
            <th className="poppins-light">Time</th>
            <th className="poppins-light">Action</th>
            <th className="poppins-light">Change status</th>
          </tr>
        </thead>
        <tbody>
          {adminOrders.map((order, index) => {
            return (
              <tr
                key={order._id}
                className="odd:bg-white even:bg-gray-300 h-10 text-center border"
              >
                <td>{index + 1}</td>
                <td>{order.product?.name}</td>
                <td className="flex justify-center p-1">
                  <img
                    src={order.product?.img}
                    alt={order.product?.name}
                    width={40}
                  />
                </td>
                <td>{order.quantity}</td>
                <td>{order.product?.price}</td>
                <td>{order.product?.category?.name}</td>
                <td>{order.status}</td>
                <td>{order.paymentMethod}</td>
                <td>
                  {order.createdAt.split("T")[0].split("-").reverse().join("-")}
                </td>
                <td>
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
                      <option value="On hold">On hold</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Cancelled & Refunded">
                        Cancelled & Refunded
                      </option>
                    </select>
                    <button
                      type="submit"
                      className="bg-orange-600 px-1 rounded-md text-white hover:bg-orange-700"
                    >
                      Update Order
                    </button>
                  </form>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrdersTable;
