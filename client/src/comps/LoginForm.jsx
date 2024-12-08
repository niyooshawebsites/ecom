import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <form className="w-4/12 border">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="abc@example.com"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*********"
          />
        </div>
        <button>Login</button>
      </form>
      <Link to="/forgot-passwrod">Forgot password?</Link>
      <Link to="/register">No Account?. Register now!</Link>
    </div>
  );
};

export default LoginForm;
