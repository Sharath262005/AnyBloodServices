import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Blood', path: '/find-blood' },
    { name: 'Donors', path: '/donors' },
    { name: 'Donate', path: '/donate' },
    { name: 'Camps', path: '/camps' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-blood-primary">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-blood-primary rounded-full flex items-center justify-center 
                            transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blood-light rounded-full pulse-animation"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-blood-primary font-display">
                LifeFlow
              </h1>
              <p className="text-xs text-neutral-text">Blood Donation Network</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-blood-primary text-white shadow-md'
                    : 'text-neutral-text hover:bg-neutral-section hover:text-blood-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              className="ml-4 px-5 py-2 bg-blood-primary text-white rounded-lg font-semibold 
                       hover:bg-blood-dark transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-blood-primary hover:bg-neutral-section rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-slide-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-blood-primary text-white'
                    : 'text-neutral-text hover:bg-neutral-section'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/admin"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 bg-blood-primary text-white rounded-lg font-semibold 
                       hover:bg-blood-dark transition-all duration-300"
            >
              Admin Login
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;