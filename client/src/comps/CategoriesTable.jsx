import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [categoryDeleted, setCategoryDeleted] = useState(false);

  const fetchAllCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/v1/fetch-all-categories/1",
        { withCredentials: true }
      );

      if (res.data.success) {
        setCategories(res.data.data);
      }
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, [categoryDeleted]);

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <div className="w-5/12">
        <h1 className="text-4xl text-center py-3 poppins-light mt-10 mb-2">
          Product Categories
        </h1>
        <table className="w-full border">
          <thead className="bg-blue-500 h-10 m-10">
            <tr className="">
              <th className="poppins-light text-white border text-sm p-1">#</th>
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
      </div>
    </div>
  );
};

export default CategoriesTable;
