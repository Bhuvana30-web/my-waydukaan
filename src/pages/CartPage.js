import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const CartPage = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartTotal 
  } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2B6777] mb-6">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link 
              to="/" 
              className="inline-block bg-[#2B6777] text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#2B6777]">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 transition"
          >
            Clear Cart
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item._id} className="p-6">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="ml-6 flex-1">
                    <h2 className="text-lg font-semibold text-[#2B6777]">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="text-gray-500 hover:text-[#2B6777] transition"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-4 text-gray-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="text-gray-500 hover:text-[#2B6777] transition"
                          disabled={item.quantity >= (item.stock || 10)}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-[#2B6777] mr-4">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-700">Total</span>
              <span className="text-2xl font-bold text-[#2B6777]">
                {formatPrice(getCartTotal())}
              </span>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => navigate('/checkout')}
                className="bg-[#2B6777] text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
              >
                Checkout
              </button>
              <Link
                to="/"
                className="text-[#2B6777] hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 