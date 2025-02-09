import axios from "axios";
import { toast } from "react-toastify";

const CreateTaxForm = ({ setTaxCreated }) => {
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

  const handleTaxCreation = async (formData) => {
    const state = formData.get("state");
    const GSTRate = formData.get("GSTRate");

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/create-tax`,
        {
          state,
          GSTRate,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setTaxCreated((prev) => !prev);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-10/12 flex flex-col justify-start items-center">
      <h1 className="text-4xl py-3 poppins-light mt-10 mb-5">Create Tax</h1>
      <div className="flex flex-col w-full border rounded-lg p-5">
        <form
          className=" flex justify-center items-center mb-3"
          action={handleTaxCreation}
        >
          <div className="w-4/12 flex flex-col px-2">
            <label htmlFor="state" className="mb-2">
              State
            </label>
            <select
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              name="state"
              id="state"
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
              type="number"
              name="GSTRate"
              id="GSTRate"
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
              Create Tax
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaxForm;
