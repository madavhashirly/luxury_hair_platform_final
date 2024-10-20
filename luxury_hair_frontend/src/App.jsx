import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Product from "./components/Product";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import AuthPage from "./components/AuthPage";
import Shipping from "./components/Shipping";
import Reviews from "./components/Reviews";
import Checkout from "./components/Checkout";
import OrderDetails from "./components/OrderDetails";
import AdminProduct from "./components/AdminProduct";
import Tips from "./components/Tips.jsx";

const App = () => {
  const login = window.localStorage.getItem("isLogin");

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/Tips" element={<Tips />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/login" element={login ? <Home /> : <AuthPage />} />
          <Route path="/checkout" element={login ? <Checkout /> : <AuthPage />} />
          <Route path="/shipping" element={login ? <Shipping /> : <AuthPage />} />
          <Route path="/orderdetails" element={login ? <OrderDetails /> : <AuthPage />} />
          <Route path="/adminproduct" element={login ? <AdminProduct /> : <AuthPage />} />
        </Routes>
      </Router>
  );
};

export default App;
