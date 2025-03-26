
import React from 'react';
import { Link } from 'react-router-dom';
import { Product, useCart } from '@/context/CartContext';
import { toast } from 'sonner';

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

  return (
    <div className="food-item">
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
          className="text-xs text-[hsl(var(--delivery-blue))] font-medium"
        >
          Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
