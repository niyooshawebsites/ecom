import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SlRefresh } from "react-icons/sl";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-products/1`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (pid) => {
    try {
      const res = await axios.delete(
        `http"//localhost:8000/api/v1/delete-product/${pid}`
      );

      if (res.data.success) {
        toast(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-products/1`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
      <div className="flex">
        <h1 className="text-4xl py-3 poppins-light my-10">All Products</h1>
        <button onClick={fetchAllProducts} className="ml-5">
          <SlRefresh className="text-4xl text-blue-600 hover:text-blue-700" />
        </button>
      </div>

      <table className="w-full border">
        <thead className="bg-blue-500 h-10 m-10 text-white">
          <tr className="border">
            <th className="poppins-light">#</th>
            <th className="poppins-light">Product Name</th>
            <th className="poppins-light">Product Img</th>
            <th className="poppins-light">Product Price</th>
            <th className="poppins-light">Product Category</th>
            <th className="poppins-light">Time</th>
            <th className="poppins-light">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr
                key={product._id}
                className="odd:bg-white even:bg-gray-300 h-10 text-center"
              >
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td className="flex justify-center p-1">
                  <img src={product.img} alt={product.name} width={40} />
                </td>
                <td>{product.price}</td>
                <td>{product.category?.name}</td>
                <td>{product.createdAt}</td>
                <td>
                  <Link
                    to={`/dashboard/update-product/${product._id}`}
                    className="bg-orange-600 px-1 rounded-md text-white hover:bg-orange-700"
                  >
                    Update
                  </Link>{" "}
                  <button
                    onClick={() => {
                      deleteProduct(product._id);
                    }}
                    className="bg-red-600 px-1 rounded-md text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
