import React from 'react';

const Logo = ({ height = "200px", width = "auto", className = "" }) => {
  return (
    <img
      src="/images/logo.png"
      alt="WayDukaan Logo"
      className={className}
      style={{
        height: height,
        width: width,
        objectFit: 'contain'
      }}
    />
  );
};

export default Logo; 