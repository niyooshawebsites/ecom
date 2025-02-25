import { useState, useEffect } from "react";
import Loading from "./Loading";
import axios from "axios";

const ShippingForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [couriers, setCouriers] = useState(null);

  const shppingAuth = async () => {
    try {
      const res = await axios.post(
        "https://apiv2.shiprocket.in/v1/external/auth/login",
        {
          email: import.meta.env.VITE_SHIPROCKET_EMAIL,
          password: import.meta.env.VITE_SHIPROCKET_PASSWORD,
        }
      );

      const shippingAuthToken = await res.data.token;

      if (shippingAuthToken) {
        const response = await axios.get(
          "https://apiv2.shiprocket.in/v1/external/courier/serviceability",
          {
            params: {
              pickup_postcode: 110094,
              delivery_postcode: 110001,
              weight: 10,
              length: 10,
              breadth: 10,
              height: 10,
              cod: 1,
            },

            headers: { Authorization: `Bearer ${shippingAuthToken}` },
          }
        );

        console.log(response);

        if (response) {
          setCouriers(response.data.data.available_courier_companies);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleShippingSelection = () => {};

  useEffect(() => {
    shppingAuth();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <h1 className="text-4xl py-3 poppins-light my-10">
            Select Shipping Parter
          </h1>
          <div className="flex flex-col w-5/12 border rounded-lg p-5">
            <form className="mb-3" action={handleShippingSelection}>
              <div className="flex flex-col mb-3">
                <label htmlFor="category" className="mb-2">
                  Select category
                </label>
                <select
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  name="category"
                  id="category"
                  //   value={productDetails.category}
                  //   onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  {console.log(couriers)}
                  {couriers?.map((courier) => (
                    <option key={courier.id} value={courier.id}>
                      {courier.courier_name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500">{errors.category._errors[0]}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Select
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingForm;
