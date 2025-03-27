
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/context/CartContext';
import ProductItem from './ProductItem';
import { Skeleton } from '@/components/ui/skeleton';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  searchQuery: string | null;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading, searchQuery }) => {
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

  if (loading) {
    return (
      <div className="divide-y">
        {Array(5).fill(0).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
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
    );
  }

  return (
    <div className="divide-y">
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
