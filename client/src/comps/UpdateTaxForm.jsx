import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BackBtn from "./BackBtn";
import Loading from "./Loading";

const UpdateTaxForm = () => {
  const [loading, setLoading] = useState(false);

  const [tax, setTax] = useState({
    state: "",
    GSTRate: "",
  });

  const indianRegions = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const tid = queryString.get("tid");

  const fetchTax = async () => {
    setLoading(true);
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
          GSTRate: res.data.data.CGSTRate,
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
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
    setLoading(true);

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
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTax();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <BackBtn link={"/dashboard/tax"} />
          <h1 className="text-4xl py-3 poppins-light mb-5">Update Tax</h1>
          <div className="flex flex-col border w-10/12 rounded-lg p-5">
            <form
              className=" flex justify-center items-center mb-3"
              onSubmit={handleTaxUpdation}
            >
              <div className="w-4/12 flex flex-col px-2">
                <label htmlFor="state" className="mb-2">
                  State
                </label>
                <select
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  name="state"
                  id="state"
                  value={tax.state}
                  onChange={handleChange}
                  required
                >
                  <option>Select</option>
                  {indianRegions.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-4/12 flex flex-col px-2">
                <label htmlFor="GSTRate" className="mb-2">
                  GST Rate (%)
                </label>
                <input
                  type="text"
                  name="GSTRate"
                  id="GSTRate"
                  value={tax.GSTRate}
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
      )}
    </>
  );
};

export default UpdateTaxForm;
