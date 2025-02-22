import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartSliceActions } from "../store/slices/cartSlice";

const CartTable = () => {
  const { cartProductList, cartProduct } = useSelector(
    (state) => state.cart_Slice
  );
  const dispatch = useDispatch();
  const [cartTotal, setCartTotal] = useState(0);
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
  };

  const calculateCartTotal = () => {
    const intialValue = 0;
    const sumOfCart = cartProductList.reduce(
      (total, item) => total + item.productTotalAmount,
      intialValue
    );

    return sumOfCart;
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
  }, [quantityChanged, cartTotal, cartProduct.productQuantity]);

  return (
    <>
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
    </>
  );
};

export default CartTable;
