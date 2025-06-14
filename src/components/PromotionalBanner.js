import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const promotionalCategories = [
  {
    id: 'fruits-vegetables',
    name: 'Fruits & Vegetables',
    image: '/images/fruits-vegetables.jpg',
    description: 'Fresh and seasonal fruits and vegetables sourced directly from local farmers. Quality produce delivered to your doorstep.',
    subcategories: [
      { id: 'fresh-fruits', name: 'Fresh Fruits' },
      { id: 'fresh-vegetables', name: 'Fresh Vegetables' }
    ]
  },
  {
    id: 'beauty-hygiene',
    name: 'Beauty & Hygiene',
    image: '/images/beauty-hygiene.jpg',
    description: 'Premium beauty products and personal care essentials. From skincare to haircare, find everything you need for your daily routine.',
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
    image: '/images/beverages.jpg',
    description: 'Refreshing drinks and energizing beverages. From soft drinks to energy drinks, quench your thirst with our wide selection.',
    subcategories: [
      { id: 'energy&soft-drinks', name: 'Energy&Soft Drinks' }
    ]
  },
  {
    id: 'cleaning-household',
    name: 'Clean & Household',
    image: '/images/clean-household.jpg',
    description: 'Essential cleaning supplies and household items. Keep your home spotless with our range of cleaning products.',
    subcategories: [
      { id: 'all-purpose-cleaners', name: 'All Purpose Cleaners' },
      { id: 'laundry-detergents', name: 'Laundry & Detergents' },
      { id: 'dishwash', name: 'Dishwash' }
    ]
  },
  {
    id: 'bakery',
    name: 'Bakery',
    image: '/images/bakery.jpg',
    description: 'Freshly baked goods and delicious snacks. Enjoy our selection of bread, cookies, and other bakery items.',
    subcategories: [
      { id: 'bakery-snacks', name: 'Bakery Snacks' }
    ]
  },
  {
    id: 'cakes-dairy',
    name: 'Cakes & Dairy',
    image: '/images/cakes-dairy.jpg',
    description: 'Sweet treats and dairy products. From cakes to milk products, satisfy your cravings with our quality selection.',
    subcategories: [
      { id: 'cakes&pastries', name: 'Cakes&Pastries' },
      { id: 'dairy', name: 'Dairy' }
    ]
  },
  {
    id: 'foodgrains',
    name: 'Food Grains',
    image: '/images/foodgrains.jpg',
    description: 'Premium quality grains and pulses. Stock up on essential food items for your kitchen.',
    subcategories: [
      { id: 'dals-pulses', name: 'Dals & Pulses' }
    ]
  },
  {
    id: 'oils-masala',
    name: 'Oils & Masala',
    image: '/images/oils-masala.jpg',
    description: 'Pure cooking oils and authentic spices. Enhance your cooking with our range of oils and masalas.',
    subcategories: [
      { id: 'edible-oils', name: 'Edible Oils' },
      { id: 'rice', name: 'Rice' }
    ]
  },
  {
    id: 'snacks-branded',
    name: 'Snacks & Branded Foods',
    image: '/images/snacks-branded.jpg',
    description: 'Popular snacks and branded food items. From instant noodles to ready-to-eat meals, find your favorite brands.',
    subcategories: [
      { id: 'noodles', name: 'Noodles&Pasta' },
      { id: 'vermicelli', name: 'Vermicelli' }
    ]
  }
];

const promotionalBanners = [
  {
    id: 1,
    title: "Fresh Fruits & Vegetables",
    description: "Farm fresh produce delivered to your doorstep",
    image: "/images/Fresh Fruits Pack.webp",
    backgroundColor: "#EDFDF8",
    textColor: "#2B6777",
    link: "/category/fruits-vegetables"
  },
  {
    id: 2,
    title: "Beauty & Hygiene",
    description: "Stock up on daily essentials",
    image: "/images/Organic Vegetables.jpg",
    backgroundColor: "#F5F3FF",
    textColor: "#5B21B6",
    link: "/category/foodgrains"
  },
  {
    id: 3,
    title: "Beverages",
    description: "Freshly baked and dairy delights",
    image: "/images/Dairy Special.jpeg",
    backgroundColor: "#FFF7ED",
    textColor: "#B45309",
    link: "/category/dairy-bakery"
  },
  {
    id: 4,
    title: "Clean & Household",
    description: "Refreshing drinks for every mood",
    image: "/images/beverages.jpeg",
    backgroundColor: "#E0F2FE",
    textColor: "#0369A1",
    link: "/category/beverages"
  },
  {
    id: 5,
    title: "Bakery",
    description: "Tasty snacks and branded treats",
    image: "/images/Snacks & Branded Foods.jpeg",
    backgroundColor: "#FDF2F8",
    textColor: "#BE185D",
    link: "/category/snacks"
  }
];

const PromotionalBanner = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  const handleShopNowClick = (category) => {
    setSelectedCategory(category.id);
    const subcategoryNames = category.subcategories.map(sub => sub.name).join(', ');
    toast.success(`Available subcategories in ${category.name}: ${subcategoryNames}`);
  };

  // Auto-slide effect for banners with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isBannerHovered) {
        setBannerIndex((prev) => (prev + 1) % promotionalBanners.length);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isBannerHovered]);

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {promotionalCategories.map((category) => (
            <div key={category.id} className="relative group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#2B6777] mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{category.description}</p>
                  <button
                    onClick={() => handleShopNowClick(category)}
                    className="w-full bg-[#2B6777] text-white py-2 rounded-md hover:bg-[#87AAAA] transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              </div>

              {/* Subcategories Modal */}
              {selectedCategory === category.id && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-[#2B6777]">{category.name}</h3>
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <div className="space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/category/${category.id}/${subcategory.id}`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                          onClick={() => setSelectedCategory(null)}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Promotional Banners */}
      <div className="w-full bg-gray-100 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="relative h-[250px] md:h-[350px] rounded-xl overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsBannerHovered(true)}
            onMouseLeave={() => setIsBannerHovered(false)}
          >
            {promotionalBanners.map((banner, idx) => (
              <Link
                key={banner.id}
                to={banner.link}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  idx === bannerIndex 
                    ? 'opacity-100 translate-x-0 z-10' 
                    : 'opacity-0 translate-x-full z-0 pointer-events-none'
                }`}
              >
                <div className="absolute inset-0">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
                </div>
                <div className="relative p-6 md:p-8 h-full flex flex-col justify-center max-w-3xl">
                  <div className="transform transition-transform duration-500 hover:scale-105">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                      {banner.title}
                    </h3>
                    <p className="text-white/90 text-lg mb-4 drop-shadow-md">
                      {banner.description}
                    </p>
                    <span className="inline-block bg-white text-[#2B6777] px-6 py-3 rounded-full font-medium text-base hover:bg-[#2B6777] hover:text-white transition duration-300 transform hover:scale-105 shadow-lg">
                      Shop Now →
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={() => setBannerIndex((prev) => (prev - 1 + promotionalBanners.length) % promotionalBanners.length)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg hover:scale-110"
              aria-label="Previous banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setBannerIndex((prev) => (prev + 1) % promotionalBanners.length)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg hover:scale-110"
              aria-label="Next banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
              {promotionalBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setBannerIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === bannerIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to banner ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner; 