// src/pages/CategoryPage.js

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';

const CategoryPage = () => {
  const { categoryName } = useParams(); // e.g., "Fruits & Vegetables"
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://dukaan-gkgu.onrender.com/api/products")
      .then((res) => {
        const filtered = res.data.filter(p => p.category === decodeURIComponent(categoryName));
        setProducts(filtered);
      })
      .catch((err) => console.error("❌ Category fetch error", err));
  }, [categoryName]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{categoryName}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p, idx) => (
          <div key={idx} className="bg-white p-2 rounded shadow">
            <img src={p.imageUrl} alt={p.name} className="h-36 w-full object-cover rounded" />
            <h3 className="font-semibold mt-2">{p.name}</h3>
            <p className="text-gray-600 text-sm">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoryNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="relative">
      {/* Categories Button */}
      <button
        className="flex items-center space-x-2 px-4 py-2 text-[#0A3D62] hover:bg-gray-100 rounded-md transition"
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <span>Categories</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-[800px] bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="flex">
            {/* Categories List */}
            <div className="w-1/3 border-r border-gray-200">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`flex flex-col items-center p-4 hover:bg-gray-50 cursor-pointer transition ${
                    activeCategory === category.id ? 'bg-gray-50' : ''
                  }`}
                  onMouseEnter={() => setActiveCategory(category.id)}
                >
                  <span className="text-3xl mb-2">{category.icon}</span>
                  <span className="text-[#0A3D62] text-sm text-center font-medium">{category.name}</span>
                </div>
              ))}
            </div>

            {/* Subcategories */}
            <div className="w-2/3 p-4">
              {activeCategory && (
                <div className="grid grid-cols-2 gap-4">
                  {categories
                    .find(cat => cat.id === activeCategory)
                    ?.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        to={`/category/${activeCategory}/${subcategory.id}`}
                        className="p-3 rounded-md hover:bg-gray-50 transition"
                        onClick={() => setIsOpen(false)}
                      >
                        <h3 className="text-[#0A3D62] font-medium">{subcategory.name}</h3>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;