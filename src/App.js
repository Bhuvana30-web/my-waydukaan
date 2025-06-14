import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import SettingsPage from './pages/SettingsPage';
import CategoryPage from './pages/CategoryPage';
import SubCategory from './pages/SubCategory';
import { CartProvider } from './context/CartContext';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MyBasketPage from './pages/MyBasketPage';
import CheckoutPage from './pages/CheckoutPage';
import { Toaster } from 'react-hot-toast';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <Toaster position="top-center" reverseOrder={false} />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route index element={<HomePage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="categories" element={<CategoryPage />} />
                    <Route path="category/:categoryId" element={<CategoryPage />} />
                    <Route path="category/:categoryId/:subcategoryId" element={<SubCategory />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="basket" element={<MyBasketPage />} />
                    <Route path="checkout" element={<CheckoutPage />} />
                  </Routes>
                  <Footer showBrands showCategories showQuickLinks showHelp />
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
