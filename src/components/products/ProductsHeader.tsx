
import React, { useState } from 'react';
import { Search, MapPin, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProductsHeaderProps {
  categories: any[];
  categoryFilter: string | null;
}

const ProductsHeader: React.FC<ProductsHeaderProps> = ({ categories, categoryFilter }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="delivery-header">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center text-white">
          <MapPin size={18} className="mr-1" />
          <span className="text-sm font-medium">Entrega em até 45 min</span>
        </div>
        <button className="text-white text-sm flex items-center">
          <Info size={16} className="mr-1" />
          <span>Ajuda</span>
        </button>
      </div>
      
      <form onSubmit={handleSearch} className="delivery-search">
        <Search size={20} className="text-gray-400 mr-2" />
        <input 
          type="text" 
          placeholder="O que você quer comer hoje?" 
          className="w-full bg-transparent border-none outline-none text-gray-700"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      
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
          <h1 className="text-xl font-bold">{categoryFilter || "Seu Delivery"}</h1>
          <p className="text-xs text-white/80 flex items-center">
            <span className="bg-green-500 w-2 h-2 rounded-full mr-1"></span>
            {categoryFilter ? "Entrega grátis" : "Aberto agora"}
          </p>
        </div>
        <div className="ml-auto">
          <span className="bg-white/20 px-2 py-1 rounded-md text-xs font-medium">
            4.8 ★
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
