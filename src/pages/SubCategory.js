import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { FaShoppingCart, FaSpinner, FaSearch, FaFilter, FaSort, FaMinus, FaPlus, FaHeart, FaRegHeart, FaShare, FaStar } from 'react-icons/fa';
import { subcategoryItems } from '../data/subcategoryItems';
import { categories } from '../data/categories';

const ITEMS_PER_PAGE = 8;

const SubCategory = () => {
  const { categoryId, subcategoryId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sorting, setSorting] = useState('default');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedItems, setSelectedItems] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedWeights, setSelectedWeights] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [quickViewItem, setQuickViewItem] = useState(null);

  // Find current category and subcategory
  const currentCategory = useMemo(() => {
    return categories.find(cat => cat.id === categoryId);
  }, [categoryId]);

  const currentSubcategory = useMemo(() => {
    return currentCategory?.subcategories.find(sub => sub.id === subcategoryId);
  }, [currentCategory, subcategoryId]);

  useEffect(() => {
    const fetchSubcategoryData = () => {
      try {
        setLoading(true);
        setError(null);

        if (!currentCategory) {
          throw new Error(`Category not found: ${categoryId}`);
        }

        let productsToSet = [];

        if (subcategoryId) {
          // If a specific subcategory is selected, fetch its items directly
          const subcategoryData = subcategoryItems[subcategoryId];
          if (!subcategoryData || !subcategoryData.items) {
            throw new Error(`No products found for subcategory: ${subcategoryId}`);
          }
          productsToSet = subcategoryData.items;
        } else if (currentCategory.subcategories && currentCategory.subcategories.length > 0) {
          // If a main category with subcategories is selected, gather all items from its subcategories
          currentCategory.subcategories.forEach(sub => {
            const subcategoryData = subcategoryItems[sub.id];
            if (subcategoryData && subcategoryData.items) {
              productsToSet = productsToSet.concat(subcategoryData.items);
            }
          });

          if (productsToSet.length === 0) {
            throw new Error(`No products found for category: ${categoryId} within its subcategories.`);
          }
        } else {
          throw new Error(`No subcategory or products found for category: ${categoryId}`);
        }

        setItems(productsToSet);
      } catch (err) {
        console.error('Error fetching subcategory data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategoryData();
  }, [categoryId, subcategoryId, currentCategory]);

  // Get unique brands from items
  const uniqueBrands = useMemo(() => {
    const brands = new Set();
    items.forEach(item => {
      if (item.brand) brands.add(item.brand);
    });
    return Array.from(brands);
  }, [items]);

  // Filter items based on search, price range, and filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = item.price >= priceRange.min && item.price <= priceRange.max;
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(Math.floor(item.rating));
      return matchesSearch && matchesPrice && matchesBrand && matchesRating;
    });
  }, [items, searchQuery, priceRange, selectedBrands, selectedRatings]);

  // Sort items
  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems];
    switch (sorting) {
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }, [filteredItems, sorting]);

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedItems.slice(start, start + itemsPerPage);
  }, [sortedItems, currentPage]);

  const handleQuantityChange = (itemId, change) => {
    setSelectedItems(prev => {
      const currentQty = prev[itemId] || 0;
      const newQty = Math.max(0, currentQty + change);
      return { ...prev, [itemId]: newQty };
    });
  };

  const handleAddToCart = (item) => {
    if (!selectedItems[item.id] || selectedItems[item.id] === 0) {
      toast.error('Please select quantity');
      return;
    }

    if (selectedItems[item.id] > item.stock) {
      toast.error('Selected quantity exceeds available stock');
      return;
    }

    try {
      const cartItem = {
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.image,
        description: item.description,
        quantity: selectedItems[item.id]
      };
      
      addToCart(cartItem);
      toast.success(`${selectedItems[item.id]} ${item.name} added to cart!`, {
        icon: '🛒',
        duration: 2000,
        style: {
          background: '#2B6777',
          color: '#fff',
        },
      });
      setSelectedItems(prev => ({ ...prev, [item.id]: 0 }));
      navigate('/cart');
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    }
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleRatingSelect = (rating) => {
    setSelectedRatings(prev =>
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    );
  };

  const toggleFavorite = (itemId) => {
    setFavorites(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <Link
          to="/"
          className="px-4 py-2 bg-[#2B6777] text-white rounded hover:bg-[#87AAAA] transition"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  if (!currentCategory || !currentSubcategory) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl mb-4">Category or Subcategory not found</div>
        <Link
          to="/"
          className="px-4 py-2 bg-[#2B6777] text-white rounded hover:bg-[#87AAAA] transition"
        >
          Go to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-2">
          <Link to={`/category/${categoryId}`} className="text-[#2B6777] hover:underline">
            {currentCategory.name}
          </Link>
          <span className="text-gray-400">/</span>
          <h1 className="text-3xl font-bold text-[#2B6777]">
            {currentSubcategory.name}
          </h1>
        </div>
        <p className="text-gray-600">
          {currentSubcategory.description || 'Browse our products'}
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
        </div>

        <div className="flex gap-4">
          <select
            value={sorting}
            onChange={(e) => setSorting(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="default">Sort by</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="rating">Rating</option>
            <option value="name">Name</option>
          </select>

          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Price Range</h3>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹{priceRange.min}</span>
                <span>₹{priceRange.max}</span>
              </div>
            </div>
          </div>

          {uniqueBrands.length > 0 && (
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-4">Brands</h3>
              <div className="space-y-2">
                {uniqueBrands.map(brand => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandSelect(brand)}
                      className="rounded text-blue-500"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Rating</h3>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => (
                <label key={rating} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingSelect(rating)}
                    className="rounded text-blue-500"
                  />
                  <div className="flex items-center">
                    {[...Array(rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                    <span className="ml-2">& Up</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {paginatedItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {paginatedItems.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    {item.featured && (
                      <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                        Featured
                      </span>
                    )}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                    >
                      {favorites.includes(item.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <div className="flex items-center">
                        <FaStar className="text-yellow-400" />
                        <span className="ml-1">{item.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold">₹{item.price}</span>
                      <span className="text-sm text-gray-500">{item.weight}</span>
                    </div>

                    {item.brand && (
                      <p className="text-sm text-gray-500 mb-2">Brand: {item.brand}</p>
                    )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span>{selectedItems[item.id] || 0}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="px-2 py-1 border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                      <span className={`text-sm ${item.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {item.stock > 0 ? `In Stock (${item.stock})` : 'Out of Stock'}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={item.stock === 0}
                      className={`w-full py-2 rounded-lg flex items-center justify-center space-x-2 ${
                        item.stock === 0
                          ? 'bg-gray-300 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }`}
                    >
                      <FaShoppingCart />
                      <span>Add to Cart</span>
                    </button>
              </div>
                </div>
              ))}
              </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 border rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubCategory; 