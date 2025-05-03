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
  const [searchProductText, setSearchProductText] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
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

  const ajaxProductSearchText = async (e) => {
    try {
      setSearchProductText(e.target.value);

      const res = await axios.get(
        `http://localhost:8000/api/v1/ajax-product-search/${e.target.value}`
      );

      if (res.data.success) {
        setSearchedProducts(res.data.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {}, [cartProductList]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <header className="bg-blue-700 text-white">
          <nav className="flex justify-evenly items-center w-8/12 mx-auto min-h-20">
            <Link to="/">
              <h1 className="text-4xl">ECOM</h1>
            </Link>

            {/* search  */}
            <div className="w-9/12 mx-4 relative">
              <input
                type="text"
                name="ajaxProductSearch"
                onChange={ajaxProductSearchText}
                className="w-full text-gray-800 px-2 rounded-md"
              />

              {searchedProducts.length > 0 && searchProductText ? (
                <div className="absolute w-full mt-2 bg-yellow-500">
                  <ul>
                    {searchedProducts.map((product) => (
                      <Link to={`product?pid=${product._id}`} key={product._id}>
                        <li className="hover:bg-cyan-500">{product.name}</li>
                      </Link>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>

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
                  <Link to="/shop">
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
