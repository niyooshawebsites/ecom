import { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const AdminSidebar = () => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const [showCouponMenu, setShowCouponMenu] = useState(false);
  const [isActiveTab, setIsActiveTab] = useState(false);

  const toggleShowCategoryMenu = () => {
    setShowCategoryMenu((prevState) => !prevState);
  };

  const toggleShowProductMenu = () => {
    setShowProductMenu((prevState) => !prevState);
  };

  const toggleShowCouponMenu = () => {
    setShowCouponMenu((prevState) => !prevState);
  };

  return (
    <aside className="w-2/12 bg-orange-500 my-2">
      <ul>
        <Link to="/orders">
          <li className="py-5 hover:bg-blue-600">Orders</li>
        </Link>
        <li
          onClick={toggleShowCategoryMenu}
          className="cursor-pointer flex items-center"
        >
          Categories <IoIosArrowDown />
        </li>
        {showCategoryMenu ? (
          <ul>
            <li>Create Category</li>
            <li>All Categories</li>
          </ul>
        ) : null}
        <li
          onClick={toggleShowProductMenu}
          className="cursor-pointer flex items-center"
        >
          Products <IoIosArrowDown />
        </li>
        {showProductMenu ? (
          <ul>
            <li>Create Product</li>
            <li>All Products</li>
          </ul>
        ) : null}
        <li
          onClick={toggleShowCouponMenu}
          className="cursor-pointer flex items-center"
        >
          Coupons <IoIosArrowDown />
        </li>
        {showCouponMenu ? (
          <ul>
            <li>Create Coupon</li>
            <li>All Coupons</li>
          </ul>
        ) : null}
        <li>Reviews</li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
