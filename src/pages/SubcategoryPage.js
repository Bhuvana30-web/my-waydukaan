import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/categories';
import { subcategoryItems } from '../data/subcategoryItems';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';

const SubcategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const currentCategory = categories.find(cat => cat.id === categoryId);
  const currentSubcategory = currentCategory?.subcategories.find(sub => sub.id === subcategoryId);

  useEffect(() => {
    const loadProducts = () => {
      try {
        setLoading(true);
        if (!currentCategory || !currentSubcategory) {
          throw new Error('Category or subcategory not found');
        }

        const subcategoryData = subcategoryItems[subcategoryId];
        if (!subcategoryData || !subcategoryData.items) {
          throw new Error('No products found for this subcategory');
        }

        setProducts(subcategoryData.items);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId && subcategoryId) {
      loadProducts();
    }
  }, [categoryId, subcategoryId, currentCategory, currentSubcategory]);

  const handleAddToCart = (product) => {
    try {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.image,
        description: product.description,
        quantity: 1
      };
      
      addToCart(cartItem);
      toast.success(`${product.name} added to cart!`, {
        icon: '🛒',
        duration: 2000,
        style: {
          background: '#2B6777',
          color: '#fff',
        },
      });
      navigate('/cart');
    } catch (error) {
      toast.error('Failed to add item to cart');
      console.error('Error adding to cart:', error);
    }
  };

  if (!currentCategory || !currentSubcategory) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-[#2B6777]">Subcategory not found</h1>
          <Link to={`/category/${categoryId}`} className="text-[#2B6777] hover:underline mt-4 inline-block">
            ← Back to Category
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Subcategory Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link to={`/category/${categoryId}`} className="text-[#2B6777] hover:underline">
              {currentCategory.name}
            </Link>
            <span className="text-gray-400">/</span>
            <h1 className="text-2xl font-bold text-[#2B6777]">{currentSubcategory.name}</h1>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-xl font-semibold text-[#2B6777] mb-6">Products in {currentSubcategory.name}</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2B6777]"></div>
          </div>
        ) : error ? (
          <div className="text-red-600 text-center py-8">{error}</div>
        ) : products.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No products found in this subcategory.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                  {product.featured && (
                    <span className="absolute top-2 right-2 bg-[#2B6777] text-white px-2 py-1 rounded text-sm">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-[#2B6777]">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold text-[#2B6777]">₹{product.price}</span>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="bg-[#2B6777] text-white px-4 py-2 rounded-md hover:bg-[#87AAAA] transition flex items-center space-x-2"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubcategoryPage; 