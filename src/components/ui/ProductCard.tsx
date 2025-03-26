
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart, Product } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    
    toast.success(`${product.name} added to cart`, {
      description: 'Go to cart to complete your purchase',
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/cart'
      }
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card group animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-card-img"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Action buttons */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            onClick={handleAddToCart}
            className="p-3 rounded-full bg-white/90 text-primary hover:bg-white transition-colors duration-200"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
          </button>
          
          <button 
            className="p-3 rounded-full bg-white/90 text-primary hover:bg-white transition-colors duration-200"
            aria-label="Add to wishlist"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
      
      <div className="product-card-content">
        <h3 className="text-lg font-medium mb-1 truncate">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
            {product.category}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
