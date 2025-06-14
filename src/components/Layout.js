import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const publicPaths = ['/login', '/register'];
  const isPublicPath = publicPaths.includes(location.pathname);

  useEffect(() => {
    if (!isAuthenticated && !isPublicPath) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, isPublicPath, navigate]);

  // Don't show layout for login and register pages
  if (publicPaths.includes(location.pathname)) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout; 