import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { paymentMethodSliceActions } from "../store/slices/paymentMethodSlice";
import { cartSliceActions } from "../store/slices/cartSlice";

const CheckoutForm = () => {
  const states = ["Delhi", "Maharashtra", "West Bengal", "Tamil Nadu"];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedInUserDetails, setLoggedInUserDetails] = useState({
    fName: "",
    lName: "",
    email: "",
    username: "",
    password: "",
    contactNo: "",
    buildingNo: "",
    streetNo: "",
    locality: "",
    district: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    orderNote: "",
    paymentMethod: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { uid } = useSelector((state) => state.user_Slice);

  const { cartProductList, cartDiscount, cartGrossTotal, cartNetTotal } =
    useSelector((state) => state.cart_Slice);

  const [cartTotal, setCartTotal] = useState(0);

  const calculateCartTotal = () => {
    const intialValue = 0;
    const sumOfCart = cartProductList.reduce(
      (total, item) => total + item.productTotalAmount,
      intialValue
    );
    return sumOfCart;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoggedInUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const fetchLoggedUserDetailsonPageLoad = async (uid) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-user/${uid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        // setLoggedInUserDetails(res.data.data.contactDetails);
        setLoggedInUserDetails((prev) => ({
          ...prev,
          fName: res.data.data.contactDetails.fName,
          lName: res.data.data.contactDetails.lName,
          email: res.data.data.email,
          contactNo: res.data.data.contactDetails.contactNo,
          buildingNo: res.data.data.contactDetails.address.buildingNo,
          streetNo: res.data.data.contactDetails.address.streetNo,
          locality: res.data.data.contactDetails.address.locality,
          district: res.data.data.contactDetails.address.district,
          landmark: res.data.data.contactDetails.address.landmark,
          city: res.data.data.contactDetails.address.city,
          state: res.data.data.contactDetails.address.state,
          pincode: res.data.data.contactDetails.address.pincode,
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const resetCart = () => {
    dispatch(
      cartSliceActions.populateCartProduct({
        productId: null,
        productName: null,
        productPrice: null,
        productCategory: null,
        productQuantity: null,
        productTotalAmount: null,
      })
    );

    dispatch(
      cartSliceActions.populateCartList({
        cartProductList: [],
      })
    );

    dispatch(
      cartSliceActions.populateCartGrossTotal({
        cartGrossTotal: 0,
      })
    );

    dispatch(
      cartSliceActions.populateCartDiscount({
        discountAmount: 0,
        couponCode: null,
        couponDesc: null,
      })
    );

    dispatch(
      cartSliceActions.populateCartNetTotal({
        cartNetTotal: 0,
      })
    );
  };

  const emptyCartError = () => {
    if (cartProductList.length === 0) {
      toast.error("Cart is empty!");
    }
  };

  const placeOrder = async () => {
    try {
      // if not logged in
      if (!uid) {
        // check for exisitng user before placing the order
        const fetchUserAtOrderCreationRes = await axios.get(
          `http://localhost:8000/api/v1/fetch-user-at-order-creation/${loggedInUserDetails.username}/${loggedInUserDetails.email}`
        );

        // if user already exists
        if (fetchUserAtOrderCreationRes.data.success) {
          toast.error(fetchUserAtOrderCreationRes.data.msg);
        }
      }

      // if not uid all the followin will be ignored as control will flow to the catch part
      // if the user is logged in
      if (uid) {
        // update user contact information
        const userContactInfoRes = await axios.patch(
          `http://localhost:8000/api/v1/update-contact-details-while-placing-order/${uid}`,
          {
            fName: loggedInUserDetails.fName,
            lName: loggedInUserDetails.lName,
            contactNo: loggedInUserDetails.contactNo,
            buildingNo: loggedInUserDetails.buildingNo,
            streetNo: loggedInUserDetails.streetNo,
            locality: loggedInUserDetails.locality,
            district: loggedInUserDetails.district,
            landmark: loggedInUserDetails.landmark,
            city: loggedInUserDetails.city,
            state: loggedInUserDetails.state,
            pincode: loggedInUserDetails.pincode,
          }
        );

        if (userContactInfoRes.data.success) {
          // if payment method is online
          if (loggedInUserDetails.paymentMethod == "Online") {
            // create a RAZORPAT ORDER
            const razorpayOrderRes = await axios.post(
              `http://localhost:8000/api/v1/create-razorpay-order`,
              {
                amount: cartNetTotal,
                currency: "INR",
              },
              {
                withCredentials: true,
              }
            );

            // if RAZORPAY order is successful - Time for payment verification
            if (razorpayOrderRes.data.success) {
              const {
                id: order_id,
                amount,
                currency,
              } = razorpayOrderRes.data.data;

              const options = {
                key: `${import.meta.env.VITE_RAZORPAY_KEY}`,
                amount: amount,
                currency: currency,
                name: "Woodmart",
                description: "Test Transaction",
                order_id: order_id,
                handler: async function (response) {
                  // Step 3: Verify Payment
                  const verifyResponse = await axios.post(
                    "http://localhost:8000/api/v1/verify-razorpay-payment",
                    {
                      razorpay_order_id: response.razorpay_order_id,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature,
                    }
                  );

                  // if payment is verified - create new order in the app
                  if (verifyResponse.data.success) {
                    cartProductList.map(async (product) => {
                      const orderRes = await axios.post(
                        `http://localhost:8000/api/v1/create-order/${product.productId}`,
                        {
                          uid,
                          quantity: product.productQuantity,
                          orderNote: loggedInUserDetails.orderNote,
                          paymentMethod: loggedInUserDetails.paymentMethod,
                          tnxId: response.razorpay_payment_id,
                          paymentStatus: "Paid",
                        },
                        { withCredentials: true }
                      );

                      // if order is successful
                      if (orderRes.data.success) {
                        dispatch(
                          paymentMethodSliceActions.populatePaymentStatus({
                            online: true,
                            offline: false,
                          })
                        );

                        // reset the cart
                        resetCart();
                        navigate("/payment-success");
                      }
                    });
                  }
                },
                prefill: {
                  name: loggedInUserDetails.fName,
                  email: loggedInUserDetails.email,
                  contact: loggedInUserDetails.contactNo,
                },
                theme: {
                  color: "#3399cc",
                },
              };

              const razor = new window.Razorpay(options);
              razor.open();
            }
          }

          // if payment method is offline - COD
          if (loggedInUserDetails.paymentMethod === "COD") {
            cartProductList.map(async (product) => {
              const orderRes = await axios.post(
                `http://localhost:8000/api/v1/create-order/${product.productId}`,
                {
                  uid,
                  quantity: product.productQuantity,
                  orderNote: loggedInUserDetails.orderNote,
                  paymentMethod: loggedInUserDetails.paymentMethod,
                  paymentStatus: "Unpaid",
                },
                { withCredentials: true }
              );

              // if COD order is successful
              if (orderRes.data.success) {
                dispatch(
                  paymentMethodSliceActions.populatePaymentStatus({
                    online: false,
                    offline: true,
                  })
                );

                // reset the cart
                resetCart();
                navigate("/order-confirmation");
              }
            });
          }
        }
      }
    } catch (err) {
      console.log(err.message);

      try {
        // if no exising user found - account creation
        const accountRes = await axios.post(
          `http://localhost:8000/api/v1/register`,
          {
            username: loggedInUserDetails.username,
            email: loggedInUserDetails.email,
            password: loggedInUserDetails.password,
          },
          { withCredentials: true }
        );

        // if account creation is successful - update user contac info
        if (accountRes.data.success) {
          toast(accountRes.data.msg);

          // update user contact information
          const userContactInfoRes = await axios.patch(
            `http://localhost:8000/api/v1/update-contact-details-while-placing-order/${accountRes.data.data._id}`,
            {
              fName: loggedInUserDetails.fName,
              lName: loggedInUserDetails.lName,
              contactNo: loggedInUserDetails.contactNo,
              buildingNo: loggedInUserDetails.buildingNo,
              streetNo: loggedInUserDetails.streetNo,
              locality: loggedInUserDetails.locality,
              district: loggedInUserDetails.district,
              landmark: loggedInUserDetails.landmark,
              city: loggedInUserDetails.city,
              state: loggedInUserDetails.state,
              pincode: loggedInUserDetails.pincode,
            }
          );

          if (userContactInfoRes.data.success) {
            // if payment method is online
            if (loggedInUserDetails.paymentMethod === "Online") {
              // create a RAZORPAT ORDER
              const razorpayOrderRes = await axios.post(
                `http://localhost:8000/api/v1/create-razorpay-order`,
                {
                  amount: cartNetTotal,
                  currency: "INR",
                },
                {
                  withCredentials: true,
                }
              );

              // if RAZORPAY order is successful - Time for payment verification
              if (razorpayOrderRes.data.success) {
                const {
                  id: order_id,
                  amount,
                  currency,
                } = razorpayOrderRes.data.data;

                const options = {
                  key: `${import.meta.env.VITE_RAZORPAY_KEY}`,
                  amount: amount,
                  currency: currency,
                  name: "Woodmart",
                  description: "Test Transaction",
                  order_id: order_id,
                  handler: async function (response) {
                    // Step 3: Verify Payment
                    const verifyResponse = await axios.post(
                      "http://localhost:8000/api/v1/verify-razorpay-payment",
                      {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                      }
                    );

                    // if payment is verified - create new order in the app
                    if (verifyResponse.data.success) {
                      cartProductList.map(async (product) => {
                        const orderRes = await axios.post(
                          `http://localhost:8000/api/v1/create-order/${product.productId}`,
                          {
                            uid: accountRes.data.data._id,
                            quantity: product.productQuantity,
                            orderNote: loggedInUserDetails.orderNote,
                            paymentMethod: loggedInUserDetails.paymentMethod,
                            tnxId: response.razorpay_payment_id,
                            paymentStatus: "Paid",
                          },
                          { withCredentials: true }
                        );

                        // if order is successful
                        if (orderRes.data.success) {
                          dispatch(
                            paymentMethodSliceActions.populatePaymentStatus({
                              online: true,
                              offline: false,
                            })
                          );

                          // reset the cart
                          resetCart();
                          navigate("/payment-success");
                        }
                      });
                    }
                  },
                  prefill: {
                    name: loggedInUserDetails.fName,
                    email: loggedInUserDetails.email,
                    contact: loggedInUserDetails.contactNo,
                  },
                  theme: {
                    color: "#3399cc",
                  },
                };

                const razor = new window.Razorpay(options);
                razor.open();
              }
            }

            // if payment method is offline - COD
            if (loggedInUserDetails.paymentMethod === "COD") {
              cartProductList.map(async (product) => {
                const orderRes = await axios.post(
                  `http://localhost:8000/api/v1/create-order/${product.productId}`,
                  {
                    uid: accountRes.data.data._id,
                    quantity: product.productQuantity,
                    orderNote: loggedInUserDetails.orderNote,
                    paymentMethod: loggedInUserDetails.paymentMethod,
                    paymentStatus: "Unpaid",
                  },
                  { withCredentials: true }
                );

                // if COD order is successful
                if (orderRes.data.success) {
                  dispatch(
                    paymentMethodSliceActions.populatePaymentStatus({
                      online: false,
                      offline: true,
                    })
                  );

                  // reset the cart
                  resetCart();
                  navigate("/order-confirmation");
                }
              });
            }
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cartProductList.length > 0 ? placeOrder() : emptyCartError();
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setCartTotal(calculateCartTotal());
    fetchLoggedUserDetailsonPageLoad(uid);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      console.log("Razorpay scipt loaded successfully");
    };
    script.onerror = () => console.error("Failed to load Razorpay script");
    document.body.appendChild(script);
  }, []);

  return (
    <div className=" flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-light my-10">Checkout</h1>
      <form className="w-8/12 mb-3" onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w-7/12">
            {uid ? (
              <></>
            ) : (
              <>
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
                      value={loggedInUserDetails.username}
                      onChange={handleChange}
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
                        value={loggedInUserDetails.password}
                        onChange={handleChange}
                        className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                        placeholder="Strong passowrd"
                        required
                      />
                      <Link
                        className="ml-2 border p-2 rounded-md"
                        onClick={togglePasswordVisibility}
                      >
                        {isPasswordVisible ? "Hide" : "Show"}
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}

            <h2 className="font-semibold mb-5">Shipping information</h2>

            <div className="flex mb-3">
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="fName" className="mb-2">
                  First name
                </label>
                <input
                  type="text"
                  name="fName"
                  id="fName"
                  value={loggedInUserDetails.fName}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="John"
                  required
                />
              </div>

              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="lName" className="mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  name="lName"
                  id="lName"
                  value={loggedInUserDetails.lName}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Doe"
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
                  value={loggedInUserDetails.email}
                  onChange={handleChange}
                  className={`border rounded-lg py-2 px-2 outline-none focus:border-blue-600 ${
                    uid ? "bg-gray-200 text-gray-500" : ""
                  }`}
                  placeholder="johndoe@example.com"
                  readOnly={uid ? true : false}
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
                  value={loggedInUserDetails.contactNo}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="99898989898"
                  required
                />
              </div>
            </div>

            <div className="flex mb-3">
              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="buildingNo" className="mb-2">
                  Building number or name
                </label>
                <input
                  type="text"
                  name="buildingNo"
                  id="buildingNo"
                  value={loggedInUserDetails.buildingNo}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="A 145"
                  required
                />
              </div>

              <div className="w-6/12 flex flex-col px-2">
                <label htmlFor="streetNo" className="mb-2">
                  Street number or name
                </label>
                <input
                  type="text"
                  name="streetNo"
                  id="streetNo"
                  value={loggedInUserDetails.streetNo}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="07"
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
                  value={loggedInUserDetails.locality}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Panchsheet society"
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
                  value={loggedInUserDetails.district}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="North east"
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
                  value={loggedInUserDetails.landmark}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="KFC"
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
                  value={loggedInUserDetails.city}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Agra"
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
                  value={loggedInUserDetails.state}
                  onChange={handleChange}
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
                  value={loggedInUserDetails.pincode}
                  onChange={handleChange}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="201301"
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
                value={loggedInUserDetails.orderNote}
                onChange={handleChange}
                placeholder="Share order note, if any"
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
                <div className="w-full flex flex-col justify-center items-center my-3 bg-gray-200 p-10 rounded-lg">
                  <h3 className="mb-3">The cart is empty!</h3>
                  <h3 className="mb-3">Add some products to the cart!</h3>
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
                    value="Online"
                    onChange={handleChange}
                    defaultChecked
                  />{" "}
                  Online
                </label>

                <label htmlFor="cod" className="mb-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="COD"
                    onChange={handleChange}
                  />{" "}
                  Cash on Delivery
                </label>
              </div>

              <button
                type="submit"
                onClick={emptyCartError}
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
