import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

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

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-center items-center min-h-screen">
      <div className="w-2/12">
        <h1 className="text-4xl py-3 poppins-regular">Product Categories</h1>
        <table className="w-full border border-orange-600">
          <thead className="bg-blue-500 h-10 m-10">
            <tr className="border border-red-500">
              <th>#</th>
              <th>Product Name</th>
              <th>Product Img</th>
              <th>Product Price</th>
              <th>Product Category</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr
                  key={product._id}
                  className="odd:bg-white even:bg-gray-300 h-10"
                >
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>
                    <img src={product.img} alt={product.name} />
                  </td>
                  <td>{product.price}</td>
                  <td>{product.category?.name}</td>
                  <td>{product.createdAt}</td>
                  <td>
                    <Link to={`/update-product?pid=${product._id}`}>
                      Update
                    </Link>{" "}
                    <button onClick={deleteProduct(product._id)}>Delete</button>
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

export default ProductsTable;
