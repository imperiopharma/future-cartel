
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Grid, List, Filter, X, ArrowUpDown, ChevronDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { api } from '@/services/api';
import { Product } from '@/context/CartContext';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('');
  const location = useLocation();

  // Get query params from URL
  const queryParams = new URLSearchParams(location.search);
  const categoryFilter = queryParams.get('category');
  const searchQuery = queryParams.get('search');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        
        let productsData;
        
        if (categoryFilter) {
          productsData = await api.getProductsByCategory(categoryFilter);
        } else {
          productsData = await api.getProducts();
        }
        
        // Filter by search query if provided
        if (searchQuery) {
          productsData = productsData.filter(product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        setProducts(productsData);
        
        // Load categories
        const categoriesData = await api.getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, [categoryFilter, searchQuery]);

  // Sort products
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Skeleton loader
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="container mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              {categoryFilter || searchQuery 
                ? `${categoryFilter || 'Search results for "' + searchQuery + '"'}`
                : 'All Products'}
            </h1>
            {searchQuery && (
              <p className="text-muted-foreground mt-2">
                Showing results for: "{searchQuery}"
              </p>
            )}
          </div>

          {/* Filters and Sort Controls */}
          <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  filterOpen ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                }`}
              >
                {filterOpen ? <X size={18} /> : <Filter size={18} />}
                <span>Filters</span>
              </button>
              
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => {
                    const menu = document.getElementById('sort-menu');
                    if (menu) menu.classList.toggle('hidden');
                  }}
                >
                  <ArrowUpDown size={18} />
                  <span>Sort</span>
                  <ChevronDown size={16} />
                </button>
                
                <div
                  id="sort-menu"
                  className="hidden absolute z-10 mt-2 w-56 glass shadow-lg rounded-lg py-1"
                >
                  <button
                    onClick={() => {
                      setSortOption('price-asc');
                      document.getElementById('sort-menu')?.classList.add('hidden');
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-secondary/50 transition-colors"
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => {
                      setSortOption('price-desc');
                      document.getElementById('sort-menu')?.classList.add('hidden');
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-secondary/50 transition-colors"
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => {
                      setSortOption('name-asc');
                      document.getElementById('sort-menu')?.classList.add('hidden');
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-secondary/50 transition-colors"
                  >
                    Name: A to Z
                  </button>
                  <button
                    onClick={() => {
                      setSortOption('name-desc');
                      document.getElementById('sort-menu')?.classList.add('hidden');
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-secondary/50 transition-colors"
                  >
                    Name: Z to A
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>

          {/* Filter Sidebar */}
          {filterOpen && (
            <div className="glass p-4 rounded-lg mb-6 animate-fade-in">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                <Link
                  to="/products"
                  className={`block py-1 px-2 rounded-lg transition-colors ${
                    !categoryFilter ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                  }`}
                >
                  All Products
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={`/products?category=${category.name}`}
                    className={`block py-1 px-2 rounded-lg transition-colors ${
                      categoryFilter === category.name ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                    }`}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              
              {/* Could add more filters here (price range, etc.) */}
            </div>
          )}

          {/* Products Grid/List */}
          {loading ? (
            <div className={viewMode === 'grid' ? 'product-grid' : 'space-y-4'}>
              {Array(8).fill(0).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery 
                  ? `We couldn't find any products matching "${searchQuery}".` 
                  : 'No products available in this category.'}
              </p>
              <Link to="/products" className="primary-button inline-flex">
                View All Products
              </Link>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'product-grid' : 'space-y-4'}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductsPage;
