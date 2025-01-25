import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { filterSliceActions } from "../store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineClear } from "react-icons/md";

const ShopSidebar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeFilterId } = useSelector((state) => state.filter_Slice);

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
      const pSlug = formData.get("pSlug");
      const modifiedSlug = pSlug.toLowerCase().split(" ").join("-");

      dispatch(
        filterSliceActions.populateFilteredProductSlug({
          filteredProductSlug: modifiedSlug,
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const filterProductsByPrice = (formData) => {
    try {
      const minPrice = formData.get("minPrice") || 1;
      const maxPrice = formData.get("maxPrice");

      dispatch(
        filterSliceActions.populateFilteredPriceRangeMinimum({
          filteredPriceRangeMinimum: minPrice,
        })
      );

      dispatch(
        filterSliceActions.populateFilteredPriceRangeMaximum({
          filteredPriceRangeMaximum: maxPrice,
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const fiterByCategory = (cid, cName) => {
    try {
      dispatch(
        filterSliceActions.populateActiveFilterId({
          activeFilterId: cid,
        })
      );

      dispatch(
        filterSliceActions.populateFilteredCategory({
          filteredCategory: cName,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeCategoryFilter = () => {
    try {
      dispatch(
        filterSliceActions.populateActiveFilterId({
          activeFilterId: null,
        })
      );
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <aside className="w-2/12 flex flex-col p-2">
      <div className="flex justify-between items-center">
        <h2 className="poppins-light my-3 uppercase text-3xl text-blue-600">
          FILTERS
        </h2>

        <MdOutlineClear className="cursor-pointer text-2xl" />
      </div>
      <form action={fiterProductsByName} className="flex flex-col">
        <div className="flex justify-between items-center">
          <label
            htmlFor="pSlug"
            className="poppins-light my-3 uppercase text-xl"
          >
            Search
          </label>
          <MdOutlineClear className="cursor-pointer text-xl" />
        </div>
        <div className="flex">
          <input
            type="text"
            id="pSlug"
            name="pSlug"
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
          <div className="flex justify-between items-center">
            <label
              htmlFor="minPrice"
              className="poppins-light my-3 uppercase text-xl"
            >
              Price
            </label>
            <MdOutlineClear className="cursor-pointer text-xl" />
          </div>
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
        <div className="flex justify-between items-center">
          <h2 className="poppins-light my-3 uppercase text-xl">Categories</h2>
          {activeFilterId ? (
            <MdOutlineClear
              className="cursor-pointer text-xl"
              onClick={removeCategoryFilter}
            />
          ) : null}
        </div>
        <ul>
          {categories.map((category) => {
            return (
              <li
                key={category._id}
                className={
                  category._id === activeFilterId
                    ? `font-semibold text-orange-600 hover:cursor-pointer`
                    : "hover:cursor-pointer"
                }
                onClick={() => fiterByCategory(category._id, category.name)}
              >
                {category.name}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default ShopSidebar;
