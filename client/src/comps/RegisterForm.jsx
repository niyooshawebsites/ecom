import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1 className="text-4xl py-3 poppins-regular">Register</h1>
      <div className="flex flex-col w-3/12 border rounded-lg p-5">
        <form className="mb-3">
          <div className="flex flex-col mb-3">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="Unique username"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="border rounded-lg py-2 px-2 outline-none focus:border-blue-600"
              placeholder="abc@example.com"
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
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <Link to="/login">
          Already have an account?{" "}
          <span className="text-blue-600 hover:text-blue-700">Login now!</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
