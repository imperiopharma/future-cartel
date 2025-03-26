
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    
    toast.success(`${product.name} adicionado ao carrinho`, {
      description: 'Vá para o carrinho para concluir seu pedido',
      action: {
        label: 'Ver Carrinho',
        onClick: () => window.location.href = '/cart'
      }
    });
  };

  // Formato de preço estilo brasileiro
  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  // Verificar se o produto está em promoção (para este exemplo, usamos ID múltiplo de 3)
  const isOnSale = product.id % 3 === 0;
  const originalPrice = isOnSale ? product.price * 1.2 : null;

  return (
    <div className="food-item hover:bg-gray-50 transition-colors">
      <div className="food-info">
        <h3 className="food-title">{product.name}</h3>
        <p className="food-description line-clamp-2">{product.description}</p>
        <div className="flex items-center">
          <span className="food-price">{formatPrice(product.price)}</span>
          {isOnSale && (
            <span className="old-price">{formatPrice(originalPrice!)}</span>
          )}
          {isOnSale && (
            <span className="ml-2 text-xs font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded">-20%</span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="food-image"
            loading="lazy"
          />
        </Link>
        <button 
          onClick={handleAddToCart}
          className="text-xs text-white font-medium bg-[hsl(var(--delivery-blue))] px-2 py-1 rounded-full flex items-center"
        >
          <PlusCircle size={14} className="mr-1" />
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
