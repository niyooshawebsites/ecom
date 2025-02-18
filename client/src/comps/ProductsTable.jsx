import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SlRefresh } from "react-icons/sl";
import Loading from "./Loading";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchAllCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-categories-at-once`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setCategories(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-products/1`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProducts(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const deleteProduct = async (pid) => {
    const confimation = confirm("Do you really want to delete?");

    if (!confimation) return;

    setLoading(true);

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-product/${pid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProductDeleted((prev) => !prev);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchProduct = async (formData) => {
    setLoading(true);

    try {
      const pid = formData.get("pid");
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-product/${pid}`
      );

      if (res.data.success) {
        setProducts([res.data.data]);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  const fetchAllProductsByCategory = async (formData) => {
    setLoading(true);

    const cid = formData.get("cid");
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-products-by-category/${cid}`
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setProducts(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchProducts();
  }, [productDeleted]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen p-5">
          {products.length > 0 ? (
            <>
              <div className="flex flex-col justify-between items-center my-5 w-full">
                <div className="flex justify-center items-center my-5">
                  <h1 className="text-4xl py-3 poppins-light bg-gray-200 rounded-md p-3 mb-2">
                    All Products (
                    {products.length < 10
                      ? `0${products.length}`
                      : products.length}
                    )
                  </h1>
                  <button onClick={fetchProducts} className="ml-5">
                    <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
                  </button>
                </div>

                <div className="flex items-center">
                  <form action={fetchAllProductsByCategory} className="mr-3">
                    <label htmlFor="cid" className="font-semibold">
                      Category:{" "}
                    </label>
                    <select
                      className="border rounded-lg py-1 px-1 outline-none focus:border-blue-600 mr-3"
                      name="cid"
                      id="cid"
                    >
                      <option value="">Select</option>
                      {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                      Search
                    </button>
                  </form>

                  <form action={fetchProduct}>
                    <input
                      type="text"
                      name="pid"
                      id="pid"
                      placeholder="Product ID"
                      className="border border-gray-300 rounded p-1 mr-2"
                      required
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                      Search
                    </button>
                  </form>
                </div>
              </div>

              <table className="w-full border">
                <thead className="bg-blue-600 h-10 m-10 text-white">
                  <tr className="border">
                    <th className="poppins-light border text-sm">#</th>
                    <th className="poppins-light border text-sm">Product ID</th>
                    <th className="poppins-light border text-sm">
                      Product Name
                    </th>
                    <th className="poppins-light border text-sm">
                      Product Img
                    </th>
                    <th className="poppins-light border text-sm">
                      Product Price
                    </th>
                    <th className="poppins-light border text-sm">
                      Product Category
                    </th>
                    <th className="poppins-light border text-sm">
                      Published on
                    </th>
                    <th className="poppins-light border text-sm">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => {
                    return (
                      <tr
                        key={product._id}
                        className="odd:bg-white even:bg-gray-300 h-10 text-center"
                      >
                        <td className="border text-sm p-1">{index + 1}</td>
                        <td className="border text-sm p-1">{product._id}</td>
                        <td className="border text-sm p-1">{product.name}</td>
                        <td className="flex justify-center p-1 border text-sm">
                          <img
                            src={product.img}
                            alt={product.name}
                            width={40}
                          />
                        </td>
                        <td className="border text-sm p-1">{product.price}</td>
                        <td className="border text-sm p-1">
                          {product.category?.name}
                        </td>
                        <td className="border text-sm p-1">
                          {product.createdAt
                            .split("T")[0]
                            .split("-")
                            .reverse()
                            .join("-")}
                        </td>
                        <td className="p-1">
                          <Link
                            to={`/dashboard/update-product/${product._id}`}
                            className="bg-green-600 px-1 rounded-md text-white hover:bg-green-700 text-sm"
                          >
                            Edit
                          </Link>{" "}
                          <button
                            onClick={() => {
                              deleteProduct(product._id);
                            }}
                            className="bg-red-600 px-1 rounded-md text-white hover:bg-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          ) : (
            <h1 className="text-4xl py-3 poppins-light mt-10 mb-2">
              No Products
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default ProductsTable;
