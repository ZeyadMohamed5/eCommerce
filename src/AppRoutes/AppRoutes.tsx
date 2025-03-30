import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "../layout/authlayout/AuthLayout";
import AuthPage from "../pages/AuthPage";
import Home from "../pages/Home";
import MainLayout from "../layout/mainlayout/MainLayout";
import Product from "../pages/ProductPage";
import AllProducts from "../pages/Products";
import ScrollToTop from "../components/Shared/ScrollToTop";
import CartPage from "../pages/CartPage";
import ProtectedRoute from "../components/Shared/ProtectedRoute";
import WishListPage from "../pages/WishListPage";
import SearchResultPage from "../pages/SearchResultPage";
import AboutPage from "../pages/AboutPage";
import CheckOutPage from "../pages/CheckOutPage";

const AppRoutes = () => {
  return (
    <Router basename="/eCommerce">
      <ScrollToTop />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckOutPage />} />
            <Route path="/wishlist" element={<WishListPage />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<AuthPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
