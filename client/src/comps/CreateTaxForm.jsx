import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  taxTypeSchema,
  gstSchema,
  taxSchema,
} from "../utils/validation/taxSchema";

const CreateTaxForm = ({ setTaxCreated, categories }) => {
  const [singleStoreTax, setSingleStoreTax] = useState(true);

  const handleTaxType = (formData) => {
    const taxType = formData.get("taxType");

    if (taxType === "Signle store tax") {
      setSingleStoreTax(true);
    }

    if (taxType === "Category wise tax") {
      setSingleStoreTax(false);
    }
  };

  const handleTaxCreation = async (formData) => {
    const cid = formData.get("cid");
    const GSTRate = formData.get("GSTRate");

    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/create-tax`,
        {
          cid,
          GSTRate,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(res.data.data);
        toast.success(res.data.msg);
        setTaxCreated((prev) => !prev);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="w-10/12 flex flex-col justify-start items-center">
      <h1 className="text-4xl py-3 poppins-light mt-10 mb-5">Create Tax</h1>
      <div className="flex w-full border rounded-lg p-5">
        <div className="w-5/12 mr-3">
          <p className="text-center">{"Tax selection"}</p>
          <form
            className="w-full flex justify-center items-center border rounded-lg p-5"
            action={handleTaxType}
          >
            <div className="w-9/12 flex flex-col px-2">
              <label htmlFor="taxType" className="mb-2">
                Tax type
              </label>
              <select
                className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                name="taxType"
                id="taxType"
                required
              >
                <option value="Signle store tax">Signle store tax</option>
                <option value="Category wise tax">Category wise tax</option>
              </select>
            </div>

            <div className="w-3/12 flex flex-col px-2 pt-7">
              <button
                type="submit"
                className="inline-block bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Select
              </button>
            </div>
          </form>
        </div>

        <div className="w-7/12">
          <p className="text-center text-orange-600 font-semibold">
            {singleStoreTax ? "Signle store tax" : "Category wise tax"}
          </p>
          {singleStoreTax ? (
            <form
              className=" flex  items-center mb-3 border rounded-lg p-5"
              action={handleTaxCreation}
            >
              <div className="w-8/12 flex flex-col px-2">
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

              <div className="w-4/12 flex flex-col px-2 pt-7">
                <button
                  type="submit"
                  className="inline-block bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
                >
                  Create Tax
                </button>
              </div>
            </form>
          ) : (
            <form
              className=" flex justify-center items-center mb-3 border rounded-lg p-5"
              action={handleTaxCreation}
            >
              <div className="w-4/12 flex flex-col px-2">
                <label htmlFor="cid" className="mb-2">
                  Category
                </label>
                <select
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  name="cid"
                  id="cid"
                  required
                >
                  <option>Select</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
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

              <div className="w-3/12 flex flex-col px-2 pt-7">
                <button
                  type="submit"
                  className="inline-block bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
                >
                  Create Tax
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTaxForm;
