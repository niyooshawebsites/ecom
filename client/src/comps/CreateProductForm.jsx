import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateProductForm = () => {
  const [categories, setCategories] = useState([]);

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
      console.log(err.message);
    }
  };

  const handleProductCreation = async (formData) => {
    try {
      const category = formData.get("category");
      const name = formData.get("name");
      const price = formData.get("price");
      const shortDesc = formData.get("shortDesc");
      const longDesc = formData.get("longDesc");

      const res = await axios.post(
        "http://localhost:8000/api/v1/create-product",
        { category, name, price, shortDesc, longDesc },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-light my-10">Create Product</h1>
      <div className="flex flex-col w-5/12 border rounded-lg p-5">
        <form className="mb-3" action={handleProductCreation}>
          <div className="flex flex-col mb-3">
            <label htmlFor="category" className="mb-2">
              Select category
            </label>
            <select
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              name="category"
              id="category"
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="name" className="mb-2">
              Product name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Product name"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="price" className="mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Product Price"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="shortDesc" className="mb-2">
              Short Description
            </label>
            <textarea
              name="shortDesc"
              id="shortDesc"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Product short description"
            ></textarea>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="longDesc" className="mb-2">
              Long Description
            </label>
            <textarea
              name="longDesc"
              id="longDesc"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              rows={10}
              placeholder="Product short description"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductForm;
