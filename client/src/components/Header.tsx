import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Laptop, 
  Smartphone, 
  Palette, 
  Megaphone, 
  Headphones,
  Menu,
  X,
  Code2
} from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}

const Header: React.FC<HeaderProps> = ({ onAuthClick }) => {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const serviceLinks = [
    { path: '/services/web-design', icon: Laptop, label: 'Web Design' },
    { path: '/services/mobile-apps', icon: Smartphone, label: 'Mobile App Development' },
    { path: '/services/software-dev', icon: Code2, label: 'Software Development' },
    { path: '/services/graphic-design', icon: Palette, label: 'Graphic Design' },
    { path: '/services/digital-marketing', icon: Megaphone, label: 'Digital Marketing' },
    { path: '/services/it-consultancy', icon: Headphones, label: 'IT Consultancy' },
  ];

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                isActive('/') ? 'text-[#106EBE] font-semibold' : ''
              }`}
            >
              Home
            </Link>
            
            {/* Services Dropdown */}
            <div className="relative">
              <Link
                to="/services"
                className={`flex items-center text-gray-700 hover:text-[#106EBE] transition-colors ${
                  isActive('/services') ? 'text-[#106EBE] font-semibold' : ''
                }`}
                onMouseEnter={() => setIsServicesOpen(true)}
                onMouseLeave={() => setIsServicesOpen(false)}
              >
                Services
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
              
              {isServicesOpen && (
                <div
                  className="absolute top-full left-0 w-56 bg-white shadow-lg rounded-md py-2 mt-2"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  {serviceLinks.map(({ path, icon: Icon, label }) => (
                    <Link
                      key={path}
                      to={path}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-[#0FFCBE] hover:text-gray-900 transition-colors"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/portfolio" 
              className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                isActive('/portfolio') ? 'text-[#106EBE] font-semibold' : ''
              }`}
            >
              Portfolio
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                isActive('/about') ? 'text-[#106EBE] font-semibold' : ''
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/blog" 
              className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                isActive('/blog') ? 'text-[#106EBE] font-semibold' : ''
              }`}
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                isActive('/contact') ? 'text-[#106EBE] font-semibold' : ''
              }`}
            >
              Contact
            </Link>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onAuthClick('login')}
                className="text-[#106EBE] hover:text-[#0FFCBE] font-semibold transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onAuthClick('register')}
                className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-6 py-2 rounded-full transition-colors duration-300"
              >
                Register
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                  isActive('/') ? 'text-[#106EBE] font-semibold' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <button
                className="flex items-center text-gray-700 hover:text-[#106EBE] transition-colors"
                onClick={() => setIsServicesOpen(!isServicesOpen)}
              >
                Services
                <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isServicesOpen && (
                <div className="pl-4 space-y-2">
                  {serviceLinks.map(({ path, icon: Icon, label }) => (
                    <Link
                      key={path}
                      to={path}
                      className="flex items-center text-gray-700 hover:text-[#106EBE] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {label}
                    </Link>
                  ))}
                </div>
              )}

              <Link 
                to="/portfolio" 
                className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                  isActive('/portfolio') ? 'text-[#106EBE] font-semibold' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                to="/about" 
                className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                  isActive('/about') ? 'text-[#106EBE] font-semibold' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/blog" 
                className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                  isActive('/blog') ? 'text-[#106EBE] font-semibold' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className={`text-gray-700 hover:text-[#106EBE] transition-colors ${
                  isActive('/contact') ? 'text-[#106EBE] font-semibold' : ''
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              
              {/* Auth Buttons for Mobile */}
              <div className="flex flex-col space-y-2 pt-2">
                <button
                  onClick={() => {
                    onAuthClick('login');
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-[#106EBE] hover:text-[#0FFCBE] font-semibold transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onAuthClick('register');
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 px-6 py-2 rounded-full text-center transition-colors duration-300"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;