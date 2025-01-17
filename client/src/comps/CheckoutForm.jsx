import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const CheckoutForm = () => {
  const states = ["Delhi", "Maharashtra", "West Bengal", "Tamil Nadu"];

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const {
    cartProduct,
    cartProductList,
    cartDiscount,
    cartGrossTotal,
    cartNetTotal,
  } = useSelector((state) => state.cart_Slice);

  const [cartTotal, setCartTotal] = useState(0);

  const { uid } = useSelector((state) => state.user_Slice);

  const calculateCartTotal = () => {
    const intialValue = 0;
    const sumOfCart = cartProductList.reduce(
      (total, item) => total + item.productTotalAmount,
      intialValue
    );
    return sumOfCart;
  };

  const placeOrder = async (formData) => {
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    const fName = formData.get("fname");
    const lname = formData.get("lname");
    const contactNo = formData.get("contactNo");
    const buildingNo = formData.get("buildingNo");
    const streetNo = formData.get("streetNo");
    const locality = formData.get("locality");
    const district = formData.get("district");
    const landmark = formData.get("landmark");
    const city = formData.get("city");
    const state = formData.get("state");
    const pincode = formData.get("pincode");
    const orderNote = formData.get("orderNote");

    try {
      // account creation.

      const accountRes = await axios.post(
        `http://localhost:8000/api/v1/register`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      );

      // if account creation is successfull
      if (accountRes.success) {
        toast.success(accountRes.msg);

        // update user contact information
        const userRes = await axios.patch(
          `http://localhost:8000/api/v1/update-user/${uid}`,
          {
            fName,
            lname,
            contactNo,
            buildingNo,
            streetNo,
            locality,
            district,
            landmark,
            city,
            state,
            pincode,
          },
          { withCredentials: true }
        );

        // if user contact information updation is successfull
        if (userRes.success) {
          const orderRes = await axios.post(
            `http;//localhost:8000/api/v1/create-order/${cartProduct.productId}`,
            { uid, quantity: cartProduct.productQuantity, orderNote },
            { withCredentials: true }
          );

          // if order is successfull
          if (orderRes.success) {
            toast.success(orderRes.msg);
          }
        }
      }
    } catch (err) {
      toast.error(err.response.data.msg);
      console.log(err.response.data.msg);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setCartTotal(calculateCartTotal());
  }, []);

  return (
    <div className=" flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-light my-10">Checkout</h1>
      <form className="w-8/12 mb-3" action={placeOrder}>
        <div className="flex">
          <div className="w-7/12">
            <h2 className="font-semibold mb-5">Account information</h2>
            <div className="flex mb-5">
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="username" className="mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Unique username"
                  required
                />
              </div>

              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="password" className="mb-2">
                  Password
                </label>
                <div className="flex justify-start items-center">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    name="password"
                    id="password"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                    placeholder="Strong passowrd"
                    required
                  />
                  <Link className="ml-2" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? "Hide" : "Show"}
                  </Link>
                </div>
              </div>
            </div>

            <h2 className="font-semibold mb-5">Billing information</h2>

            <div className="flex mb-3">
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="fname" className="mb-2">
                  First name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="fname"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="First name"
                  required
                />
              </div>

              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="lname" className="mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="lname"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Last name"
                  required
                />
              </div>
            </div>

            <div className="flex mb-3">
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="email" className="mb-2">
                  Email
                </label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="contactNo" className="mb-2">
                  Contact number
                </label>
                <input
                  type="text"
                  name="contactNo"
                  id="contactNo"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Contact number"
                  required
                />
              </div>
            </div>

            <div className="flex mb-3">
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="buildingNo" className="mb-2">
                  Building number
                </label>
                <input
                  type="text"
                  name="buildingNo"
                  id="buildingNo"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Building number"
                  required
                />
              </div>

              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="streetNo" className="mb-2">
                  Street number
                </label>
                <input
                  type="text"
                  name="streetNo"
                  id="streetNo"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Street number"
                  required
                />
              </div>
            </div>

            <div className="flex mb-3">
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="locality" className="mb-2">
                  Locality
                </label>
                <input
                  type="text"
                  name="locality"
                  id="locality"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Locality"
                  required
                />
              </div>
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="district" className="mb-2">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  id="district"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="District"
                  required
                />
              </div>
            </div>

            <div className="flex mb-3">
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="landmark" className="mb-2">
                  Landmark
                </label>
                <input
                  type="text"
                  name="landmark"
                  id="landmark"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Landmark"
                  required
                />
              </div>

              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="city" className="mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="city"
                  required
                />
              </div>
            </div>

            <div className="flex mb-3">
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="state" className="mb-2">
                  State
                </label>
                <select
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  name="state"
                  id="state"
                  required
                >
                  {states.map((state, index) => (
                    <option key={index} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="pincode" className="mb-2">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  id="pincode"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Pincode"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 px-2">
              <label htmlFor="orderNote" className="mb-2">
                Order note
              </label>
              <textarea
                name="orderNote"
                id="orderNote"
                className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                rows={3}
                placeholder="Share order note, if any"
                required
              ></textarea>
            </div>
          </div>

          <div className="w-5/12 border rounded-lg ">
            <div className="flex flex-col justify-start items-center min-h-screen px-5">
              {cartProductList.length > 0 ? (
                <div className="flex flex-col w-full py-5">
                  <table className="w-full border">
                    <thead className="bg-blue-600 text-white h-10 m-10">
                      <tr>
                        <th className="poppins-light border text-sm p-1">
                          Product Name
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Quantity
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Price (Rs)
                        </th>
                        <th className="poppins-light border text-sm p-1">
                          Total (Rs)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProductList.map((cartProduct, index) => {
                        return (
                          <tr
                            key={index}
                            className="odd:bg-white even:bg-gray-300 h-10 text-center border"
                          >
                            <td className="border text-sm p-1">
                              {cartProduct.productName}
                            </td>
                            <td className="border text-sm p-1">
                              <span>{cartProduct.productQuantity}</span>
                            </td>
                            <td className="border text-sm p-1">
                              {cartProduct.productPrice}
                            </td>
                            <td className="border text-sm p-1">
                              {cartProduct.productTotalAmount}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  <div className="w-full flex justify-between border p-5">
                    <table className="w-full table-auto">
                      <tbody>
                        <tr className="border-b">
                          <td className="border text-sm p-1 font-bold">
                            Gross amount
                          </td>
                          <td className="poppins-light border text-sm p-1 text-center">
                            Rs {cartGrossTotal || 0}
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="border text-sm p-1 font-bold">
                            Discount:
                          </td>
                          <td className="poppins-light border text-sm p-1 text-center">
                            Rs ({cartDiscount.discountAmount || 0})
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="border text-sm p-1 font-bold">
                            Net amount
                          </td>
                          <td className="poppins-light border text-sm p-1 text-center">
                            Rs {cartNetTotal || 0}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="w-4/12 flex flex-col justify-center items-center bg-gray-200 p-10 rounded-lg">
                  <h3 className="mb-3">
                    The cart is empty! Add some products to the cart!
                  </h3>
                  <Link
                    className="bg-blue-600 py-2 px-4 border rounded-md text-xl text-gray-100 hover:bg-blue-700"
                    to="/"
                  >
                    Go the shop
                  </Link>
                </div>
              )}

              <div className="flex flex-col justify-start item-start mb-3 px-2 w-full">
                <h2 className="font-semibold mb-5">Payment method</h2>

                <label htmlFor="online" className="mb-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="online"
                    value={"Online"}
                    defaultChecked
                  />{" "}
                  Online
                </label>

                <label htmlFor="cod" className="mb-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value={"COD"}
                  />{" "}
                  Cash on Delivery
                </label>
              </div>

              <button
                type="submit"
                className="bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-700 w-full"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
