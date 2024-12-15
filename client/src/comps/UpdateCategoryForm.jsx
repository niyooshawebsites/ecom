import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const UpdateCategoryForm = () => {
  const [cid] = useSearchParams();
  const [category, setCategory] = useState({});

  const fetchCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-category/${cid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCategory(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateCategory = async (formData) => {
    try {
      const udpateCategory = formData.get("name");
      // updating the catetory
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-category/${cid}`,
        { category: udpateCategory },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular">Update Category</h1>
      <div className="flex flex-col w-3/12 border rounded-lg p-5">
        <form className="mb-3" action={updateCategory}>
          <div className="flex flex-col mb-3">
            <label htmlFor="username">Category name</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={category.name}
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Product name"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategoryForm;
