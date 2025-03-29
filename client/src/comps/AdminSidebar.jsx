import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";

const AdminSidebar = () => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [showCouponMenu, setShowCouponMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showHomepageMenu, setShowHomepageMenu] = useState(false);

  const { role } = useSelector((state) => state.user_Slice);

  const toggleShowCategoryMenu = () => {
    setShowCategoryMenu((prevState) => !prevState);
  };

  const toggleShowProductMenu = () => {
    setShowProductMenu((prevState) => !prevState);
  };

  const toggleShowCouponMenu = () => {
    setShowCouponMenu((prevState) => !prevState);
  };

  const toggleShowSettingsMenu = () => {
    setShowSettingsMenu((prevState) => !prevState);
  };

  const toggleShowHomepageMenu = () => {
    setShowHomepageMenu((prevState) => !prevState);
  };

  return (
    <aside className="w-2/12 bg-orange-500 my-2">
      {role === "admin" ? (
        <ul>
          <Link to="/dashboard/orders">
            <li className="px-2 py-2 text-white hover:bg-blue-600 my-2">
              Orders
            </li>
          </Link>
          <Link to="/dashboard/gallery">
            <li className="cursor-pointer flex items-center px-2 my-2">
              Gallery
            </li>
          </Link>
          <li
            onClick={toggleShowCategoryMenu}
            className="cursor-pointer flex items-center px-2 my-2"
          >
            Categories <IoIosArrowDown />
          </li>
          {showCategoryMenu ? (
            <ul>
              <Link to="/dashboard/create-category">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">
                  Create Category
                </li>
              </Link>
              <Link to="/dashboard/categories">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">
                  All categories
                </li>
              </Link>
            </ul>
          ) : null}
          <li
            onClick={toggleShowProductMenu}
            className="cursor-pointer flex items-center px-2 my-2"
          >
            Products <IoIosArrowDown />
          </li>
          {showProductMenu ? (
            <ul>
              <Link to="/dashboard/create-product">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">
                  Create Product
                </li>
              </Link>
              <Link to="/dashboard/products">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">
                  All Products
                </li>
              </Link>
            </ul>
          ) : null}
          <li
            onClick={toggleShowCouponMenu}
            className="cursor-pointer flex items-center px-2"
          >
            Coupons <IoIosArrowDown />
          </li>
          {showCouponMenu ? (
            <ul>
              <Link to="/dashboard/create-coupon">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">
                  Create Coupon
                </li>
              </Link>
              <Link to="/dashboard/coupons">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">
                  All Counpons
                </li>
              </Link>
            </ul>
          ) : null}
          <Link to="/dashboard/reviews">
            <li className="px-2 py-2 hover:bg-blue-600">Reviews</li>
          </Link>
          <Link to="/dashboard/users">
            <li className="px-2 py-2 hover:bg-blue-600 ">Users</li>
          </Link>
          <li
            onClick={toggleShowSettingsMenu}
            className="cursor-pointer flex items-center px-2 my-2"
          >
            Settings <IoIosArrowDown />
          </li>
          {showSettingsMenu ? (
            <ul>
              <Link to="/dashboard/profile">
                <Link to="/dashboard/homepage">
                  <li className="px-2 py-2 text-white hover:bg-blue-600 my-2">
                    Homepage
                  </li>
                </Link>
                <li className="px-3 py-2 text-white hover:bg-blue-600">
                  Profile
                </li>
              </Link>
              <Link to="/dashboard/tax">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">Tax</li>
              </Link>
              <Link to="/dashboard/shipping">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">
                  Shipping
                </li>
              </Link>
              <Link to="/dashboard/logo">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">Logo</li>
              </Link>
              <Link to="/dashboard/contact-info">
                <li className="px-3 py-2 hover:bg-blue-600 text-white">
                  Contact Details
                </li>
              </Link>
            </ul>
          ) : null}
        </ul>
      ) : (
        <ul>
          <Link to="/dashboard/orders">
            <li className="px-2 py-2 text-white hover:bg-blue-600 my-2">
              Orders
            </li>
          </Link>
          <Link to="/dashboard/contact-info">
            <li className="px-2 py-2 text-white hover:bg-blue-600 my-2">
              Contact details
            </li>
          </Link>
          <Link to="/dashboard/profile">
            <li className="px-2 py-2 text-white hover:bg-blue-600 my-2">
              Profile
            </li>
          </Link>
        </ul>
      )}
    </aside>
  );
};

export default AdminSidebar;
