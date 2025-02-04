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
    <div className="flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular my-5">Order details</h1>
      <div className="flex flex-col w-4/12 border rounded-lg p-5"></div>
    </div>
  );
};

export default AdminOrderDetails;
