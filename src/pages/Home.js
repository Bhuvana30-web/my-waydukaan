import React from 'react';
import Categories from '../components/Categories';

// Sample featured products data
const featuredProducts = [
  {
    id: 1,
    name: 'Fresh Organic Apples',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6',
    description: 'Sweet and crispy organic apples'
  },
  {
    id: 2,
    name: 'Premium Coffee Beans',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e',
    description: 'Freshly roasted Arabica coffee beans'
  },
  {
    id: 3,
    name: 'Whole Grain Bread',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1598373182133-52452b9a1624',
    description: 'Freshly baked whole grain bread'
  },
  {
    id: 4,
    name: 'Organic Honey',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38',
    description: 'Pure organic honey from local farms'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-seablue-50">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
              <span className="block text-2xl sm:text-3xl md:text-4xl mb-1">Welcome to</span>
              <span className="block text-cyan-600">WayDukaan</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-sm text-gray-500 sm:text-base md:mt-4 md:text-lg md:max-w-3xl">
              Your one-stop shop for all your needs. Discover amazing products at great prices.
            </p>
            <div className="mt-4 max-w-md mx-auto sm:flex sm:justify-center md:mt-6">
              <div className="rounded-md shadow">
                <a
                  href="#featured-products"
                  className="w-full flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 md:py-3 md:text-base md:px-8"
                >
                  Shop Now
                </a>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="#categories"
                  className="w-full flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-cyan-600 bg-white hover:bg-gray-50 md:py-3 md:text-base md:px-8"
                >
                  Browse Categories
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <Categories />

      {/* Featured Products */}
      <section id="featured-products" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group relative">
                <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      <a href={`/product/${product.id}`} className="hover:underline">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</p>
                </div>
                <button 
                  className="mt-4 w-full bg-cyan-600 text-white py-2 px-4 rounded-md hover:bg-cyan-700 transition-colors"
                  onClick={() => {
                    // Add to cart functionality here
                    alert('Added to cart!');
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cyan-700 rounded-lg shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Special Summer Sale</span>
                  <span className="block">Up to 50% Off</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-cyan-200">
                  Don't miss out on our biggest sale of the season. Limited time offers on selected items.
                </p>
                <a
                  href="/sale"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-cyan-600 hover:bg-cyan-50"
                >
                  Shop the Sale
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;