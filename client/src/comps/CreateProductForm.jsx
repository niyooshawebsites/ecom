import { useState, useEffect } from "react";
import axios from "axios";

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
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular">Create Category</h1>
      <div className="flex flex-col w-3/12 border rounded-lg p-5">
        <form className="mb-3">
          <div className="flex flex-col mb-3">
            <label htmlFor="username">Select category</label>
            <select className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600">
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
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Product Price"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="shortDesc">Short Description</label>
            <textarea
              name="shortDesc"
              id="shortDesc"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Product short description"
            ></textarea>
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="longDesc">Long Description</label>
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
