
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { api } from '@/services/api';
import { Product } from '@/context/CartContext';

// Import the new component files
import ProductsHeader from '@/components/products/ProductsHeader';
import CategoryTabs from '@/components/products/CategoryTabs';
import PromoHeader from '@/components/products/PromoHeader'; 
import ProductList from '@/components/products/ProductList';
import NavigationFooter from '@/components/products/NavigationFooter';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
          setSelectedCategory(categoryFilter);
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

  return (
    <div className="delivery-app min-h-screen pb-16">
      <ProductsHeader categories={categories} categoryFilter={categoryFilter} />
      
      <CategoryTabs 
        categories={categories} 
        selectedCategory={selectedCategory} 
        loading={loading} 
      />
      
      <PromoHeader categoryFilter={categoryFilter} />
      
      <ProductList 
        products={products} 
        loading={loading} 
        searchQuery={searchQuery} 
      />
      
      <NavigationFooter />
    </div>
  );
};

export default ProductsPage;
