import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileForm = () => {
  const { uid } = useSelector((state) => state.user_Slice);

  const updateProfile = async (formData) => {
    try {
      const newPassword = formData.get("newPassword");
      const confirmNewPassword = formData.get("confirmNewPassword");

      if (newPassword !== confirmNewPassword) {
        return toast.error("Password mismatch");
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
            <input
              type="text"
              name="newPassword"
              id="newPassword"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="New Password"
            />
          </div>

          <div className="flex flex-col mb-3">
            <label htmlFor="confirmNewPassword" className="mb-3">
              Confirm password
            </label>
            <input
              type="text"
              name="confirmNewPassword"
              id="confirmNewPassword"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Confirm new password"
            />
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
