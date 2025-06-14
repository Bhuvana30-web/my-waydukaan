import React from 'react';
import { Link } from 'react-router-dom';

const topBrands = [
  'ITC',
  'Dabur',
  'Britania',
  'Hindustan Unilever',
  'Marico',
  'Parle',
  'TATA Consumer Goods',
  'Godrej',
  'Wipro',
  'Coca Cola',
  'Pepsi',
];

const topProducts = [
  'Aashirvaad Atta',
  'Sunfeast Biscuits',
  'Dabur Honey',
  'Britania Bread',
  'Brooke Bond Tea',
  'Saffola Oil',
  'Parle-G Biscuits',
  'Tata Salt',
  'Coca Cola',
  'Pepsi',
];

const Footer = ({ showBrands = false, showCategories = false, showQuickLinks = false, showHelp = false }) => (
  <footer className="bg-[#2B6777] text-white mt-16">
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      {showBrands && (
        <div>
          <h3 className="text-lg font-bold mb-4">Top Brands</h3>
          <ul className="space-y-2">
            {topBrands.map((brand) => (
              <li key={brand} className="font-semibold">{brand}</li>
            ))}
          </ul>
        </div>
      )}
      {showCategories && (
        <div>
          <h3 className="text-lg font-bold mb-4">Top Categories</h3>
          <ul className="space-y-2">
            <li>Fruits & Vegetables</li>
            <li>Foodgrains, Oil & Masala</li>
            <li>Dairy & Bakery</li>
            <li>Beverages</li>
            <li>Snacks & Branded Foods</li>
            <li>Personal Care</li>
            <li>Household</li>
          </ul>
        </div>
      )}
      {showQuickLinks && (
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/categories" className="hover:underline">Categories</Link></li>
            <li><Link to="/deals" className="hover:underline">Deals</Link></li>
            <li><Link to="/profile" className="hover:underline">My Profile</Link></li>
            <li><Link to="/cart" className="hover:underline">Cart</Link></li>
          </ul>
        </div>
      )}
      {showHelp && (
        <div>
          <h3 className="text-lg font-bold mb-4">We are here to help you</h3>
          <p className="mb-2">Helpline: <a href="tel:18001234567" className="underline">1800-123-4567</a></p>
          <ul className="space-y-2">
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
      )}
    </div>
    <div className="text-center text-xs text-[#B2DFDB] py-4 border-t border-[#B2DFDB]/20">
      &copy; {new Date().getFullYear()} WayDukaan. All rights reserved.
    </div>
  </footer>
);

export default Footer; 