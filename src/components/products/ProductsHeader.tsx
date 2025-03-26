
import React from 'react';
import { Search } from 'lucide-react';

interface ProductsHeaderProps {
  categories: any[];
  categoryFilter: string | null;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ categories, categoryFilter }) => {
  // Helper component for the arrow icon
  const ChevronRightIcon = ({ size = 24 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
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
  );
};

export default ProductsHeader;
