import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import BackBtn from "./BackBtn";
import Loading from "./Loading";
import categorySchema from "../utils/validation/categoryScehma";

const UpdateCategoryForm = () => {
  const { cid } = useParams();
  const [category, setCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fetchCategory = async () => {
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/fetch-category/${cid}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCategory(res.data.data);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  const updateCategory = async (formData) => {
    setLoading(true);

    try {
      const udpatedCategoryName = formData.get("name");

      const result = categorySchema.safeParse({ name: udpatedCategoryName });

      if (!result.success) {
        const formattedErrors = result.error.format();
        setErrors(formattedErrors);
        setLoading(false);
        return;
      }

      // updating the catetory
      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-category/${cid}`,
        { name: udpatedCategoryName },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <BackBtn link={"/dashboard/categories"} />
          <h1 className="text-4xl py-3 poppins-light mb-5">Update Category</h1>
          <div className="flex flex-col w-6/12 border rounded-lg p-5">
            <form className="mb-3" action={updateCategory}>
              <div className="flex flex-col mb-3">
                <label htmlFor="username" className="mb-2">
                  Category name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={category.name}
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Product name"
                  required
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name._errors[0]}</p>
                )}
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
      )}
    </>
  );
};

export default UpdateCategoryForm;
