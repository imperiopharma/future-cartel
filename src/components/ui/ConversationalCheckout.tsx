
import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, CreditCard, MapPin, Truck, DollarSign } from 'lucide-react';
import { fetchAddressByCep, formatCep } from '@/services/cepService';

interface ConversationalCheckoutProps {
  onComplete: (checkoutData: any) => void;
}

interface Address {
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
}

const initialAddress: Address = {
  cep: '',
  street: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
};

const ConversationalCheckout: React.FC<ConversationalCheckoutProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState<Address>(initialAddress);
  const [shippingMethod, setShippingMethod] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cepError, setCepError] = useState<string>('');
  const [isAddressComplete, setIsAddressComplete] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Check if address is complete
  useEffect(() => {
    const requiredFields = ['cep', 'street', 'number', 'city', 'state'];
    const isComplete = requiredFields.every((field) => 
      address[field as keyof Address]?.trim() !== ''
    );
    setIsAddressComplete(isComplete);
  }, [address]);

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formattedCep = formatCep(value);
    
    setAddress({ ...address, cep: formattedCep });
    setCepError('');
    
    if (value.replace(/\D/g, '').length === 8) {
      try {
        const addressData = await fetchAddressByCep(value);
        if (addressData) {
          setAddress({
            ...address,
            cep: formattedCep,
            street: addressData.logradouro,
            complement: addressData.complemento,
            neighborhood: addressData.bairro,
            city: addressData.localidade,
            state: addressData.uf,
          });
        } else {
          setCepError('CEP not found. Please enter address manually.');
        }
      } catch (error) {
        setCepError('Error fetching address. Please enter manually.');
      }
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleShippingMethodSelect = (method: string) => {
    setShippingMethod(method);
    setStep(3);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
    setStep(4);
  };

  const handleCouponApply = () => {
    // Mock coupon validation
    if (couponCode.toUpperCase() === 'SAVE20') {
      setDiscount(20);
    } else if (couponCode.toUpperCase() === 'WELCOME10') {
      setDiscount(10);
    } else {
      setDiscount(0);
      alert('Invalid coupon code');
    }
  };

  const handleSubmit = () => {
    onComplete({
      address,
      shippingMethod,
      paymentMethod,
      discount
    });
  };

  return (
    <div className="glass p-6 rounded-2xl max-w-2xl mx-auto animate-fade-in">
      {/* Progress indicator */}
      <div className="flex justify-between mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-secondary/50 -translate-y-1/2"></div>
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
              i <= step ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            } transition-colors duration-300`}
          >
            {i < step ? <Check size={16} /> : i}
          </div>
        ))}
      </div>

      {/* Step 1: Address */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Delivery Address</h2>
            <p className="text-muted-foreground">Where should we deliver your order?</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">CEP</label>
              <input
                type="text"
                name="cep"
                value={address.cep}
                onChange={handleCepChange}
                maxLength={9}
                placeholder="12345-678"
                className="input-field"
              />
              {cepError && <p className="text-destructive text-sm mt-1">{cepError}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Street</label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleAddressChange}
                  placeholder="Street address"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Number</label>
                <input
                  type="text"
                  name="number"
                  value={address.number}
                  onChange={handleAddressChange}
                  placeholder="House number"
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Complement (Optional)</label>
              <input
                type="text"
                name="complement"
                value={address.complement}
                onChange={handleAddressChange}
                placeholder="Apt, Suite, etc."
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Neighborhood</label>
              <input
                type="text"
                name="neighborhood"
                value={address.neighborhood}
                onChange={handleAddressChange}
                placeholder="Neighborhood"
                className="input-field"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={address.city}
                  onChange={handleAddressChange}
                  placeholder="City"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={address.state}
                  onChange={handleAddressChange}
                  placeholder="State"
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => setStep(2)}
              disabled={!isAddressComplete}
              className="accent-button w-full"
            >
              Continue <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Shipping Method */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Shipping Method</h2>
            <p className="text-muted-foreground">How would you like your order to be delivered?</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handleShippingMethodSelect('standard')}
              className="w-full p-4 flex items-center glass hover:shadow-md border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Truck className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">Standard Delivery</h3>
                <p className="text-sm text-muted-foreground">3-5 business days</p>
              </div>
              <div className="font-bold">$4.99</div>
            </button>

            <button
              onClick={() => handleShippingMethodSelect('express')}
              className="w-full p-4 flex items-center glass hover:shadow-md border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Truck className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">Express Delivery</h3>
                <p className="text-sm text-muted-foreground">1-2 business days</p>
              </div>
              <div className="font-bold">$9.99</div>
            </button>

            <button
              onClick={() => handleShippingMethodSelect('same-day')}
              className="w-full p-4 flex items-center glass hover:shadow-md border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Truck className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">Same Day Delivery</h3>
                <p className="text-sm text-muted-foreground">Today (order before 2PM)</p>
              </div>
              <div className="font-bold">$14.99</div>
            </button>
          </div>

          <div className="pt-4 flex">
            <button
              onClick={() => setStep(1)}
              className="primary-button mr-2"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Payment Method */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Payment Method</h2>
            <p className="text-muted-foreground">How would you like to pay for your order?</p>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => handlePaymentMethodSelect('credit-card')}
              className="w-full p-4 flex items-center glass hover:shadow-md border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <CreditCard className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">Credit Card</h3>
                <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, etc.</p>
              </div>
            </button>

            <button
              onClick={() => handlePaymentMethodSelect('pix')}
              className="w-full p-4 flex items-center glass hover:shadow-md border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <DollarSign className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">PIX</h3>
                <p className="text-sm text-muted-foreground">Instant payment</p>
              </div>
            </button>

            <button
              onClick={() => handlePaymentMethodSelect('cash')}
              className="w-full p-4 flex items-center glass hover:shadow-md border border-transparent hover:border-primary/20 rounded-xl transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <DollarSign className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium">Cash on Delivery</h3>
                <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
              </div>
            </button>
          </div>

          <div className="pt-4 flex">
            <button
              onClick={() => setStep(2)}
              className="primary-button mr-2"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Order Summary & Confirmation */}
      {step === 4 && (
        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold">Order Review</h2>
            <p className="text-muted-foreground">Review your order details before confirming.</p>
          </div>

          <div className="space-y-4">
            <div className="glass p-4 rounded-xl">
              <h3 className="font-medium flex items-center mb-2">
                <MapPin size={18} className="mr-2" /> Delivery Address
              </h3>
              <p className="text-sm">
                {address.street}, {address.number}
                {address.complement ? `, ${address.complement}` : ''}<br />
                {address.neighborhood}, {address.city} - {address.state}<br />
                CEP: {address.cep}
              </p>
            </div>

            <div className="glass p-4 rounded-xl">
              <h3 className="font-medium flex items-center mb-2">
                <Truck size={18} className="mr-2" /> Shipping Method
              </h3>
              <p className="text-sm capitalize">
                {shippingMethod.replace('-', ' ')} Delivery
              </p>
            </div>

            <div className="glass p-4 rounded-xl">
              <h3 className="font-medium flex items-center mb-2">
                <CreditCard size={18} className="mr-2" /> Payment Method
              </h3>
              <p className="text-sm capitalize">
                {paymentMethod === 'credit-card' ? 'Credit Card' : 
                 paymentMethod === 'pix' ? 'PIX' : 'Cash on Delivery'}
              </p>
            </div>

            <div className="p-4 border-t border-b border-border">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Coupon code"
                  className="input-field mr-2"
                />
                <button 
                  onClick={handleCouponApply}
                  className="primary-button whitespace-nowrap"
                >
                  Apply
                </button>
              </div>
              {discount > 0 && (
                <div className="text-sm text-green-600 font-medium">
                  Coupon applied: {discount}% off
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="primary-button"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="accent-button"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationalCheckout;
