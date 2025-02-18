import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import Loading from "./Loading";
import resetPasswordSchema from "../utils/validation/resetPasswordSchema";

const ResetPasswordForm = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewConfirmPassword, setShowNewConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const location = useLocation();
  const queryString = new URLSearchParams(location.search);

  const authToken = queryString.get("authToken");

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleNewConfirmPasswordVisibility = () => {
    setShowNewConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      const newPassword = formData.get("newPassword");
      const newConfirmPassword = formData.get("newConfirmPassword");

      const result = resetPasswordSchema.safeParse({
        newPassword,
        newConfirmPassword,
      });

      if (!result.success) {
        const formattedErrors = result.error.format();
        setErrors(formattedErrors);
      }

      if (newPassword !== newConfirmPassword) {
        toast.error("Reset password mismatch!");
        setLoading(false);
        return;
      }

      const res = await axios.patch(
        `http://localhost:8000/api/v1/reset-password/${authToken}`,
        { newPassword },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-center items-center min-h-screen">
          <h1 className="text-4xl py-3 poppins-regular">Reset Password</h1>
          <div className="flex flex-col w-3/12 border rounded-lg p-5">
            <form className="mb-3" action={handleSubmit}>
              <div className="flex flex-col mb-3">
                <label htmlFor="newPassword">New password</label>

                <div className="flex items-center">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600 w-full mr-2"
                    placeholder="Enter the registered email id"
                    required
                  />

                  <span
                    className="border p-2 rounded-lg cursor-pointer"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? "Hide" : "Show"}
                  </span>
                </div>
                {errors.newPassword && (
                  <p className="text-red-500">
                    {errors.newPassword._errors[0]}
                  </p>
                )}
              </div>

              <div className="flex flex-col mb-3">
                <label htmlFor="newConfirmPassword">Confirm new password</label>

                <div className="flex items-center">
                  <input
                    type={showNewConfirmPassword ? "text" : "password"}
                    name="newConfirmPassword"
                    id="newConfirmPassword"
                    className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600 w-full mr-2"
                    placeholder="Enter the registered email id"
                    required
                  />

                  <span
                    className="border p-2 rounded-lg cursor-pointer"
                    onClick={toggleNewConfirmPasswordVisibility}
                  >
                    {showNewConfirmPassword ? "Hide" : "Show"}
                  </span>
                </div>
                {errors.newConfirmPassword && (
                  <p className="text-red-500">
                    {errors.newConfirmPassword._errors[0]}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
              >
                Reset password
              </button>
            </form>

            <Link to="/login" className="text-red-600 hover:text-red-700 mb-2">
              Password reset done?{" "}
              <span className="text-blue-600 hover:text-blue-700">
                Login now!
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPasswordForm;
