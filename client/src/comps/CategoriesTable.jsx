import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SlRefresh } from "react-icons/sl";
import Pagination from "./Pagination";
import NoData from "./NoData";
import Loading from "./Loading";
import { RiDeleteBin6Line } from "react-icons/ri";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [categoryDeleted, setCategoryDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [deletedCategories, setDeletedCategories] = useState([]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    try {
      if (name === "selectAll") {
        const updatedCategories = categories.map((category) => {
          return {
            ...category,
            isChecked: checked,
          };
        });
        setCategories(updatedCategories);
        setDeletedCategories(
          checked ? updatedCategories.map((c) => c._id) : []
        );
      } else {
        const updatedCategories = categories.map((category) =>
          category._id === name ? { ...category, isChecked: checked } : category
        );

        setCategories(updatedCategories);
        setDeletedCategories(
          updatedCategories.filter((c) => c.isChecked).map((c) => c._id)
        );
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const checkEveryCheckbox = () => {
    return (
      categories.length > 0 &&
      categories.every((category) => category.isChecked)
    );
  };

  const deleteMultiple = async () => {
    if (deletedCategories.length < 0) {
      toast.warn("No categories selected!");
      return;
    }

    const confirmation = window.confirm(
      "Do you really want to delete selected categories?"
    );

    if (!confirmation) return;

    try {
      const res = await axios.delete(
        "http://localhost:8000/api/v1/delete-categories",
        {
          data: { cids: deletedCategories },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        // Remove deleted products from state
        setCategories(
          categories.filter((c) => !deletedCategories.includes(c._id))
        );
        setDeletedCategories([]);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to delete categories");
    }
  };

  const fetchAllCategories = async (pageNo) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-categories/${pageNo}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCategories(res.data.data);
        setTotalPages(res.data.totalPagesCount);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const deleteCategory = async (cid) => {
    const confimation = confirm("Do you really want to delete?");

    if (!confimation) return;

    setLoading(true);

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-category/${cid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setCategoryDeleted((prev) => !prev);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const fetchCategory = async (formData) => {
    setLoading(true);
    try {
      const cid = formData.get("cid");

      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-category/${cid}`
      );

      if (res.data.success) {
        setCategories([res.data.data]);
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCategories(currentPage);
  }, [categoryDeleted, currentPage]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          {categories.length > 0 ? (
            <div className="w-6/12">
              <div className="flex justify-center items-center mt-10">
                <h1 className="text-4xl text-center py-3 poppins-light bg-gray-200 rounded-md p-3 mb-2">
                  Categories (
                  {categories.length < 10
                    ? `0${categories.length}`
                    : categories.length}
                  )
                </h1>
                <button onClick={fetchAllCategories} className="ml-5">
                  <SlRefresh className="text-4xl text-blue-600 hover:text-orange-600" />
                </button>
              </div>
              <div className="flex my-3">
                <form action={fetchCategory} className="flex w-full">
                  <input
                    type="text"
                    name="cid"
                    id="cid"
                    placeholder="Category ID"
                    className="border border-gray-300 rounded p-1 mr-2 w-full"
                    required
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 py-1 px-2 rounded text-white">
                    Search
                  </button>
                </form>
              </div>
              <table className="w-full border">
                <thead className="bg-blue-600 h-10 m-10">
                  <tr className="border">
                    <th className="h-10 flex justify-evenly items-center">
                      <input
                        type="checkbox"
                        name="selectAll"
                        onChange={handleCheckboxChange}
                        checked={checkEveryCheckbox()}
                      />
                      <RiDeleteBin6Line
                        style={{
                          fontSize: "25px",
                          color: "gold",
                          cursor: "pointer",
                        }}
                        onClick={deleteMultiple}
                      />
                    </th>
                    <th className="poppins-light text-white border text-sm p-1">
                      #
                    </th>
                    <th className="poppins-light text-white border text-sm p-1">
                      Category ID
                    </th>
                    <th className="poppins-light text-white border text-sm p-1">
                      Category name
                    </th>
                    <th className="poppins-light text-white border text-sm p-1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => {
                    return (
                      <tr
                        key={category._id}
                        className="odd:bg-white even:bg-gray-300 h-10"
                      >
                        <td className="text-center border text-sm p-1">
                          <input
                            type="checkbox"
                            name={category._id}
                            value={category._id}
                            onChange={handleCheckboxChange}
                            checked={category.isChecked}
                          />
                        </td>
                        <td className="text-center border text-sm p-1">
                          {index + 1}
                        </td>
                        <td className="text-center border text-sm p-1">
                          {category._id}
                        </td>
                        <td className="text-center border text-sm p-1">
                          {category.name}
                        </td>
                        <td className="text-center border text-sm">
                          <Link
                            to={`/dashboard/update-category/${category._id}`}
                          >
                            <span className="bg-green-600 px-1 rounded-md text-white hover:bg-green-700 mr-2">
                              Edit
                            </span>
                          </Link>{" "}
                          <button
                            onClick={() => {
                              deleteCategory(category._id);
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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            <NoData data={"Categories"} />
          )}
        </div>
      )}
    </>
  );
};

export default CategoriesTable;
