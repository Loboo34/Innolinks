import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Github, 
  ArrowUp, 
  MessageCircle,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <Logo />
            <p className="mt-4 text-gray-400">
              Empowering businesses with innovative software solutions that drive growth and efficiency in today's digital landscape.
            </p>
            <div className="mt-6 space-y-2">
              <a href="mailto:info@innolinksoftwares.com" className="flex items-center hover:text-[#0FFCBE] transition-colors">
                <Mail className="h-5 w-5 mr-2" />
                info@innolinksoftwares.com
              </a>
              <a href="tel:+254701145320" className="flex items-center hover:text-[#0FFCBE] transition-colors">
                <Phone className="h-5 w-5 mr-2" />
                +254 701 145 320
              </a>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>Bihi Towers, Moi Avenue<br />Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-[#0FFCBE] transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-[#0FFCBE] transition-colors">About Us</a></li>
              <li><a href="/services" className="hover:text-[#0FFCBE] transition-colors">Services</a></li>
              <li><a href="/portfolio" className="hover:text-[#0FFCBE] transition-colors">Portfolio</a></li>
              <li><a href="/blog" className="hover:text-[#0FFCBE] transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-[#0FFCBE] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li><a href="/services/web-development" className="hover:text-[#0FFCBE] transition-colors">Web Development</a></li>
              <li><a href="/services/mobile-apps" className="hover:text-[#0FFCBE] transition-colors">Mobile Apps</a></li>
              <li><a href="/services/software-development" className="hover:text-[#0FFCBE] transition-colors">Software Development</a></li>
              <li><a href="/services/ui-ux-design" className="hover:text-[#0FFCBE] transition-colors">UI/UX Design</a></li>
              <li><a href="/services/digital-marketing" className="hover:text-[#0FFCBE] transition-colors">Digital Marketing</a></li>
              <li><a href="/services/it-consulting" className="hover:text-[#0FFCBE] transition-colors">IT Consulting</a></li>
            </ul>
          </div>

          {/* Legal & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 mb-6">
              <li><a href="/privacy-policy" className="hover:text-[#0FFCBE] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-conditions" className="hover:text-[#0FFCBE] transition-colors">Terms & Conditions</a></li>
              <li><a href="/refund-policy" className="hover:text-[#0FFCBE] transition-colors">Refund Policy</a></li>
              <li><a href="/cookie-policy" className="hover:text-[#0FFCBE] transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} Innolink Softwares. All rights reserved.
            </div>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0FFCBE] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0FFCBE] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0FFCBE] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0FFCBE] transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#0FFCBE] transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top & WhatsApp Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/254701145320"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors duration-300"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </a>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="bg-[#106EBE] hover:bg-[#0FFCBE] text-white hover:text-gray-900 p-3 rounded-full shadow-lg transition-all duration-300"
          title="Back to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;