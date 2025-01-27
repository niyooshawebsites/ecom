import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../store/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { RiLogoutCircleRLine } from "react-icons/ri";

const Header = () => {
  const { cartProductList } = useSelector((state) => state.cart_Slice);
  const { uid, username } = useSelector((state) => state.user_Slice);
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

  useEffect(() => {}, [cartProductList]);

  return (
    <header className="bg-blue-700 text-white">
      <nav className="flex justify-between items-center w-8/12 mx-auto min-h-10">
        <Link to="/">
          <h1>ECOM</h1>
        </Link>

        <ul
          className={`flex ${uid ? "justify-end" : "justify-evenly"} ${
            uid ? "w-fit" : "w-6/12"
          }`}
        >
          {uid ? (
            <>
              <li className="inline-block mr-3">Welcome, {username}</li>
              <li
                onClick={logout}
                className="cursor-pointer inline-block text-2xl align-middle"
              >
                <RiLogoutCircleRLine />
              </li>
            </>
          ) : (
            <>
              <Link to="/">
                <li>Store</li>
              </Link>
              <Link to="/register">
                <li>Register</li>
              </Link>
              <Link to="/login">
                <li>Login</li>
              </Link>
              <Link to="/cart">
                <li className="flex">
                  <CiShoppingCart className="text-2xl mr-1" />
                  <span className="bg-orange-500 px-1 rounded border">
                    {cartProductList.length > 0
                      ? `0${cartProductList.length}`
                      : 0}
                  </span>
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
