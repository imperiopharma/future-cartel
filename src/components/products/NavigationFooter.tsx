
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Heart, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const NavigationFooter: React.FC = () => {
  const { items } = useCart();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || 
           (path === '/products' && location.pathname === '/');
  };
  
  return (
    <div className="delivery-footer">
      <Link to="/products" className={`footer-item ${isActive('/products') ? 'active' : ''}`}>
        <Home size={20} />
        <span>Início</span>
      </Link>
      <Link to="/cart" className={`footer-item relative ${isActive('/cart') ? 'active' : ''}`}>
        <ShoppingCart size={20} />
        <span>Carrinho</span>
        {items.length > 0 && (
          <div className="cart-counter">{items.length}</div>
        )}
      </Link>
      <div className="footer-item">
        <Heart size={20} />
        <span>Favoritos</span>
      </div>
      <Link to="/admin" className={`footer-item ${isActive('/admin') ? 'active' : ''}`}>
        <User size={20} />
        <span>Admin</span>
      </Link>
    </div>
  );
};

export default NavigationFooter;
