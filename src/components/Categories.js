import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Updated category data with additional electronics and fashion categories
const categoryData = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    icon: '🥬',
    subcategories: [
      { id: 'fresh-fruits', name: 'Fresh Fruits' },
      { id: 'fresh-vegetables', name: 'Fresh Vegetables' },
      { id: 'herbs-seasonings', name: 'Herbs & Seasonings' },
      { id: 'exotic-fruits-veggies', name: 'Exotic Fruits & Veggies' }
    ]
  },
  {
    id: 'foodgrains',
    name: 'Foodgrains',
    icon: '🌾',
    subcategories: [
      { id: 'rice-products', name: 'Rice & Rice Products' },
      { id: 'dals-pulses', name: 'Dals & Pulses' },
      { id: 'atta-flours', name: 'Atta & Flours' },
      { id: 'organic-staples', name: 'Organic Staples' }
    ]
  },
  {
    id: 'oil-masala',
    name: 'Oil & Masala',
    icon: '🫒',
    subcategories: [
      { id: 'cooking-oils', name: 'Cooking Oils' },
      { id: 'masalas-spices', name: 'Masalas & Spices' },
      { id: 'salt-sugar', name: 'Salt & Sugar' },
      { id: 'whole-spices', name: 'Whole Spices' },
      { id: 'sunflower-oil', name: 'Sunflower Oil' },
      { id: 'mustard-oil', name: 'Mustard Oil' },
      { id: 'groundnut-oil', name: 'Groundnut Oil' },
      { id: 'olive-oil', name: 'Olive Oil' },
      { id: 'ghee-vanaspati', name: 'Ghee & Vanaspati' }
    ]
  },
  {
    id: 'bakery',
    name: 'Bakery',
    icon: '🥖',
    subcategories: [
      { id: 'bread-buns', name: 'Bread & Buns' },
      { id: 'cookies-rusks', name: 'Cookies & Rusks' },
      { id: 'bakery-snacks', name: 'Bakery Snacks' },
      { id: 'cakes-pastries', name: 'Cakes & Pastries' }
    ]
  },
  {
    id: 'dairy',
    name: 'Dairy',
    icon: '🥛',
    subcategories: [
      { id: 'milk-products', name: 'Milk & Milk Products' },
      { id: 'paneer-tofu', name: 'Paneer & Tofu' },
      { id: 'butter-cheese', name: 'Butter & Cheese' },
      { id: 'yogurt-curd', name: 'Yogurt & Curd' }
    ]
  },
  {
    id: 'beverages',
    name: 'Beverages',
    icon: '🥤',
    subcategories: [
      { id: 'soft-drinks', name: 'Soft Drinks' },
      { id: 'juices', name: 'Juices' },
      { id: 'tea-coffee', name: 'Tea & Coffee' },
      { id: 'health-drinks', name: 'Health Drinks' }
    ]
  },
  {
    id: 'snacks-branded',
    name: 'Snacks & Branded Foods',
    icon: '🍿',
    subcategories: [
      { id: 'biscuits-cookies', name: 'Biscuits & Cookies' },
      { id: 'noodles-pasta', name: 'Noodles & Pasta' },
      { id: 'namkeen-snacks', name: 'Namkeen & Snacks' },
      { id: 'chocolates-candies', name: 'Chocolates & Candies' }
    ]
  },
  {
    id: 'beauty-hygiene',
    name: 'Beauty & Hygiene',
    icon: '🧴',
    subcategories: [
      { id: 'skin-care', name: 'Skin Care' },
      { id: 'hair-care', name: 'Hair Care' },
      { id: 'oral-care', name: 'Oral Care' },
      { id: 'bath-handwash', name: 'Bath & Hand Wash' },
      { id: 'sanitary-napkins', name: 'Sanitary Napkins' },
      { id: 'toilet-cleaners', name: 'Toilet Cleaners' },
      { id: 'tissues-wipes', name: 'Tissues & Wipes' },
      { id: 'disinfectants', name: 'Disinfectants' }
    ]
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: '📱',
    subcategories: [
      { id: 'smartphones', name: 'Smartphones' },
      { id: 'laptops-computers', name: 'Laptops & Computers' },
      { id: 'tv-entertainment', name: 'TV & Home Entertainment' },
      { id: 'audio-headphones', name: 'Audio & Headphones' },
      { id: 'cameras-photography', name: 'Cameras & Photography' },
      { id: 'gaming-accessories', name: 'Gaming & Accessories' }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: '👕',
    subcategories: [
      { id: 'mens-clothing', name: "Men's Clothing" },
      { id: 'womens-clothing', name: "Women's Clothing" },
      { id: 'kids-fashion', name: "Kids' Fashion" },
      { id: 'footwear', name: 'Footwear' },
      { id: 'watches-accessories', name: 'Watches & Accessories' },
      { id: 'bags-wallets', name: 'Bags & Wallets' }
    ]
  },
  {
    id: 'household',
    name: 'Household',
    icon: '🏠',
    subcategories: [
      { id: 'cleaning-supplies', name: 'Cleaning Supplies' },
      { id: 'laundry-detergents', name: 'Laundry & Detergents' },
      { id: 'home-utilities', name: 'Home Utilities' },
      { id: 'air-fresheners', name: 'Air Fresheners' }
    ]
  }
];

const Categories = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory?.id === category.id ? null : category);
  };

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    navigate(`/category/${categoryId}/${subcategoryId}`);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
          Shop by Category
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.map((category) => (
            <div key={category.id} className="relative">
              <button
                onClick={() => handleCategoryClick(category)}
                className={`w-full p-4 rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-3 ${
                  selectedCategory?.id === category.id
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white text-cyan-600 hover:bg-cyan-50'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-lg font-medium">{category.name}</span>
              </button>

              {selectedCategory?.id === category.id && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 z-20">
                  <div className="grid gap-2">
                    {category.subcategories.map((subcategory) => (
                      <button
                        key={subcategory.id}
                        onClick={() => handleSubcategoryClick(category.id, subcategory.id)}
                        className="w-full p-3 text-left text-gray-700 hover:bg-cyan-50 hover:text-cyan-600 rounded-md transition-colors duration-200"
                      >
                        {subcategory.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 