
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ShoppingCart, Heart, User, Package } from 'lucide-react';
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
        <div className="footer-icon-container">
          <Home size={20} />
          {isActive('/products') && <div className="footer-icon-indicator"></div>}
        </div>
        <span>Início</span>
      </Link>
      <Link to="/cart" className={`footer-item relative ${isActive('/cart') ? 'active' : ''}`}>
        <div className="footer-icon-container">
          <ShoppingCart size={20} />
          {isActive('/cart') && <div className="footer-icon-indicator"></div>}
          {items.length > 0 && (
            <div className="cart-counter">{items.length}</div>
          )}
        </div>
        <span>Carrinho</span>
      </Link>
      <Link to="/orders" className={`footer-item ${isActive('/orders') ? 'active' : ''}`}>
        <div className="footer-icon-container">
          <Package size={20} />
          {isActive('/orders') && <div className="footer-icon-indicator"></div>}
        </div>
        <span>Pedidos</span>
      </Link>
      <Link to="/favorites" className={`footer-item ${isActive('/favorites') ? 'active' : ''}`}>
        <div className="footer-icon-container">
          <Heart size={20} />
          {isActive('/favorites') && <div className="footer-icon-indicator"></div>}
        </div>
        <span>Favoritos</span>
      </Link>
      <Link to="/admin" className={`footer-item ${isActive('/admin') ? 'active' : ''}`}>
        <div className="footer-icon-container">
          <User size={20} />
          {isActive('/admin') && <div className="footer-icon-indicator"></div>}
        </div>
        <span>Perfil</span>
      </Link>
    </div>
  );
};

export default NavigationFooter;
