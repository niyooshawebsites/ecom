import axios from "axios";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateProductForm = () => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState({});
  const [pid] = useSearchParams();

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-categories-at-once`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-product/${pid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setProduct(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateProduct = async (formData) => {
    const updatedCategory = formData.get("category");
    const updatedName = formData.get("name");
    const updatedPrice = formData.get("price");
    const updatedShortDesc = formData.get("shortDesc");
    const updatedLongDesc = formData.get("longDesc");

    const res = await axios.patch(
      `http://localhost:8000/api/v1/update-product/${pid}`,
      {
        category: updatedCategory,
        name: updatedName,
        price: updatedPrice,
        shortDesc: updatedShortDesc,
        longDesc: updatedLongDesc,
      },
      { withCredentials: true }
    );

    if (res.data.success) {
      toast.success(res.data.msg);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchProduct();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular">Update Category</h1>
      <div className="flex flex-col w-3/12 border rounded-lg p-5">
        <form className="mb-3" action={updateProduct}>
          <div className="flex flex-col mb-3">
            <label htmlFor="username">Select category</label>
            <select
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              name="category"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="username">Product name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={product.name}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Product name"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              defaultValue={product.price}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Product Price"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              name="shortDesc"
              id="shortDesc"
              defaultValue={product.shortDesc}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Product short description"
            ></textarea>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="longDesc">Long Description</label>
            <textarea
              name="longDesc"
              id="longDesc"
              defaultValue={product.longDesc}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              rows={10}
              placeholder="Product short description"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductForm;
