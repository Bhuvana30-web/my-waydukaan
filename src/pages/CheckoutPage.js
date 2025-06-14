import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CART_KEY = 'cart';
const ORDERS_KEY = 'orders';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

const CheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({
    name: '',
    address: '',
    payment: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY);
    setCart(saved ? JSON.parse(saved) : []);
  }, []);

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.address.trim()) errs.address = 'Shipping address is required';
    if (!form.payment) errs.payment = 'Payment mode is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    if (!validate()) return;

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    const newOrder = {
      id: Date.now(),
      items: cart,
      total: getCartTotal(),
      customer: { ...form },
      date: new Date().toISOString(),
      status: 'processing'
    };
    orders.push(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    localStorage.setItem(CART_KEY, JSON.stringify([]));

    toast.success('Order placed successfully!', {
      duration: 2500,
      position: 'top-center',
    });

    setTimeout(() => {
      navigate('/orders');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2B6777] mb-6">Checkout</h1>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500 mb-4">Your cart is empty. Add products to your cart to proceed.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[#2B6777] mb-6">Checkout</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item._id} className="p-6 flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-6 flex-1">
                  <h2 className="text-lg font-semibold text-[#2B6777]">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#2B6777]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <span className="text-gray-500 text-sm">Qty: {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 p-6 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Total</span>
            <span className="text-2xl font-bold text-[#2B6777]">
              {formatPrice(getCartTotal())}
            </span>
          </div>
        </div>
        <form className="bg-white rounded-lg shadow p-6 mb-8" onSubmit={placeOrder}>
          <h2 className="text-xl font-bold text-[#2B6777] mb-4">Customer Details</h2>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#87AAAA] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Shipping Address<span className="text-red-500">*</span></label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#87AAAA] ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
              rows={3}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Payment Mode<span className="text-red-500">*</span></label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#87AAAA] ${errors.payment ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Payment Mode</option>
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
            {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#2B6777] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#87AAAA] transition"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage; 