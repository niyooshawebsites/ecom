import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { cartSliceActions } from "../store/slices/cartSlice";

const CartTable = () => {
  const { cartProductList, cartDiscount, cartProduct } = useSelector(
    (state) => state.cart_Slice
  );
  const dispatch = useDispatch();
  const [cartTotal, setCartTotal] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [quantityChanged, setQuantityChanged] = useState(false);

  const removeCartItem = (pid) => {
    const updatedCartProductList = cartProductList.filter(
      (product) => product.productId !== pid
    );

    dispatch(
      cartSliceActions.populateCartList({
        cartProductList: updatedCartProductList,
      })
    );

    resetDiscount();
  };

  const resetDiscount = () => {
    // resetting the discount amount
    setDiscount(0);

    // resetting the coupon
    setCoupon(null);

    // creating global cart discount state
    dispatch(
      cartSliceActions.populateCartDiscount({
        discountAmount: 0,
        couponCode: null,
        couponDesc: null,
      })
    );
  };

  const removeCoupon = () => {
    setCoupon(null);

    if (coupon !== null) {
      setDiscount(0);

      // resetting global cart discount total state
      dispatch(
        cartSliceActions.populateCartDiscount({
          couponCode: null,
        })
      );
    }

    // resetting global cart net total state
    dispatch(
      cartSliceActions.populateCartNetTotal({
        cartNetTotal: cartTotal - 0,
      })
    );
  };

  const decQuantity = (pid) => {
    const updatedCartProductList = cartProductList.map((product) => {
      if (product.productId === pid) {
        // Increment product quantity in the copy of the cart
        return {
          ...product,
          productQuantity:
            product.productQuantity - 1 <= 0 ? 0 : product.productQuantity - 1,
          productTotalAmount:
            (product.productQuantity - 1) * product.productPrice,
        };
      }
      return product;
    });

    // Dispatch the updated list to the store
    dispatch(
      cartSliceActions.populateCartList({
        cartProductList: updatedCartProductList,
      })
    );
    setQuantityChanged((prevState) => !prevState);

    resetDiscount();
  };

  const incQuantity = (pid) => {
    const updatedCartProductList = cartProductList.map((product) => {
      if (product.productId === pid) {
        // Increment product quantity in the copy of the cart
        return {
          ...product,
          productQuantity: product.productQuantity + 1,
          productTotalAmount:
            (product.productQuantity + 1) * product.productPrice,
        };
      }
      return product;
    });

    // Dispatch the updated list to the store
    dispatch(
      cartSliceActions.populateCartList({
        cartProductList: updatedCartProductList,
      })
    );
    setQuantityChanged((prevState) => !prevState);

    resetDiscount();
  };

  const calculateCartTotal = () => {
    const intialValue = 0;
    const sumOfCart = cartProductList.reduce(
      (total, item) => total + item.productTotalAmount,
      intialValue
    );

    // creating global cart net total state
    dispatch(
      cartSliceActions.populateCartNetTotal({
        cartNetTotal: sumOfCart - discount,
      })
    );

    return sumOfCart;
  };

  const applyDiscount = async (formData) => {
    try {
      const couponCode = formData?.get("couponCode");

      const { data } = await axios.post(
        `http://localhost:8000/api/v1/apply-coupon/${cartTotal}`,
        { couponCode },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setCoupon(data.data);

        // calculate discount amount
        if (data.data.discountType === "percentage") {
          setDiscount(Math.round((cartTotal * data.data.discountValue) / 100));

          // creating global cart discount state
          dispatch(
            cartSliceActions.populateCartDiscount({
              discountAmount: Math.round(
                (cartTotal * data.data.discountValue) / 100
              ),
              couponCode: data.data.couponCode,
              couponDesc: data.data.desc,
            })
          );

          // creating global cart net total state
          dispatch(
            cartSliceActions.populateCartNetTotal({
              cartNetTotal:
                cartTotal - (cartTotal * data.data.discountValue) / 100,
            })
          );
        }

        if (data.data.discountType !== "percentage") {
          setDiscount(data.data.discountValue);

          // creating global cart discount state
          dispatch(
            cartSliceActions.populateCartDiscount({
              discountAmount: data.data.discountValue,
              couponCode: data.data.couponCode,
              couponDesc: data.data.desc,
            })
          );

          // creating global cart net total state
          dispatch(
            cartSliceActions.populateCartNetTotal({
              cartNetTotal: cartTotal - data.data.discountValue,
            })
          );
          toast.success(data.msg);
        }
      }
    } catch (err) {
      toast.error(err.response?.data.msg);
      console.log(err.response?.data.msg);
    }
  };

  useEffect(() => {
    setCartTotal(calculateCartTotal());
  }, [cartProductList.length, quantityChanged]);

  useEffect(() => {
    // creating global cart gross total state
    dispatch(
      cartSliceActions.populateCartGrossTotal({
        cartGrossTotal: calculateCartTotal(),
      })
    );
  }, [
    quantityChanged,
    coupon,
    cartDiscount,
    discount,
    cartTotal,
    cartProduct.productQuantity,
  ]);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular mt-20">Cart Details</h1>
      {cartProductList.length > 0 ? (
        <div className="flex flex-col w-6/12 border rounded-lg p-5">
          <table className="w-full border">
            <thead className="bg-blue-600 text-white h-10 m-10">
              <tr>
                <th className="poppins-light border text-sm p-1">#</th>
                <th className="poppins-light border text-sm p-1">
                  Product Image
                </th>
                <th className="poppins-light border text-sm p-1">
                  Product Name
                </th>
                <th className="poppins-light border text-sm p-1">
                  Product Quantity
                </th>
                <th className="poppins-light border text-sm p-1">
                  Product Price
                </th>
                <th className="poppins-light border text-sm p-1">Total</th>
                <th className="poppins-light border text-sm p-1">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartProductList.map((cartProduct, index) => {
                return (
                  <tr
                    key={index}
                    className="odd:bg-white even:bg-gray-300 h-10 text-center border"
                  >
                    <td className="border text-sm p-1">{index + 1}</td>
                    <td className="border text-sm p-1">Product Image</td>
                    <td className="border text-sm p-1">
                      {cartProduct.productName}
                    </td>
                    <td className="border text-sm p-1">
                      <button
                        className="bg-gray-200 py-1 px-2 border rounded-md text-xl hover:bg-gray-300 mr-2"
                        onClick={() => {
                          decQuantity(cartProduct.productId);
                        }}
                      >
                        -
                      </button>
                      <span>{cartProduct.productQuantity}</span>
                      <button
                        className="bg-gray-200 py-1 px-2 border rounded-md text-xl hover:bg-gray-300 ml-2"
                        onClick={() => {
                          incQuantity(cartProduct.productId);
                        }}
                      >
                        +
                      </button>
                    </td>
                    <td className="border text-sm p-1">
                      {cartProduct.productPrice}
                    </td>
                    <td className="border text-sm p-1">
                      {cartProduct.productTotalAmount}
                    </td>
                    <td className="border text-sm p-1">
                      <button
                        className="bg-orange-600 py-1 px-1 border rounded-md  text-gray-100 hover:bg-orange-700"
                        onClick={() => removeCartItem(cartProduct.productId)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="w-full flex justify-between border p-5">
            <div>
              <form action={applyDiscount}>
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="py-1 px-1 mr-2 border rounded-md border-blue-500"
                  name="couponCode"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 py-1 px-2 border rounded-md  text-gray-100 hover:bg-green-700"
                >
                  Apply
                </button>
              </form>
              <div className="mt-3">
                {cartDiscount.couponCode !== null ? (
                  <>
                    <h3>
                      <span className="font-bold">Coupon code applied: </span>
                      <span className="text-orange-500 font-bold">
                        {cartDiscount.couponCode}
                      </span>
                    </h3>
                    <p>
                      <span className="font-bold">Coupon description:</span>{" "}
                      {cartDiscount.couponDesc}
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>

            <table className="w-4/12 table-auto">
              <tbody>
                <tr className="border-b">
                  <td className="border text-sm p-1 font-bold">Gross amount</td>
                  <td className="poppins-light border text-sm p-1 text-center">
                    {cartTotal ? cartTotal : 0}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="border text-sm p-1 font-bold">
                    Discount: {cartDiscount?.couponCode || ""}{" "}
                    {cartDiscount?.couponCode ? (
                      <button
                        className="bg-orange-600 py-1 px-1 border rounded-md  text-gray-100 hover:bg-orange-700 poppins-light"
                        onClick={removeCoupon}
                      >
                        Remove
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                  <td className="poppins-light border text-sm p-1 text-center">
                    ({cartDiscount?.discountAmount || 0})
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="border text-sm p-1 font-bold">Net amount</td>
                  <td className="poppins-light border text-sm p-1 text-center">
                    {cartTotal - discount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center mt-5">
            <Link
              className="bg-blue-600 py-1 px-2 rounded-md text-gray-100 hover:bg-blue-700"
              to="/checkout"
            >
              Proceed to checkout
            </Link>
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
    </div>
  );
};

export default CartTable;
