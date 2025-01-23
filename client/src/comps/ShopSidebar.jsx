import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ShopSidebar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-categories-at-once`,
        { withCredentials: true }
      );

      if (data.success) {
        setCategories(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fiterProductsByName = (formData) => {
    try {
      const pName = formData.get("pName");
      navigate(`/filter-by-name/${pName}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const filterProductsByPrice = (formData) => {
    try {
      const minPrice = formData.get("minPrice") || 1;
      const maxPrice = formData.get("maxPrice");

      navigate(`/filter-by-price?minPrice=${minPrice}&maxPrice=${maxPrice}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <aside className="w-2/12 flex flex-col p-2">
      <h2 className="poppins-light my-3 uppercase text-3xl text-blue-600">
        FILTER
      </h2>
      <form action={fiterProductsByName} className="flex flex-col">
        <label htmlFor="pName" className="poppins-light my-3 uppercase text-xl">
          Search
        </label>
        <div className="flex">
          <input
            type="text"
            id="pName"
            name="pName"
            placeholder="Enter product name"
            className="border border-gray-500 focus:border-gray-600 mr-1 py-1 px-1 rounded"
            required
          />
          <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
            Search
          </button>
        </div>
      </form>

      <div className="mt-5">
        <form action={filterProductsByPrice} className="flex flex-col">
          <label
            htmlFor="searchProduct"
            className="poppins-light my-3 uppercase text-xl"
          >
            Price
          </label>
          <div className="flex flex-col">
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              placeholder="Minimum price"
              className="border border-gray-500 focus:border-gray-600 mr-1 py-1 px-1 mb-2 rounded"
            />
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              placeholder="Maximum price"
              className="border border-gray-500 focus:border-gray-600 mr-1 py-1 px-1 mb-2 rounded"
              required
            />
            <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
              Apply Filter
            </button>
          </div>
        </form>
      </div>

      <div className="mt-5">
        <h2 className="poppins-light my-3 uppercase text-xl">Categories</h2>
        <ul>
          {categories.map((category) => {
            return (
              <Link
                key={category._id}
                to={`/filter-by-category/${category._id}`}
              >
                <li className="mb-2 hover:pl-2 hover:font-semibold hover:text-blue-600">
                  {category.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default ShopSidebar;
