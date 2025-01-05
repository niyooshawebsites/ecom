import { useSelector } from "react-redux";

const CartTable = () => {
  const { cartProductList } = useSelector((state) => state.cart_Slice);

  const removeFromCart = () => {};

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular">Cart Details</h1>
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
                    <button
                      className="bg-orange-600 py-2 px-4 border rounded-md text-xl text-gray-100 hover:bg-orange-700"
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
      </div>
    </div>
  );
};

export default CartTable;
