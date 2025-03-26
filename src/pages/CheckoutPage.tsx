
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConversationalCheckout from '@/components/ui/ConversationalCheckout';
import { useCart } from '@/context/CartContext';
import { api } from '@/services/api';
import { toast } from 'sonner';

const CheckoutPage = () => {
  const { items, subtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate shipping, tax, and total
  const calculateOrderTotals = (discount = 0) => {
    const discountedSubtotal = subtotal * (1 - discount / 100);
    const shipping = discountedSubtotal > 0 ? (discountedSubtotal >= 100 ? 0 : 10) : 0;
    const tax = discountedSubtotal * 0.08; // 8% tax rate
    const total = discountedSubtotal + shipping + tax;
    
    return { discountedSubtotal, shipping, tax, total };
  };

  const handleCheckoutComplete = async (checkoutData: any) => {
    try {
      setLoading(true);
      
      const { discountedSubtotal, shipping, tax, total } = calculateOrderTotals(checkoutData.discount);
      
      // Create order object
      const order = {
        items: items.map(item => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity
        })),
        address: checkoutData.address,
        shippingMethod: checkoutData.shippingMethod,
        paymentMethod: checkoutData.paymentMethod,
        subtotal: discountedSubtotal,
        shipping,
        tax,
        discount: checkoutData.discount,
        total,
        date: new Date().toISOString()
      };
      
      // Submit order to API
      const createdOrder = await api.createOrder(order);
      
      // Clear cart and redirect to confirmation page
      clearCart();
      
      // Show success message
      toast.success('Order placed successfully!', {
        description: 'Your order has been received and is being processed.',
      });
      
      // Navigate to confirmation page with order data
      navigate('/order-confirmation', { 
        state: { 
          order: createdOrder,
          orderNumber: createdOrder.id
        } 
      });
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('There was an error placing your order. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-20 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
              <ShoppingBag size={32} className="text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              You need to add items to your cart before checking out.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="accent-button inline-flex"
            >
              <ArrowLeft size={16} className="mr-2" /> Continue Shopping
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Checkout Form */}
            <div className="lg:w-2/3">
              <ConversationalCheckout onComplete={handleCheckoutComplete} />
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="glass rounded-2xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                
                {/* Items */}
                <div className="space-y-4 max-h-72 overflow-y-auto scroll-container mb-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-start space-x-3">
                      <div className="w-16 h-16 rounded-lg bg-secondary/30 overflow-hidden shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h3 className="font-medium text-sm line-clamp-1">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          ${item.product.price.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-3 border-t border-border pt-4">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at next step</span>
                  </div>
                  <div className="border-t border-border my-3"></div>
                  <div className="flex justify-between py-1 font-semibold">
                    <span>Estimated Total</span>
                    <span className="text-lg">${(subtotal * 1.08).toFixed(2)}+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
