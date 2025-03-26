
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Home, ShoppingCart, Heart, Menu } from 'lucide-react';
import { api } from '@/services/api';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const location = useLocation();
  const { addToCart } = useCart();

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

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    
    toast.success(`${product.name} adicionado ao carrinho`, {
      description: 'Vá para o carrinho para concluir seu pedido',
      action: {
        label: 'Ver Carrinho',
        onClick: () => window.location.href = '/cart'
      }
    });
  };

  // Muda o formato do preço para estilo brasileiro
  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  // Skeleton loader para os produtos
  const ProductSkeleton = () => (
    <div className="food-item animate-pulse">
      <div className="food-info">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
        <div className="h-5 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
    </div>
  );

  return (
    <div className="delivery-app min-h-screen pb-16">
      {/* Header com busca */}
      <div className="delivery-header">
        <div className="delivery-search">
          <Search size={20} className="text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="O que você quer comer hoje?" 
            className="w-full bg-transparent border-none outline-none text-gray-700"
          />
        </div>
        
        {/* Info da loja */}
        <div className="store-info">
          <div className="store-logo">
            <img 
              src={categories[0]?.image || "https://via.placeholder.com/40"} 
              alt="Logo" 
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold">{categoryFilter || "Future Shop"}</h1>
            <p className="text-xs text-white/80">
              {categoryFilter ? "Sem pedido mínimo" : "Sua loja digital"}
            </p>
          </div>
          <div className="ml-auto">
            <ChevronRightIcon size={24} />
          </div>
        </div>
      </div>
      
      {/* Tabs de categorias */}
      <div className="category-tabs">
        {loading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="category-tab animate-pulse">
              <div className="h-5 bg-gray-200 rounded w-20"></div>
            </div>
          ))
        ) : (
          <>
            <Link 
              to="/products" 
              className={`category-tab ${!selectedCategory ? 'active' : ''}`}
            >
              Todos
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.name}`}
                className={`category-tab ${selectedCategory === category.name ? 'active' : ''}`}
              >
                {category.name}
              </Link>
            ))}
          </>
        )}
      </div>
      
      {/* Destaque de promoções */}
      <div className="px-4 py-2">
        <div className="flex items-center space-x-2">
          <FireIcon className="text-[hsl(var(--promotion-yellow))]" size={20} />
          <span className="font-medium text-[hsl(var(--promotion-yellow))]">
            {categoryFilter ? `${categoryFilter} (PROMOÇÃO)` : "Oferta Relâmpago"}
          </span>
        </div>
      </div>
      
      {/* Lista de produtos */}
      <div className="divide-y">
        {loading ? (
          Array(5).fill(0).map((_, index) => (
            <ProductSkeleton key={index} />
          ))
        ) : products.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-medium mb-2">Nenhum produto encontrado</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery 
                ? `Não encontramos produtos com "${searchQuery}".` 
                : 'Não há produtos disponíveis nesta categoria.'}
            </p>
            <Link to="/products" className="primary-button inline-flex">
              Ver Todos os Produtos
            </Link>
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="food-item">
              <div className="food-info">
                <h3 className="food-title">{product.name}</h3>
                <p className="food-description line-clamp-2">{product.description}</p>
                <div className="flex items-center">
                  <span className="food-price">{formatPrice(product.price)}</span>
                  {product.id % 3 === 0 && (
                    <span className="old-price">{formatPrice(product.price * 1.2)}</span>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="food-image"
                  loading="lazy"
                />
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="text-xs text-[hsl(var(--delivery-blue))] font-medium"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      {/* Footer fixo */}
      <div className="delivery-footer">
        <Link to="/" className="footer-item">
          <Home size={20} />
          <span>Início</span>
        </Link>
        <Link to="/products" className="footer-item active">
          <Menu size={20} />
          <span>Cardápio</span>
        </Link>
        <Link to="/cart" className="footer-item relative">
          <ShoppingCart size={20} />
          <span>Carrinho</span>
          <div className="cart-counter absolute -top-2 -right-2 w-5 h-5">0</div>
        </Link>
        <div className="footer-item">
          <Heart size={20} />
          <span>Favoritos</span>
        </div>
      </div>
    </div>
  );
};

// Ícones extras necessários
const ChevronRightIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FireIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12 2C10.3683 4.15879 9.2373 6.0254 8.61035 7.6C7.97021 9.21732 7.79156 10.5967 8.07452 11.738C8.35747 12.8793 9.13287 13.7837 10.4007 14.451C9.44572 15.0479 8.85302 15.6859 8.62109 16.365C8.38917 17.0441 8.51437 17.7479 8.99609 18.477C9.50264 19.2518 10.3836 19.8885 11.6396 20.387C11.4374 19.0174 11.581 17.9809 12.0703 17.278C12.5585 16.5766 13.291 16.2466 14.2676 16.288C15.2443 16.3293 16.3001 16.7559 17.4355 17.568C17.6976 16.0383 17.4525 14.7231 16.7012 13.623C15.9498 12.5228 14.6847 11.5205 12.9062 10.617C13.7274 10.0388 14.2599 9.41338 14.5039 8.74C14.7479 8.06662 14.7718 7.38088 14.5762 6.6828C14.3805 5.98472 13.9811 5.29244 13.3789 4.6049C12.7778 3.91907 12.0351 3.05371 11.1504 2C11.2718 3.10214 11.1949 4.03238 10.9199 4.7947C10.6449 5.55703 10.1882 6.1711 9.54951 6.6377C8.91083 7.10431 8.11475 7.46241 7.16029 7.713C7.80225 5.8031 9.28376 3.9653 11.5947 2.1997L12 2Z" fill="currentColor"/>
  </svg>
);

export default ProductsPage;
