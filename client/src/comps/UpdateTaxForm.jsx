import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BackBtn from "./BackBtn";

const UpdateTaxForm = () => {
  const [tax, setTax] = useState({
    state: "",
    CGSTRate: "",
    SGSTRate: "",
  });

  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const tid = queryString.get("tid");

  const fetchTax = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-tax/${tid}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setTax({
          state: res.data.data.state,
          CGSTRate: res.data.data.CGSTRate,
          SGSTRate: res.data.data.SGSTRate,
        });
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTax((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTaxUpdation = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-tax/${tid}`,
        tax,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchTax();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <BackBtn link={"/dashboard/tax"} />
      <h1 className="text-4xl py-3 poppins-light mb-5">Update Tax</h1>
      <div className="flex flex-col border rounded-lg p-5">
        <form
          className=" flex justify-center items-center mb-3"
          onSubmit={handleTaxUpdation}
        >
          <div className="w-3/12 flex flex-col px-2">
            <label htmlFor="state" className="mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={tax.state}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Uttar Pradesh"
              required
            />
          </div>

          <div className="w-3/12 flex flex-col px-2">
            <label htmlFor="name" className="mb-2">
              CGST Rate (%)
            </label>
            <input
              type="text"
              name="CGSTRate"
              id="CGSTRate"
              value={tax.CGSTRate}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="18"
              required
            />
          </div>

          <div className="w-1/12 flex flex-col px-2">
            <label htmlFor="rate" className="mb-2">
              SGST Rate (%)
            </label>
            <input
              type="number"
              name="SGSTRate"
              id="SGSTRate"
              value={tax.SGSTRate}
              onChange={handleChange}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="18"
              required
            />
          </div>

          <div className="w-2/12 flex flex-col px-2 pt-7">
            <button
              type="submit"
              className="inline-block bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
            >
              Update Tax
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTaxForm;
