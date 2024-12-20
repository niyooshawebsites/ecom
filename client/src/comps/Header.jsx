import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../store/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Header = () => {
  const { cartProductList } = useSelector((state) => state.cart_Slice);
  const { uid } = useSelector((state) => state.user_Slice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/auth/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.msg);
        dispatch(userSliceActions.populateUserSlice({ uid: null }));
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-blue-700 text-white">
      <nav className="flex justify-between items-center w-8/12 mx-auto min-h-10">
        <h1>ECOM</h1>
        <ul className={`flex ${uid ? "justify-end" : "justify-evenly"} w-6/12`}>
          {uid ? (
            <button onClick={logout}>logout</button>
          ) : (
            <>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/contact">
                <li>Contact</li>
              </Link>
              <Link to="/register">
                <li>Register</li>
              </Link>
              <Link to="/login">
                <li>Login</li>
              </Link>
              <Link to="/cart">
                <li>
                  Cart (
                  {cartProductList.length != "" ? cartProductList.length : 0})
                </li>
              </Link>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
