import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import store from "./store/CentralStore";
import CreateProduct from "./pages/CreateProduct";
import CreateCategory from "./pages/CreateCategory";
import Categories from "./pages/Categories";
import UpdateCategory from "./pages/UpdateCategory";
import Products from "./pages/Products";
import UpdateProduct from "./pages/UpdateProduct";
import Protect from "./pages/Protect";
import ForgotPassword from "./pages/ForgotPassword";
import Orders from "./pages/Orders";
import AdminOrder from "./pages/AdminOrder";
import Reviews from "./pages/Reviews";
import CreateCoupon from "./pages/CreateCoupon";
import Coupons from "./pages/Coupons";
import UpdateCoupon from "./pages/UpdateCoupon";
import Checkout from "./pages/Checkout";
import ContactInfo from "./pages/ContactInfo";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/:category/:product/:pid" element={<Product />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="checkout" element={<Checkout />} />
          <Route element={<Protect />}>
            <Route
              path="/dashboard/create-category"
              element={<CreateCategory />}
            />
            <Route
              path="/dashboard/update-category/:cid"
              element={<UpdateCategory />}
            />
            <Route path="/dashboard/categories" element={<Categories />} />
            <Route
              path="/dashboard/create-product"
              element={<CreateProduct />}
            />
            <Route
              path="/dashboard/update-product/:pid"
              element={<UpdateProduct />}
            />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route
              path="/dashboard/order-details/:oid"
              element={<AdminOrder />}
            />
            <Route path="/dashboard/create-coupon" element={<CreateCoupon />} />
            <Route
              path="/dashboard/update-coupon/:ccid"
              element={<UpdateCoupon />}
            />
            <Route path="/dashboard/coupons" element={<Coupons />} />
            <Route path="/dashboard/reviews" element={<Reviews />} />
            <Route path="/dashboard/contact-info" element={<ContactInfo />} />
            <Route path="/dashboard/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
