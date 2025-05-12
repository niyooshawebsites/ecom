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
  const [showCustomizeMenu, setShowCustomizeMenu] = useState(false);

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

  const toggleShowCustomizeMenu = () => {
    setShowCustomizeMenu((prevState) => !prevState);
  };

  return (
    <aside className="w-2/12 px-2 bg-gray-600 m-2 rounded-md">
      {role === "admin" ? (
        <ul>
          <Link to="/dashboard/orders">
            <li className="px-2 py-2 text-white hover:bg-blue-600 my-1 hover:rounded-md">
              Orders
            </li>
          </Link>
          <Link to="/dashboard/gallery">
            <li className="cursor-pointer flex items-center px-2 py-2 hover:bg-blue-600 my-1 hover:rounded-md">
              Gallery
            </li>
          </Link>
          <li
            onClick={toggleShowCategoryMenu}
            className="cursor-pointer flex items-center px-2 py-2 hover:bg-blue-600 my-1 hover:rounded-md"
          >
            Categories <IoIosArrowDown />
          </li>
          {showCategoryMenu ? (
            <ul className="border rounded-md">
              <Link to="/dashboard/create-category">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  Create Category
                </li>
              </Link>
              <Link to="/dashboard/categories">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  All categories
                </li>
              </Link>
            </ul>
          ) : null}
          <li
            onClick={toggleShowProductMenu}
            className="cursor-pointer flex items-center px-2 py-2 hover:bg-blue-600 my-1 hover:rounded-md"
          >
            Products <IoIosArrowDown />
          </li>
          {showProductMenu ? (
            <ul className="border rounded-md">
              <Link to="/dashboard/create-product">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  Create Product
                </li>
              </Link>
              <Link to="/dashboard/products">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  All Products
                </li>
              </Link>
            </ul>
          ) : null}
          <li
            onClick={toggleShowCouponMenu}
            className="cursor-pointer flex items-center px-2 py-2 hover:bg-blue-600 my-1 hover:rounded-md"
          >
            Coupons <IoIosArrowDown />
          </li>
          {showCouponMenu ? (
            <ul className="border rounded-md">
              <Link to="/dashboard/create-coupon">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  Create Coupon
                </li>
              </Link>
              <Link to="/dashboard/coupons">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  All Counpons
                </li>
              </Link>
            </ul>
          ) : null}
          <Link to="/dashboard/reviews">
            <li className="cursor-pointer flex items-center px-2 py-2 hover:bg-blue-600 my-1 hover:rounded-md">
              Reviews
            </li>
          </Link>
          <Link to="/dashboard/users">
            <li className="cursor-pointer flex items-center px-2 py-2 hover:bg-blue-600 my-1 hover:rounded-md">
              Users
            </li>
          </Link>
          <li
            onClick={toggleShowSettingsMenu}
            className="cursor-pointer flex items-center px-2 py-2 hover:bg-blue-600 my-1 hover:rounded-md"
          >
            Settings <IoIosArrowDown />
          </li>
          {showSettingsMenu ? (
            <ul className="border rounded-md p-2">
              <Link to="/dashboard/profile">
                <li className="px-2 py-2 text-white hover:bg-blue-800 my-2 flex items-center hover:rounded-md">
                  Homepage <IoIosArrowDown onClick={toggleShowHomepageMenu} />
                </li>
                {showHomepageMenu ? (
                  <ul className="border rounded-md">
                    <Link to="/dashboard/homepage">
                      <li className="px-3 py-2 hover:bg-blue-600 text-gray-900 hover:rounded-md">
                        Homepage info
                      </li>
                    </Link>
                    <Link to="/dashboard/image-slider">
                      <li className="px-3 py-2 hover:bg-blue-600 text-gray-900 hover:rounded-md">
                        Image Slider
                      </li>
                    </Link>
                    <Link to="/dashboard/products-carousel">
                      <li className="px-3 py-2 hover:bg-blue-600 text-gray-900 hover:rounded-md">
                        Products carousel
                      </li>
                    </Link>
                  </ul>
                ) : null}

                <li className="px-3 py-2 text-white hover:bg-blue-600 hover:rounded-md">
                  Profile
                </li>
              </Link>
              <Link to="/dashboard/tax">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  Tax
                </li>
              </Link>
              <Link to="/dashboard/shipping">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  Shipping
                </li>
              </Link>
              <Link to="/dashboard/logo">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  Logo
                </li>
              </Link>
              <Link to="/dashboard/contact-info">
                <li className="px-3 py-2 hover:bg-blue-600 text-white hover:rounded-md">
                  Contact Details
                </li>
              </Link>

              <Link>
                <li className="px-2 py-2 text-white hover:bg-blue-600 my-2 flex items-center hover:rounded-md">
                  Customize <IoIosArrowDown onClick={toggleShowCustomizeMenu} />
                </li>
                {showCustomizeMenu ? (
                  <ul className="border rounded-md">
                    <Link to="/dashboard/custom-header">
                      <li className="px-3 py-2 hover:bg-blue-600 text-gray-900 hover:rounded-md">
                        Header
                      </li>
                    </Link>
                    <Link to="/dashboard/custom-footer">
                      <li className="px-3 py-2 hover:bg-blue-600 text-gray-900 hover:rounded-md">
                        Footer
                      </li>
                    </Link>
                  </ul>
                ) : null}
              </Link>
            </ul>
          ) : null}
        </ul>
      ) : (
        <ul>
          <Link to="/dashboard/orders">
            <li className="px-2 py-2 text-white hover:bg-blue-600 my-2 hover:rounded-md">
              Orders
            </li>
          </Link>
          <Link to="/dashboard/contact-info">
            <li className="px-2 py-2 text-white hover:bg-blue-600 my-2 hover:rounded-md">
              Contact details
            </li>
          </Link>
          <Link to="/dashboard/profile">
            <li className="px-2 py-2 text-white hover:bg-blue-600 my-2 hover:rounded-md">
              Profile
            </li>
          </Link>
        </ul>
      )}
    </aside>
  );
};

export default AdminSidebar;
