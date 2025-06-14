import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart, FaUser, FaChevronDown, FaShoppingBag, FaClipboardList, FaMicrophone, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import Logo from './Logo';

const categories = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    subcategories: [
      { id: 'fresh-fruits', name: 'Fresh Fruits' },
      { id: 'fresh-vegetables', name: 'Fresh Vegetables' },
    ]
  },
  {
    id: 'beauty-hygiene',
    name: 'Beauty & Hygiene',
    subcategories: [
      { id: 'skincare', name: 'Skincare' },
      { id: 'haircare', name: 'Haircare' },
      { id: 'mens-grooming', name: 'Mens& Grooming' },
      { id: 'fragrances&deos', name: 'Fragrances&Deos' }
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    subcategories: [
      { id: 'energy&soft-drinks', name: 'Energy&Soft Drinks' },
    ]
  },
  {
    id: 'cleaning-household',
    name: 'Clean & Household',
    subcategories: [
      { id: 'all-purpose-cleaners', name: 'All Purpose Cleaners' },
      { id: 'laundry-detergents', name: 'Laundry & Detergents' },
      { id: 'dishwash', name: 'Dishwash' }
    ]
  },
  {
    id: 'bakery-cakes-dairy',
    name: 'Bakery,Cakes & Dairy',
    subcategories: [
      { id: 'cakes&pastries', name: 'Cakes&Pastries' },
      { id: 'dairy', name: 'Dairy' },
    ]
  },

  {
    id: 'foodgrains-oil-masala',
    name: 'Foodgrains, Oil & Masala',
    subcategories: [
      { id: 'dals-pulses', name: 'Dals & Pulses'},
      { id: 'edible-oils-ghee', name: 'Edible Oils & Ghee' },
      { id: 'rice-products', name: 'Rice & Rice Products' },
    ]
  },
  {
    id: 'snacks-branded-foods',
    name: 'Snacks & Branded Foods',
    subcategories: [
      { id: 'noodle-pasta-vermicelli', name: 'Noodle, Pasta, Vermicelli' },
    ]
  }
];

const Header = () => {
  const { getCartCount } = useCart();
  const [basketCount, setBasketCount] = useState(0);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const email = user.email || 'Not logged in';

  // Load basket count from localStorage
  useEffect(() => {
    const basket = JSON.parse(localStorage.getItem('mybasket') || '[]');
    setBasketCount(basket.length);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    toast.success('Signed out successfully!');
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch('');
    }
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Top Row: Logo and Search */}
        <div className="flex items-center justify-between mb-3">
          <Link to="/" className="flex items-center">
            <Logo height="76px" />
            <span className="text-lg font-bold text-[#2B6777] ml-3">WayDukaan</span>
          </Link>

          {/* Center: Search Bar */}
          <div className="flex-grow max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center gap-4">
                <div className="flex items-center text-sm text-gray-600 whitespace-nowrap min-w-[120px]">
                  <FaMapMarkerAlt className="text-[#2B6777] mr-2" />
                  <span className="font-medium">Hyderabad</span>
                </div>
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for Products..."
                    className="w-full border border-gray-300 rounded-md pl-10 pr-20 py-2 focus:outline-none focus:ring-2 focus:ring-[#2B6777]"
                  />
                  <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#2B6777]"
                    onClick={() => toast.success('Voice search coming soon!')}
                  >
                    <FaMicrophone className="text-lg" />
                  </button>
                </div>
                <div className="text-sm text-gray-600 whitespace-nowrap min-w-[140px]">
                  Delivery in 2-3 days
                </div>
              </div>
            </form>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center gap-8">
            <Link to="/cart" className="relative group">
              <FaShoppingCart className="text-xl text-[#2B6777] hover:text-[#87AAAA]" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
              <div className="absolute z-50 -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-[#2B6777] text-white text-sm py-1 px-3 rounded-lg shadow-lg">
                  Cart
                </div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#2B6777]" />
              </div>
            </Link>

            <Link to="/basket" className="relative group">
              <div className="relative">
                <FaShoppingBag className="text-2xl text-[#2B6777] hover:text-[#87AAAA] transform hover:scale-110 transition-transform duration-200" />
                {basketCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6B6B] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center">
                    {basketCount}
                  </span>
                )}
              </div>
              <div className="absolute z-50 -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-[#2B6777] text-white text-sm py-1 px-3 rounded-lg shadow-lg">
                  My Basket
                </div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#2B6777]" />
              </div>
            </Link>

            <Link to="/orders" className="relative group">
              <div className="relative">
                <FaClipboardList className="text-xl text-[#2B6777] hover:text-[#87AAAA]" />
              </div>
              <div className="absolute z-50 -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-[#2B6777] text-white text-sm py-1 px-3 rounded-lg shadow-lg">
                  My Orders
                </div>
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#2B6777]" />
              </div>
            </Link>

            <div className="relative group">
              <button 
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="text-[#2B6777] hover:text-[#87AAAA]"
              >
                <FaUser className="text-xl" />
              </button>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 py-2 border border-gray-100">
                  <div className="px-4 py-2 text-[#2B6777] font-semibold border-b text-sm">{email}</div>
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Orders</Link>
                  <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Sign Out</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row: Category Dropdown */}
        <div className="flex justify-start">
          <div className="relative">
            <button
              onClick={() => {
                setShowCategoryDropdown(!showCategoryDropdown);
                setShowProfileDropdown(false);
              }}
              className="bg-[#2B6777] text-white px-6 py-2 rounded font-medium hover:bg-[#87AAAA] flex items-center"
            >
              Category <FaChevronDown className="ml-2" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute left-0 mt-2 w-56 bg-white border rounded shadow-lg z-50">
                {categories.map((category) => (
                  <div key={category.id} className="relative group">
                    <Link
                      to={`/category/${category.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowCategoryDropdown(false)}
                    >
                      {category.name}
                    </Link>
                    <div className="hidden group-hover:block absolute left-full top-0 w-56 bg-white border rounded shadow-lg">
                      {category.subcategories.map((sub) => (
                        <Link
                          key={sub.id}
                          to={`/category/${category.id}/${sub.id}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setShowCategoryDropdown(false)}
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;