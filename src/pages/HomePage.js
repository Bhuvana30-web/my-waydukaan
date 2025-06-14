import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-hot-toast';
import { categories } from '../data/categories';

const deals = [
  {
    id: 'featured-1',
    title: 'Monthly Grocery Pack',
    description: 'Complete monthly grocery essentials including rice, dal, oil, spices, and more.',
    discount: '40% OFF',
    image: '/images/grocery-bag-full-vegetables.webp',
    tag: 'FEATURED',
    originalPrice: 4999,
    discountedPrice: 2999,
    category: 'foodgrains',
    stock: 20,
    quantity: 1
  }
];

const formatPrice = (price) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

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
    description: "Essential cleaning supplies and household items",
    image: "/images/beverages.jpeg",
    backgroundColor: "#E0F2FE",
    textColor: "#0369A1",
    link: "/category/cleaning-household"
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

const seasonalOffers = [
  {
    id: 1,
    title: "Summer Fruits",
    subtitle: "Fruits & Vegetables",
    items: ["Mangoes", "Watermelons", "Berries"],
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=500&h=300&q=80&fit=crop",
    discount: "Up to 30% OFF",
    backgroundColor: "#FEF3C7",
    link: "/category/fruits-vegetables/seasonal"
  },
  {
    id: 2,
    title: "Grain Fest",
    subtitle: "Foodgrains",
    items: ["Rice", "Dals", "Flours"],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=300&q=80&fit=crop",
    discount: "20% OFF",
    backgroundColor: "#DCFCE7",
    link: "/category/foodgrains"
  },
  {
    id: 3,
    title: "Bakery Delights",
    subtitle: "Dairy & Bakery",
    items: ["Bread", "Cakes", "Butter"],
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=500&h=300&q=80&fit=crop",
    discount: "Buy 1 Get 1",
    backgroundColor: "#FFE4E6",
    link: "/category/dairy-bakery"
  }
];

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, getItemCount } = useCart();
  const [bannerIndex, setBannerIndex] = useState(0);
  const [seasonalIndex, setSeasonalIndex] = useState(0);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

  // Auto-slide effect for banners with pause on hover
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isBannerHovered) {
        setBannerIndex((prev) => (prev + 1) % promotionalBanners.length);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [isBannerHovered]);

  // Auto-slide effect for seasonal offers
  useEffect(() => {
    const interval = setInterval(() => {
      setSeasonalIndex((prev) => (prev + 1) % Math.ceil(seasonalOffers.length / 3));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (deal) => {
    try {
      // Ensure image path is absolute if it's not already
      const imagePath = deal.image.startsWith('http') ? deal.image : `/${deal.image.replace(/^\//, '')}`;
      
      // Create a complete product object with all necessary information
      const productToAdd = {
        id: deal.id,
        _id: deal.id,
        name: deal.title,
        description: deal.description,
        price: deal.discountedPrice,
        originalPrice: deal.originalPrice,
        image: imagePath,
        imageUrl: imagePath,
        quantity: 1,
        stock: deal.stock || 10,
        category: deal.category,
        discount: deal.discount,
        tag: deal.tag
      };

      // Check if product is already in cart
      const currentQuantity = getItemCount(deal.id);
      
      // Check stock limit
      if (currentQuantity >= productToAdd.stock) {
        toast.error(`Sorry, only ${productToAdd.stock} items available in stock!`, {
          position: 'bottom-right',
          duration: 2000,
          style: {
            background: '#FF6B6B',
            color: '#fff',
          },
        });
        return;
      }
      
      // Add to cart
      addToCart(productToAdd);
      
      toast.success(`${deal.title} added to cart!`, {
        position: 'bottom-right',
        duration: 2000,
        style: {
          background: '#2B6777',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart', {
        position: 'bottom-right',
        duration: 2000,
        style: {
          background: '#FF6B6B',
          color: '#fff',
        },
      });
    }
  };

  const filteredDeals = selectedCategory === 'all' 
    ? deals 
    : deals.filter(deal => deal.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Hero Section */}
      <div className="bg-[#2B6777] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to WayDukaan</h1>
          <p className="text-xl">Your one-stop shop for groceries and daily essentials</p>
        </div>
      </div>

      {/* Regular Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#2B6777]">Deals & Offers</h2>
          <div className="flex items-center space-x-4">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-[#2B6777] text-[#2B6777] rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#87AAAA]"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <Link to="/deals" className="text-[#2B6777] hover:text-[#87AAAA] transition text-sm">
              View All Deals →
            </Link>
          </div>
        </div>

        {/* Featured Deal */}
        {selectedCategory === 'all' && (
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-[400px] md:h-[500px]">
                  <img 
                    src="/images/grocery-bag-full-vegetables.webp"
                    alt="Monthly Grocery Pack"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-6 right-6 bg-[#FF6B6B] text-white px-6 py-3 rounded-full text-xl font-bold">
                    40% OFF
                  </span>
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="uppercase tracking-wide text-sm text-[#FF6B6B] font-semibold mb-4">
                    Featured Deal of the Day
                  </div>
                  <h3 className="text-3xl font-bold text-[#2B6777] mb-4">
                    Monthly Grocery Pack
                  </h3>
                  <p className="text-gray-600 text-lg mb-6">
                    Complete monthly grocery essentials including rice, dal, oil, spices, and more. Stock up and save big!
                  </p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-[#FF6B6B]">{formatPrice(2999)}</span>
                    <span className="text-2xl text-gray-400 line-through ml-4">{formatPrice(4999)}</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart({
                      id: 'featured-1',
                      title: 'Monthly Grocery Pack',
                      description: 'Complete monthly grocery essentials including rice, dal, oil, spices, and more.',
                      price: 2999,
                      discountedPrice: 2999,
                      originalPrice: 4999,
                      image: '/images/grocery-bag-full-vegetables.webp',
                      quantity: 1,
                      stock: 20,
                      category: 'foodgrains',
                      discount: '40% OFF',
                      tag: 'FEATURED'
                    })}
                    className="w-full bg-[#2B6777] text-white py-4 rounded-xl text-lg font-semibold hover:bg-[#87AAAA] transition duration-300"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Regular Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDeals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition duration-300">
              <div className="relative h-[250px]">
                <img 
                  src={deal.image} 
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 bg-[#FF6B6B] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {deal.tag}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#2B6777] mb-2">{deal.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{deal.description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-2xl font-bold text-[#FF6B6B]">{formatPrice(deal.discountedPrice)}</span>
                    <span className="text-lg text-gray-400 line-through ml-2">{formatPrice(deal.originalPrice)}</span>
                  </div>
                  <span className="text-[#2B6777] font-semibold">{deal.discount}</span>
                </div>

                <button 
                  onClick={() => handleAddToCart(deal)}
                  className="w-full bg-[#2B6777] text-white py-3 rounded-lg hover:bg-[#87AAAA] transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
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

      {/* Seasonal Offers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-3xl font-bold text-[#2B6777] mb-8">Seasonal Offers</h2>
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {seasonalOffers.slice(seasonalIndex * 3, seasonalIndex * 3 + 3).map((offer) => (
              <Link
                key={offer.id}
                to={offer.link}
                className="rounded-xl overflow-hidden shadow-lg group block hover:shadow-xl transition duration-300"
                style={{ backgroundColor: offer.backgroundColor }}
              >
                <div className="aspect-w-16 aspect-h-9 relative h-[250px]">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 text-[#2B6777] px-4 py-2 rounded-full font-bold">
                    {offer.discount}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                  <p className="text-gray-600 mb-4">{offer.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {offer.items.map((item, index) => (
                      <span
                        key={index}
                        className="bg-white/50 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="w-full bg-[#2B6777] text-white py-3 rounded-lg group-hover:bg-[#87AAAA] transition duration-300 text-center">
                    View Products
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Dots navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
            {Array.from({ length: Math.ceil(seasonalOffers.length / 3) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSeasonalIndex(idx)}
                className={`w-3 h-3 rounded-full border border-[#2B6777] ${idx === seasonalIndex ? 'bg-[#2B6777]' : 'bg-[#2B6777]/30'}`}
                aria-label={`Go to seasonal offer set ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 