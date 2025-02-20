import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { useState } from "react";
import categorySchema from "../utils/validation/categoryScehma";

const CreateCategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCategoryCreation = async (formData) => {
    try {
      const name = formData.get("name");

      // sanitize and validate form data before sending to backend
      const result = categorySchema.safeParse({ name });

      if (result.success) {
        setLoading(true);
      }

      // if validation fails
      if (!result.success) {
        // Extract the errors
        const formattedErrors = result.error.format();
        console.log(formattedErrors);
        setErrors(formattedErrors);
        setLoading(false);
        return;
      }

      const res = await axios.post(
        "http://localhost:8000/api/v1/create-category",
        { name },
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
          <h1 className="text-4xl py-3 poppins-light my-10">Create category</h1>
          <div className="flex flex-col w-5/12 border rounded-lg p-5">
            <form className="mb-3" action={handleCategoryCreation}>
              <div className="flex flex-col mb-3">
                <label htmlFor="name" className="mb-3">
                  Category name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
                  placeholder="Enter category name"
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
                Create category
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCategoryForm;
