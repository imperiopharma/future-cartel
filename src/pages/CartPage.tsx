
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ChevronRight, ArrowLeft, ShoppingBag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartItem from '@/components/ui/CartItem';
import { useCart } from '@/context/CartContext';

const CartPage = () => {
  const { items, subtotal, itemCount, clearCart } = useCart();

  // Calculate shipping and tax
  const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 10) : 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8 flex items-center">
            <ShoppingCart className="mr-3" /> Your Cart 
            {itemCount > 0 && <span className="text-xl ml-2">({itemCount} items)</span>}
          </h1>

          {items.length === 0 ? (
            <div className="glass p-8 rounded-2xl text-center">
              <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                <ShoppingBag size={32} className="text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold mb-3">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/products" className="accent-button inline-flex">
                Start Shopping <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 animate-fade-in">
              {/* Cart Items */}
              <div className="lg:w-2/3 glass rounded-2xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Cart Items</h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-6">
                  <Link to="/products" className="primary-button inline-flex">
                    <ArrowLeft size={16} className="mr-2" /> Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="glass rounded-2xl p-6 sticky top-24">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        <span>${shipping.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border my-3"></div>
                    <div className="flex justify-between py-1 font-semibold">
                      <span>Total</span>
                      <span className="text-lg">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="accent-button w-full"
                    >
                      Proceed to Checkout <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <h3 className="font-medium text-sm">We Accept</h3>
                    <div className="flex flex-wrap gap-2">
                      <div className="glass p-2 rounded-md">
                        <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="24" rx="4" fill="#016FD0"/>
                          <path d="M18 7H22V17H18V7Z" fill="white"/>
                          <path d="M18.5 12C18.5 10 19.5 8.4 21 7.5C20.1 6.8 19 6.5 18 6.5C15.2 6.5 13 9 13 12C13 15 15.2 17.5 18 17.5C19 17.5 20.1 17.1 21 16.5C19.5 15.6 18.5 14 18.5 12Z" fill="white"/>
                          <path d="M29 6.5C28 6.5 27 6.8 26 7.5C27.5 8.4 28.5 10 28.5 12C28.5 14 27.5 15.6 26 16.5C27 17.2 28 17.5 29 17.5C31.8 17.5 34 15 34 12C34 9 31.8 6.5 29 6.5Z" fill="white"/>
                        </svg>
                      </div>
                      <div className="glass p-2 rounded-md">
                        <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="24" rx="4" fill="#EB001B" fillOpacity="0.15"/>
                          <path d="M23 12C23 14.8 20.5 17 17.5 17C14.5 17 12 14.8 12 12C12 9.2 14.5 7 17.5 7C20.5 7 23 9.2 23 12Z" fill="#EB001B"/>
                          <path d="M28 12C28 14.8 25.5 17 22.5 17C19.5 17 17 14.8 17 12C17 9.2 19.5 7 22.5 7C25.5 7 28 9.2 28 12Z" fill="#F79E1B"/>
                        </svg>
                      </div>
                      <div className="glass p-2 rounded-md">
                        <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="24" rx="4" fill="#F6F6F6"/>
                          <path d="M14 12.2H13.2V14.3H12.3V12.2H11.5V11.4H14V12.2ZM14.4 14.3H15.3V12.9H17V12.1H15.3V11.4H17.2V14.3H18.1V11.4C18.1 10.9 17.7 10.6 17.2 10.6H14.4V14.3ZM19.1 10.6V14.3H22C22.5 14.3 22.9 14 22.9 13.5V10.6H22V13.5H21.2V10.6H20.3V13.5H19.5V10.6H19.1ZM23.8 10.6V14.3H24.7V13.1H25.1C25.6 13.1 26 12.8 26 12.3V11.4C26 10.9 25.6 10.6 25.1 10.6H23.8ZM24.7 11.4H25.1V12.3H24.7V11.4ZM28.9 14.3C29.5 14.3 29.9 14 29.9 13.5V12.2H28.1V13H29V13.5H28.9C28.4 13.5 28 13.2 28 12.7V12.2C28 11.7 28.4 11.4 28.9 11.4H29.9V10.6H28.9C28.3 10.6 27.2 10.9 27.2 12.2V12.7C27.2 14 28.3 14.3 28.9 14.3Z" fill="#3C58BF"/>
                        </svg>
                      </div>
                      <div className="glass p-2 rounded-md">
                        <svg className="h-6 w-10" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="40" height="24" rx="4" fill="#4B3163"/>
                          <path d="M15.5 9H24.5C26.2 9 27.5 10.3 27.5 12C27.5 13.7 26.2 15 24.5 15H15.5C13.8 15 12.5 13.7 12.5 12C12.5 10.3 13.8 9 15.5 9Z" fill="white" fillOpacity="0.15"/>
                          <path d="M22.5 12C22.5 13.4 21.4 14.5 20 14.5C18.6 14.5 17.5 13.4 17.5 12C17.5 10.6 18.6 9.5 20 9.5C21.4 9.5 22.5 10.6 22.5 12Z" fill="#4B3163"/>
                          <path d="M16 12.3C16.2 12.1 16.2 11.9 16 11.7C15.8 11.5 15.6 11.5 15.4 11.7C15.2 11.9 15.2 12.1 15.4 12.3C15.6 12.5 15.8 12.5 16 12.3Z" fill="white"/>
                          <path d="M24.9 11.7C24.7 11.5 24.5 11.5 24.3 11.7C24.1 11.9 24.1 12.1 24.3 12.3C24.5 12.5 24.7 12.5 24.9 12.3C25.1 12.1 25.1 11.9 24.9 11.7Z" fill="white"/>
                          <path d="M20 14.5C20.3 14.5 20.6 14.4 20.8 14.2C21.1 14.1 21 13.9 20.7 13.8C20.5 13.8 20.3 13.7 20 13.7C19.7 13.7 19.5 13.8 19.3 13.8C19 13.9 18.9 14.1 19.2 14.2C19.4 14.4 19.7 14.5 20 14.5Z" fill="white"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CartPage;
