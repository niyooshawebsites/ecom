import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userSliceActions } from "../store/slices/userSlice";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const email = formData.get("email");
      const password = formData.get("password");

      const res = await axios.post(
        `http://localhost:8000/api/v1/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(
          userSliceActions.populateUserSlice({
            uid: res.data.data._id,
            role: res.data.data.role,
            isVerified: res.data.data.isVerified,
            isActive: res.data.data.isActive,
            username: res.data.data.username,
          })
        );
        toast.success(res.data.msg);
        navigate("/dashboard/orders");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.msg);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular">Login</h1>
      <div className="flex flex-col w-3/12 border rounded-lg p-5">
        <form className="mb-3" action={handleLogin}>
          <div className="flex flex-col mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="abc@example.com"
              required
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="*********"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <Link
          to="/forgot-password"
          className="text-red-600 hover:text-red-700 mb-2"
        >
          Forgot password?
        </Link>
        <Link to="/register">
          No Account?{" "}
          <span className="text-blue-600 hover:text-blue-700">
            Register now!
          </span>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
