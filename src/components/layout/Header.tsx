
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X, Search, ChevronDown } from 'lucide-react';
import { api } from '@/services/api';

const Header = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await api.getCategories();
      setCategories(data);
    };

    loadCategories();
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass shadow-md' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight flex items-center"
        >
          <span className="bg-gradient-to-r from-primary to-primary-foreground/70 bg-clip-text text-transparent">
            FUTURE SHOP
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-primary/80 hover:text-primary transition-colors"
          >
            Home
          </Link>
          <div className="relative group">
            <button className="flex items-center text-primary/80 hover:text-primary transition-colors">
              Categories <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            <div className="absolute left-0 mt-2 w-48 rounded-md glass shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="py-2">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.name}`}
                    className="block px-4 py-2 text-sm text-primary/90 hover:bg-primary/10 transition-colors"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link
            to="/products"
            className="text-primary/80 hover:text-primary transition-colors"
          >
            All Products
          </Link>
        </nav>

        {/* Search, Cart and Mobile Menu Toggle */}
        <div className="flex items-center space-x-4">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full hover:bg-primary/10 transition-colors"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Cart Link */}
          <Link to="/cart" className="p-2 rounded-full hover:bg-primary/10 transition-colors relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="cart-counter animate-fade-in">{itemCount}</span>
            )}
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="p-2 rounded-full hover:bg-primary/10 transition-colors md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <div
        className={`absolute top-full left-0 right-0 glass py-4 px-4 transition-all duration-300 transform ${
          isSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <form onSubmit={handleSearch} className="container mx-auto flex">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-l-lg glass focus:outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-primary-foreground p-2 rounded-r-lg"
          >
            <Search className="h-5 w-5" />
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-background z-40 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full pt-20 px-6">
          <Link
            to="/"
            className="py-4 text-lg border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <div className="py-4 text-lg border-b border-border">
            <p className="mb-2">Categories</p>
            <div className="pl-4 space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/products?category=${category.name}`}
                  className="block py-2 text-primary/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <Link
            to="/products"
            className="py-4 text-lg border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            All Products
          </Link>
          <Link
            to="/cart"
            className="py-4 text-lg border-b border-border"
            onClick={() => setIsMenuOpen(false)}
          >
            Cart ({itemCount})
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
