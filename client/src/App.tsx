import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { WelcomeWarningPage } from "./pages/WelcomeWarningPage.js";
import { HomePage } from "./pages/HomePage.js";
import { LoginPage } from "./pages/LoginPage.js";
import { RegisterPage } from "./pages/RegisterPage.js";
import { BrowsePage } from "./pages/BrowsePage.js";
import { ProductDetailPage } from "./pages/ProductDetailPage.js";
import { CartPage } from "./pages/CartPage.js";
import { CheckoutPage } from "./pages/CheckoutPage.js";
import { OutOfStockPage } from "./pages/OutOfStockPage.js";
import { SupportPage } from "./pages/SupportPage.js";
import { LeaderboardPage } from "./pages/LeaderboardPage.js";
import { JudgePage } from "./pages/JudgePage.js";
import { NotFoundPage } from "./pages/NotFoundPage.js";

export const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Section 7 User Flow: User lands on / -> photosensitivity splash -> accepts
  useEffect(() => {
    const accepted = localStorage.getItem("readrage_warning_accepted");
    if (!accepted && location.pathname !== "/welcome-warning" && location.pathname !== "/judge") {
      navigate("/welcome-warning", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/welcome-warning" element={<WelcomeWarningPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/browse" element={<BrowsePage />} />
      <Route path="/product/:id" element={<ProductDetailPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/out-of-stock" element={<OutOfStockPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/judge" element={<JudgePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
