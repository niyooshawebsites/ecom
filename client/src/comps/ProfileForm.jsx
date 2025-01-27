import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const { uid } = useSelector((state) => state.user_Slice);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const updateProfile = async (formData) => {
    try {
      const newPassword = formData.get("newPassword");
      const confirmNewPassword = formData.get("confirmNewPassword");

      if (newPassword !== confirmNewPassword) {
        toast.error("Password mismatch");
        return;
      }

      const res = await axios.patch(
        `http://localhost:8000/api/v1/update-user-password/${uid}`,
        { password: newPassword },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="w-10/12 flex flex-col justify-start items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-light my-10">Profile</h1>
      <div className="flex flex-col w-4/12 border rounded-lg p-5">
        <form className="mb-3" action={updateProfile}>
          <div className="flex flex-col mb-3">
            <label htmlFor="newPassword" className="mb-3">
              Update password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                id="newPassword"
                className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600 w-full mr-2"
                placeholder="New Password"
              />
              <span
                className="border p-2 rounded-lg cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="confirmNewPassword" className="mb-3">
              Confirm password
            </label>
            <div className="flex items-center">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmNewPassword"
                id="confirmNewPassword"
                className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600 w-full mr-2"
                placeholder="Confirm new password"
              />
              <span
                className="border p-2 rounded-lg cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
