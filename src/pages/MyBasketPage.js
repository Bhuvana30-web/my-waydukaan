import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BASKET_KEY = 'mybasket';
const CART_ORDERS_KEY = 'cart_orders';
const BASKET_ORDERS_KEY = 'mybasket_orders';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

// Helper: Get unique items by _id
const getUniqueItems = (items) => {
  const map = new Map();
  items.forEach(item => {
    if (!map.has(item._id)) {
      map.set(item._id, { ...item });
    }
  });
  return Array.from(map.values());
};

const MyBasketPage = () => {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load basket from localStorage and analyze order history
  useEffect(() => {
    const loadBasket = () => {
      try {
        const basketRaw = localStorage.getItem(BASKET_KEY);
        let basketArr = basketRaw ? JSON.parse(basketRaw) : [];

        // Analyze cart order history for regular products
        const cartOrders = JSON.parse(localStorage.getItem(CART_ORDERS_KEY) || '[]');
        const productCount = {};
        
        // Count product occurrences
        cartOrders.forEach(order => {
          order.items.forEach(item => {
            const itemId = item._id || item.id;
            if (itemId) {
              productCount[itemId] = (productCount[itemId] || 0) + 1;
            }
          });
        });

        // Add products bought more than once to MyBasket
        const regularProducts = [];
        cartOrders.forEach(order => {
          order.items.forEach(item => {
            const itemId = item._id || item.id;
            if (itemId && productCount[itemId] > 1) {
              regularProducts.push({
                ...item,
                _id: itemId,
                id: itemId
              });
            }
          });
        });

        // Merge with current basket, keep unique
        const merged = getUniqueItems([...basketArr, ...regularProducts]);
        setBasket(merged);
        localStorage.setItem(BASKET_KEY, JSON.stringify(merged));
      } catch (error) {
        console.error('Error loading basket:', error);
        toast.error('Failed to load basket');
      } finally {
        setLoading(false);
      }
    };

    loadBasket();
  }, []);

  // Save basket to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(BASKET_KEY, JSON.stringify(basket));
      } catch (error) {
        console.error('Error saving basket:', error);
        toast.error('Failed to save basket');
      }
    }
  }, [basket, loading]);

  const removeFromBasket = (id) => {
    try {
      setBasket((prev) => prev.filter((item) => item._id !== id));
      toast.success('Item removed from basket');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const clearBasket = () => {
    try {
      setBasket([]);
      toast.success('Basket cleared');
    } catch (error) {
      console.error('Error clearing basket:', error);
      toast.error('Failed to clear basket');
    }
  };

  const updateQuantity = (id, newQuantity) => {
    try {
      if (newQuantity < 1) {
        removeFromBasket(id);
        return;
      }
      setBasket((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const getBasketTotal = () => {
    return basket.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const placeOrder = () => {
    try {
      if (basket.length === 0) {
        toast.error('Your basket is empty!');
        return;
      }

      // Save order to mybasket_orders
      const orders = JSON.parse(localStorage.getItem(BASKET_ORDERS_KEY) || '[]');
      orders.push({
        id: Date.now(),
        items: basket,
        total: getBasketTotal(),
        date: new Date().toISOString(),
      });
      localStorage.setItem(BASKET_ORDERS_KEY, JSON.stringify(orders));
      
      setBasket([]);
      toast.success('Order placed for all items in your basket!', {
        duration: 2500,
        position: 'top-center',
      });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-[#2B6777]">
        Loading...
      </div>
    );
  }

  if (basket.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-[#2B6777] mb-6">My Basket</h1>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500 mb-4">
              Your basket is empty. Add your regular items for quick ordering!
            </p>
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
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#2B6777]">My Basket</h1>
          <button
            onClick={clearBasket}
            className="text-red-500 hover:text-red-700 transition"
          >
            Clear Basket
          </button>
        </div>

        <div className="flex justify-end mb-4">
          <button
            onClick={placeOrder}
            className="bg-[#2B6777] text-white px-6 py-2 rounded-lg text-base font-semibold hover:bg-[#87AAAA] transition"
          >
            Place All Orders
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {basket.map((item) => (
              <div key={item._id} className="p-6 flex items-center">
                <img
                  src={item.image || item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(item.name)}`;
                    e.target.onerror = null;
                  }}
                />
                <div className="ml-6 flex-1">
                  <h2 className="text-lg font-semibold text-[#2B6777]">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-lg font-bold text-[#2B6777]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-[#2B6777] text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={item.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="mx-2 text-gray-700">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-[#2B6777] text-lg"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromBasket(item._id)}
                      className="text-red-500 hover:text-red-700 transition text-sm ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-700">Total</span>
            <span className="text-2xl font-bold text-[#2B6777]">
              {formatPrice(getBasketTotal())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBasketPage; 