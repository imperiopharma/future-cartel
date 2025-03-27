
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NavigationFooter: React.FC = () => {
  const { items } = useCart();
  
  return (
    <div className="delivery-footer">
      <Link to="/products" className="footer-item active">
        <Home size={20} />
        <span>Início</span>
      </Link>
      <Link to="/cart" className="footer-item relative">
        <ShoppingCart size={20} />
        <span>Carrinho</span>
        {items.length > 0 && (
          <div className="cart-counter absolute -top-2 -right-2 w-5 h-5">{items.length}</div>
        )}
      </Link>
      <div className="footer-item">
        <Heart size={20} />
        <span>Favoritos</span>
      </div>
      <Link to="/admin" className="footer-item">
        <User size={20} />
        <span>Admin</span>
      </Link>
    </div>
  );
};

export default NavigationFooter;
