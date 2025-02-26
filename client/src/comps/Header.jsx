import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userSliceActions } from "../store/slices/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { CiShoppingCart } from "react-icons/ci";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Loading from "./Loading";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const { cartProductList } = useSelector((state) => state.cart_Slice);
  const { uid, isActive, isVerified, username } = useSelector(
    (state) => state.user_Slice
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const logout = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:8000/api/v1/auth/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.msg);
        dispatch(userSliceActions.populateUserSlice({ uid: null }));
        setLoading(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {}, [cartProductList]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <header className="bg-blue-700 text-white">
          <nav className="flex justify-between items-center w-8/12 mx-auto min-h-10">
            <Link to="/">
              <h1>ECOM</h1>
            </Link>
            <input
              type="text"
              name=""
              id=""
              className="w-5/12 text-gray-800 px-2 rounded-md"
            />
            <ul
              className={`flex ${uid ? "justify-end" : "justify-evenly"} ${
                uid ? "w-fit" : "w-6/12"
              }`}
            >
              {uid && isActive && isVerified ? (
                <>
                  <li className="inline-block mr-5">Welcome, {username}</li>
                  {location.pathname.split("/")[1] === "dashboard" ? (
                    <Link
                      to="/"
                      className="mr-5 font-bold bg-orange-600 rounded px-2"
                    >
                      <li>SHOP</li>
                    </Link>
                  ) : (
                    <>
                      <Link
                        to="/dashboard/orders"
                        className="mr-5 font-bold bg-orange-600 rounded px-2"
                      >
                        <li>DASHBOARD</li>
                      </Link>
                      <Link
                        to="/"
                        className="mr-5 font-bold bg-orange-600 rounded px-2"
                      >
                        <li>SHOP</li>
                      </Link>
                      <Link to="/cart">
                        <li className="flex">
                          <CiShoppingCart className="text-2xl mr-1" />
                          <span className="bg-orange-500 px-1 rounded border mr-5">
                            {cartProductList.length > 0
                              ? `0${cartProductList.length}`
                              : 0}
                          </span>
                        </li>
                      </Link>
                    </>
                  )}

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
      )}
    </>
  );
};

export default Header;
