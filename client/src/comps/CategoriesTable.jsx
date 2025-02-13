import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { SlRefresh } from "react-icons/sl";
import Pagination from "./Pagination";
import NoData from "./NoData";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [categoryDeleted, setCategoryDeleted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAllCategories = async (pageNo) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-all-categories/${pageNo}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCategories(res.data.data);
        setTotalPages(res.data.totalPagesCount);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteCategory = async (cid) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/delete-category/${cid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setCategoryDeleted((prev) => !prev);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchCategory = async (formData) => {
    try {
      const cid = formData.get("cid");

      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-category/${cid}`
      );

      if (res.data.success) {
        setCategories([res.data.data]);
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  useEffect(() => {
    fetchAllCategories(currentPage);
  }, [categoryDeleted, currentPage]);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      {categories.length > 0 ? (
        <div className="w-5/12">
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
              <tr className="">
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
                      {index + 1}
                    </td>
                    <td className="text-center border text-sm p-1">
                      {category._id}
                    </td>
                    <td className="text-center border text-sm p-1">
                      {category.name}
                    </td>
                    <td className="text-center border text-sm">
                      <Link to={`/dashboard/update-category/${category._id}`}>
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
  );
};

export default CategoriesTable;
