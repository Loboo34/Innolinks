import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center">
      <img 
        src="https://raw.githubusercontent.com/stackblitz/stackblitz-images/main/innovax-logo.png" 
        alt="Innolink Softwares" 
        className="h-10"
      />
      <div className="ml-2 hidden lg:block">
        <span className="block text-sm text-gray-600">SMART TECH | SMARTER WORLD</span>
      </div>
    </div>
  );
};

export default Logo;