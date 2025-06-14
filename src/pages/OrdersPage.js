import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag, FaTruck, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString) => {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'text-green-600';
    case 'processing':
      return 'text-blue-600';
    case 'cancelled':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const getStatusIcon = (status) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return <FaCheckCircle className="text-green-600" />;
    case 'processing':
      return <FaTruck className="text-blue-600" />;
    case 'cancelled':
      return <FaTimesCircle className="text-red-600" />;
    default:
      return <FaShoppingBag className="text-gray-600" />;
  }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load orders from localStorage
    const loadOrders = () => {
      try {
        const savedOrders = localStorage.getItem('orders');
        if (savedOrders) {
          setOrders(JSON.parse(savedOrders));
        }
      } catch (error) {
        console.error('Error loading orders:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2B6777]"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by placing your first order.</p>
            <div className="mt-6">
              <Link
                to="/"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#2B6777] hover:bg-[#87AAAA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B6777]"
              >
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#2B6777] mb-8">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Order #{order.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className={`font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-16 w-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                    </div>
                    <div className="text-lg font-semibold text-[#2B6777]">
                      Total: {formatPrice(order.total)}
                    </div>
                  </div>
                </div>

                {order.status.toLowerCase() === 'processing' && (
                  <div className="mt-6">
                    <Link
                      to={`/order/${order.id}`}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#2B6777] bg-[#EDFDF8] hover:bg-[#DCFCE7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2B6777]"
                    >
                      Track Order
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage; 