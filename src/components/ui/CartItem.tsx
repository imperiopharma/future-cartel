
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart, CartItem as CartItemType } from '@/context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncreaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex items-start space-x-4 py-4 border-b border-border animate-fade-in">
      {/* Product Image */}
      <Link 
        to={`/product/${product.id}`} 
        className="shrink-0 w-20 h-20 bg-secondary/50 rounded-lg overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link 
          to={`/product/${product.id}`}
          className="text-lg font-medium hover:text-primary/80 transition-colors line-clamp-1"
        >
          {product.name}
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-1 mb-2">
          {product.category}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-border rounded-full overflow-hidden">
            <button
              onClick={handleDecreaseQuantity}
              className="p-1 hover:bg-secondary/80 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="px-3">{quantity}</span>
            <button
              onClick={handleIncreaseQuantity}
              className="p-1 hover:bg-secondary/80 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={handleRemove}
            className="text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="text-right">
        <span className="font-semibold">${product.price.toFixed(2)}</span>
        <p className="text-muted-foreground text-sm">
          ${(product.price * quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
