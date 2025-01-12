import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const CartTable = () => {
  const { cartProductList } = useSelector((state) => state.cart_Slice);
  const [cartTotal, setCartTotal] = useState(0);
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  const removeFromCart = () => {};

  const calculateCartTotal = () => {
    const intialValue = 0;
    const sumOfCart = cartProductList.reduce(
      (total, item) => total + item.productTotalAmount,
      intialValue
    );
    return sumOfCart;
  };

  const fetchCoupon = async (formData) => {
    try {
      const couponCode = formData.get("couponCode");
      const result = await axios.get(
        `http://localhost:8000/api/v1/apply-coupon`,
        { couponCode },
        {
          withCredentials: true,
        }
      );

      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setCartTotal(calculateCartTotal());
    fetchCoupon();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular mt-20">Cart Details</h1>
      <div className="flex flex-col w-6/12 border rounded-lg p-5">
        <table className="w-full border">
          <thead className="bg-blue-600 text-white h-10 m-10">
            <tr>
              <th className="poppins-light border text-sm p-1">#</th>
              <th className="poppins-light border text-sm p-1">
                Product Image
              </th>
              <th className="poppins-light border text-sm p-1">Product Name</th>
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
                    {cartProduct.productQuantity}
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
                      onClick={removeFromCart}
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
            <form action={fetchCoupon}>
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
                <td className="border text-sm p-1 font-bold">Discount</td>
                <td className="poppins-light border text-sm p-1 text-center">
                  -{discount ? discount : 0}
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
          <button className="bg-blue-600 py-1 px-2 border rounded-md  text-gray-100 hover:bg-blue-700">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
