import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { cartProductList } = useSelector((state) => state.cart_Slice);

  return (
    <header className="bg-blue-700 text-white">
      <nav className="flex justify-between items-center w-8/12 mx-auto min-h-10 ">
        <h1>ECOM</h1>
        <ul className="flex justify-evenly w-6/12">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/contact">
            <li>Cotnact</li>
          </Link>
          <Link to="/register">
            <li>Register</li>
          </Link>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/cart">
            <li>
              Cart ({cartProductList.length != "" ? cartProductList.length : 0})
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
