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
          <Route path="/dashboard/create-product" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
