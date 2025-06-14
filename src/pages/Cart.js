import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const Cart = () => {
  const navigate = useNavigate();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal,
    clearCart 
  } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
    if (newQuantity < 1) {
      toast.success('Item removed from cart');
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      setIsCheckingOut(false);
      toast.success('Order placed successfully!');
      navigate('/');
    }, 2000);
  };

  // Debug log to check cart items
  console.log('Cart Items:', cartItems);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#2B6777] mb-4">Your Cart is Empty</h2>
            <p className="text-gray-600 mb-8">Add some items to your cart to see them here</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#2B6777] hover:bg-[#87AAAA] transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#2B6777]">Shopping Cart</h1>
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="p-6 flex items-center">
                <div className="w-24 h-24 flex-shrink-0 relative">
                  <img
                    src={item.image || item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(item.name)}`;
                      e.target.onerror = null;
                    }}
                  />
                  {item.discount && (
                    <span className="absolute top-2 right-2 bg-[#FF6B6B] text-white text-xs px-2 py-1 rounded-full">
                      {item.discount}
                    </span>
                  )}
                </div>
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-medium text-[#2B6777]">{item.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {formatPrice(item.price)}
                  </p>
                  {item.description && (
                    <p className="text-gray-500 text-sm mt-1 line-clamp-2">{item.description}</p>
                  )}
                  <div className="mt-2 text-sm text-gray-500">
                    Subtotal: {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-gray-900">Total</span>
              <span className="text-2xl font-bold text-[#2B6777]">
                {formatPrice(getCartTotal())}
              </span>
            </div>
            <div className="flex justify-between space-x-4">
              <Link
                to="/"
                className="flex-1 px-6 py-3 border border-[#2B6777] text-center text-[#2B6777] font-medium rounded-md hover:bg-gray-50 transition"
              >
                Continue Shopping
              </Link>
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`flex-1 px-6 py-3 bg-[#2B6777] text-white font-medium rounded-md hover:bg-[#87AAAA] transition ${
                  isCheckingOut ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 