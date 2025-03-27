
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Package, Shield, CreditCard } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import CategoryCard from '@/components/ui/CategoryCard';
import { api } from '@/services/api';
import { Product } from '@/context/CartContext';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          api.getFeaturedProducts(),
          api.getCategories()
        ]);
        
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading homepage data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Skeleton loaders
  const ProductSkeleton = () => (
    <div className="product-card animate-pulse">
      <div className="h-64 bg-secondary/50 rounded-t-2xl"></div>
      <div className="p-4">
        <div className="h-5 bg-secondary/50 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-secondary/50 rounded w-full mb-1"></div>
        <div className="h-4 bg-secondary/50 rounded w-2/3 mb-2"></div>
        <div className="flex justify-between items-center">
          <div className="h-5 bg-secondary/50 rounded w-1/4"></div>
          <div className="h-4 bg-secondary/50 rounded-full w-1/5"></div>
        </div>
      </div>
    </div>
  );

  const CategorySkeleton = () => (
    <div className="category-card animate-pulse">
      <div className="h-40 bg-secondary/50 rounded-2xl"></div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center overflow-hidden">
          {/* Background with gradient overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-lg">
              <h5 className="text-white/80 mb-2 text-lg animate-fade-in">Welcome to Future Shop</h5>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in delay-100">
                Shopping <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Reimagined</span>
              </h1>
              <p className="text-white/80 text-lg mb-8 animate-fade-in delay-200">
                Discover curated products with our intuitive shopping experience. Bringing innovation to your everyday life.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in delay-300">
                <Link to="/products" className="accent-button">
                  Shop Now <ArrowRight size={16} />
                </Link>
                <Link to="/products?category=Electronics" className="primary-button bg-white/10">
                  Explore Electronics
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our wide selection of products across various categories
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading
                ? Array(4).fill(0).map((_, index) => <CategorySkeleton key={index} />)
                : categories.map((category) => (
                    <CategoryCard key={category.id} category={category} />
                  ))
              }
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-20 px-4 bg-secondary/30">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Handpicked selection of our best products just for you
              </p>
            </div>
            
            <div className="product-grid">
              {loading
                ? Array(4).fill(0).map((_, index) => <ProductSkeleton key={index} />)
                : featuredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
              }
            </div>
            
            <div className="text-center mt-12">
              <Link to="/products" className="primary-button inline-flex">
                View All Products <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the best shopping experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass p-6 rounded-2xl text-center animate-fade-in">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Easy Shopping</h3>
                <p className="text-muted-foreground">
                  Our intuitive interface makes shopping a breeze
                </p>
              </div>
              
              <div className="glass p-6 rounded-2xl text-center animate-fade-in delay-100">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
                <p className="text-muted-foreground">
                  Get your products delivered quickly and efficiently
                </p>
              </div>
              
              <div className="glass p-6 rounded-2xl text-center animate-fade-in delay-200">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Secure Shopping</h3>
                <p className="text-muted-foreground">
                  Your data is protected with the latest security measures
                </p>
              </div>
              
              <div className="glass p-6 rounded-2xl text-center animate-fade-in delay-300">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Multiple Payments</h3>
                <p className="text-muted-foreground">
                  Choose from various payment methods for your convenience
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 px-4 bg-primary text-primary-foreground">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="mb-8">
                Subscribe to our newsletter to receive updates on new products, special offers, and more.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-grow p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 bg-white/10 backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-primary py-3 px-6 rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
