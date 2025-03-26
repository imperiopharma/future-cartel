
import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Package, Clock, Home, CreditCard, ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const { order, orderNumber } = location.state || {};

  // If no order data is present, redirect to home
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const formatOrderNumber = (num: number) => {
    return `#${num.toString().padStart(8, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'credit-card':
        return 'Credit Card';
      case 'pix':
        return 'PIX';
      case 'cash':
        return 'Cash on Delivery';
      default:
        return method;
    }
  };

  const getShippingMethodText = (method: string) => {
    switch (method) {
      case 'standard':
        return 'Standard Delivery (3-5 business days)';
      case 'express':
        return 'Express Delivery (1-2 business days)';
      case 'same-day':
        return 'Same Day Delivery';
      default:
        return method;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="glass p-8 rounded-2xl animate-fade-in">
            {/* Order Confirmation Header */}
            <div className="text-center mb-10">
              <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={40} />
              </div>
              <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>
            </div>

            {/* Order Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              <div className="glass p-4 rounded-xl">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Package className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Order Number</p>
                    <p className="font-semibold">{formatOrderNumber(orderNumber)}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-4 rounded-xl">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Clock className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{formatDate(order.date)}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-4 rounded-xl">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Home className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Shipping</p>
                    <p className="font-semibold">{getShippingMethodText(order.shippingMethod)}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-4 rounded-xl">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <CreditCard className="text-primary h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment</p>
                    <p className="font-semibold">{getPaymentMethodText(order.paymentMethod)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4">Order Details</h2>
              <div className="glass rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-primary/5">
                    <tr>
                      <th className="py-3 px-4 text-left">Product</th>
                      <th className="py-3 px-4 text-right">Price</th>
                      <th className="py-3 px-4 text-right">Quantity</th>
                      <th className="py-3 px-4 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {order.items.map((item: any, index: number) => (
                      <tr key={index}>
                        <td className="py-3 px-4">{item.name}</td>
                        <td className="py-3 px-4 text-right">${item.price.toFixed(2)}</td>
                        <td className="py-3 px-4 text-right">{item.quantity}</td>
                        <td className="py-3 px-4 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="glass p-6 rounded-xl">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${order.subtotal.toFixed(2)}</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({order.discount}%)</span>
                      <span>-${(order.subtotal * order.discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {order.shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      <span>${order.shipping.toFixed(2)}</span>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="text-lg">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-10">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="glass p-6 rounded-xl">
                <p>
                  {order.address.street}, {order.address.number}
                  {order.address.complement && `, ${order.address.complement}`}<br />
                  {order.address.neighborhood}, {order.address.city} - {order.address.state}<br />
                  CEP: {order.address.cep}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/" className="primary-button">
                Return to Home
              </Link>
              <Link to="/products" className="accent-button">
                Continue Shopping <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
