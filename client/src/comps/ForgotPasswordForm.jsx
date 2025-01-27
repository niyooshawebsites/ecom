import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const handleSubmit = async (formData) => {
    try {
      const email = formData.get("email");

      const res = await axios.post(
        "http://localhost:8000/api/v1/forgot-password",
        { email },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular">Forgot Password</h1>
      <div className="flex flex-col w-3/12 border rounded-lg p-5">
        <form className="mb-3" action={handleSubmit}>
          <div className="flex flex-col mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Enter the registered email id"
              required
            />
            <span className="text-gray-200 mt-2">
              Reset password email will be sent
            </span>
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </form>

        <Link to="/login" className="text-red-600 hover:text-red-700 mb-2">
          Remember password?{" "}
          <span className="text-blue-600 hover:text-blue-700">Login now!</span>
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
