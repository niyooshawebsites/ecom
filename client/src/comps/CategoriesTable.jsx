import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);

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
        `http://localhost:8000/api/v1//delete-category/${cid}`
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="w-10/12 flex flex-col justify-center items-center min-h-screen">
      <div className="w-2/12">
        <h1 className="text-4xl py-3 poppins-regular">Product Categories</h1>
        <table className="w-full border border-orange-600">
          <thead className="bg-blue-500 h-10 m-10">
            <tr className="border border-red-500">
              <th>#</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr
                  key={category._id}
                  className="odd:bg-white even:bg-gray-300 h-10"
                >
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    <Link to={`/update-category?cid=${category._id}`}>
                      Update
                    </Link>{" "}
                    <button onClick={deleteCategory(category._id)}>
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
