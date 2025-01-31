import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const AdminOrderDetails = () => {
  const [order, setOrder] = useState({});
  const [oid] = useSearchParams();

  const fetchOrder = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-order/${oid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setOrder(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchOrder(oid);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular">Login</h1>
      <div className="flex flex-col w-4/12 border rounded-lg p-5">
        <form className="mb-3">
          <div className="flex flex-col mb-3">
            <label htmlFor="email">Product Name</label>
            <input
              type="name"
              name="name"
              id="name"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Update order
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
