const placeOrder = async (formData) => {
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");

  const fName = formData.get("fName");
  const lName = formData.get("lName");
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
  const paymentMethod = formData.get("paymentMethod");

  try {
    // if not logged in
    if (!uid) {
      // check for exisitng user before placing the order
      const fetchUserAtOrderCreationRes = await axios.get(
        `http://localhost:8000/api/v1/fetch-user-at-order-creation/${username}/${email}`
      );

      // if user already exists
      if (fetchUserAtOrderCreationRes.data.success) {
        toast.error(fetchUserAtOrderCreationRes.data.msg);
      }
    }

    // update user contact information
    const userContactInfoRes = await axios.patch(
      `http://localhost:8000/api/v1/update-contact-details-while-placing-order/${uid}`,
      {
        fName,
        lName,
        contactNo,
        buildingNo,
        streetNo,
        locality,
        district,
        landmark,
        city,
        state,
        pincode,
      }
    );

    // if user contact information updation is successfull
    if (userContactInfoRes.data.success) {
      cartProductList.forEach(async (product) => {
        try {
          // ONLINE PAYMENT
          if (paymentMethod === "Online") {
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

            // if order is successfull
            if (razorpayOrderRes.data.success) {
              try {
                const {
                  id: order_id,
                  amount,
                  currency,
                } = razorpayOrderRes.data.data;

                // Step 2: Load Razorpay Checkout
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

                    if (verifyResponse.data.success) {
                      // if payment is successfull - create new order
                      const orderRes = await axios.post(
                        `http://localhost:8000/api/v1/create-order/${product.productId}`,
                        {
                          uid: product.productId,
                          quantity: product.productQuantity,
                          orderNote,
                          paymentMethod,
                          paymentStatus: "Paid",
                        },
                        { withCredentials: true }
                      );

                      // if order is successfull
                      if (orderRes.data.success) {
                        dispatch(
                          paymentMethodSliceActions.populatePaymentStatus({
                            online: true,
                            offline: false,
                          })
                        );
                        navigate("/payment-success");
                      }
                    } else {
                      alert("Payment verification failed!");
                    }
                  },
                  prefill: {
                    name: fName,
                    email: email,
                    contact: contactNo,
                  },
                  theme: {
                    color: "#3399cc",
                  },
                };

                const razor = new window.Razorpay(options);
                razor.open();
              } catch (err) {
                console.log(err.message);
                toast.error(err.response.data.msg);
              }
            }
          }

          // OFFLINE PAYMENT
          if (paymentMethod === "COD") {
            navigate("/order-confirmation");
          }
        } catch (err) {
          console.log(err.message);
        }
      });
    }
  } catch (err) {
    console.log(err.message);

    // if no exising user found
    // account creation
    const accountRes = await axios.post(
      `http://localhost:8000/api/v1/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true }
    );

    // if account creation is successful
    if (accountRes.data.success) {
      toast.success(accountRes.data.msg);

      // update user contact information
      const userContactInfoRes = await axios.patch(
        `http://localhost:8000/api/v1/update-contact-details-while-placing-order/${accountRes.data.data._id}`,
        {
          fName,
          lName,
          contactNo,
          buildingNo,
          streetNo,
          locality,
          district,
          landmark,
          city,
          state,
          pincode,
        }
      );

      // if user contact information updation is successfull
      if (userContactInfoRes.data.success) {
        cartProductList.forEach(async (product) => {
          try {
            // ONLINE PAYMENT
            if (paymentMethod == "Online") {
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

              // if order is successfull
              if (razorpayOrderRes.data.success) {
                try {
                  const {
                    id: order_id,
                    amount,
                    currency,
                  } = razorpayOrderRes.data.data;

                  // Step 2: Load Razorpay Checkout
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

                      if (verifyResponse.data.success) {
                        // if payment is successfull - create new order
                        const orderRes = await axios.post(
                          `http://localhost:8000/api/v1/create-order/${product.productId}`,
                          {
                            uid: product.productId,
                            quantity: product.productQuantity,
                            orderNote,
                            paymentMethod,
                            paymentStatus: "Paid",
                          },
                          { withCredentials: true }
                        );

                        // if order is successfull
                        if (orderRes.data.success) {
                          dispatch(
                            paymentMethodSliceActions.populatePaymentStatus({
                              online: true,
                              offline: false,
                            })
                          );
                          navigate("/payment-success");
                        }
                      } else {
                        alert("Payment verification failed!");
                      }
                    },
                    prefill: {
                      name: fName,
                      email: email,
                      contact: contactNo,
                    },
                    theme: {
                      color: "#3399cc",
                    },
                  };

                  const razor = new window.Razorpay(options);
                  razor.open();
                } catch (err) {
                  console.log(err.message);
                  toast.error(err.response.data.msg);
                }
              }
            }

            // OFFLINE PAYMENT
            if (paymentMethod === "COD") {
              navigate("/order-confirmation");
            }
          } catch (err) {
            console.log(err.message);
          }
        });
      }
    }
  }
};
