import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Building2, 
  Check, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { OrderDetails } from '../../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    formatPrice,
    clearCart,
    setPlacedOrder,
    navigateTo,
    addToast,
  } = useShop();

  // Multi-step: 1 = Shipping Address, 2 = Shipping Method, 3 = Payment
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'vault' | 'salon'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'wire' | 'klarna'>('card');

  // Card details
  const [cardData, setCardData] = useState({
    nameOnCard: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="bg-brand-ivory min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <ShoppingBag className="w-12 h-12 text-brand-gold mb-4 stroke-[1.2]" />
        <h2 className="font-serif text-2xl font-normal text-brand-black mb-2">No Items to Checkout</h2>
        <p className="text-xs text-brand-grey mb-6">Please add fine jewellery pieces to your bag before proceeding.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="bg-brand-black text-brand-gold px-6 py-3 text-xs uppercase tracking-luxury"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const shippingCost = shippingMethod === 'vault' ? 45 : 0;
  const estimatedTax = cartSubtotal * 0.05;
  const wireDiscount = paymentMethod === 'wire' ? cartSubtotal * 0.02 : 0;
  const finalTotal = Math.max(0, cartSubtotal + shippingCost + estimatedTax - wireDiscount);

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const validateAddress = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.firstName.trim()) errs.firstName = 'First name is required';
    if (!formData.lastName.trim()) errs.lastName = 'Last name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) errs.email = 'Valid email is required';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required for courier delivery';
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.state.trim()) errs.state = 'State or province is required';
    if (!formData.postalCode.trim()) errs.postalCode = 'Postal code is required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateCard = () => {
    if (paymentMethod !== 'card') return true;
    const errs: { [key: string]: string } = {};
    if (!cardData.nameOnCard.trim()) errs.nameOnCard = 'Cardholder name is required';
    if (cardData.cardNumber.replace(/\s/g, '').length < 15) errs.cardNumber = 'Valid 15-16 digit card required';
    if (!cardData.expiry.includes('/')) errs.expiry = 'MM/YY format required';
    if (cardData.cvc.length < 3) errs.cvc = 'CVC required';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextToShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      addToast('Please complete all mandatory address fields.', 'info');
    }
  };

  const handleNextToPayment = () => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCard()) {
      addToast('Please verify your payment credentials.', 'info');
      return;
    }

    setIsProcessing(true);

    // Simulate secure 256-bit tokenized banking authorization
    setTimeout(() => {
      const orderId = `AUR-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderDate = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });

      const order: OrderDetails = {
        orderId,
        date: orderDate,
        items: [...cart],
        subtotal: cartSubtotal,
        discount: wireDiscount,
        shippingMethod:
          shippingMethod === 'vault'
            ? 'Dedicated Armed Vault Courier'
            : shippingMethod === 'salon'
            ? 'Private Salon VIP Pickup'
            : 'Complimentary Insured Courier',
        shippingCost,
        tax: estimatedTax,
        total: finalTotal,
        shippingAddress: { ...formData },
        paymentMethod:
          paymentMethod === 'card'
            ? `Card ending in ${cardData.cardNumber.slice(-4) || '8842'}`
            : paymentMethod === 'wire'
            ? 'Bank Wire Transfer'
            : 'Klarna 4 Installments',
        estimatedDelivery: '3–5 business days via insured FedEx Priority',
        status: 'Confirmed',
      };

      setPlacedOrder(order);
      clearCart();
      setIsProcessing(false);
      navigateTo('order-success');
    }, 2000);
  };

  return (
    <div className="bg-brand-ivory min-h-screen py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 mb-8 border-b border-brand-beige gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-gold text-[10px] uppercase tracking-[0.3em] font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>Aurelia Private Vault Checkout</span>
            </div>
            <h1 className="font-serif text-3xl font-normal text-brand-black mt-1">
              Secure Acquisition
            </h1>
          </div>

          {/* Stepper Indicator */}
          <div className="flex items-center space-x-2 text-xs">
            <span
              className={`px-3 py-1 font-medium transition-colors ${
                step === 1 ? 'bg-brand-black text-brand-gold' : 'bg-brand-beige/50 text-brand-grey'
              }`}
            >
              1. Address
            </span>
            <span className="text-brand-grey">→</span>
            <span
              className={`px-3 py-1 font-medium transition-colors ${
                step === 2 ? 'bg-brand-black text-brand-gold' : 'bg-brand-beige/50 text-brand-grey'
              }`}
            >
              2. Transit
            </span>
            <span className="text-brand-grey">→</span>
            <span
              className={`px-3 py-1 font-medium transition-colors ${
                step === 3 ? 'bg-brand-black text-brand-gold' : 'bg-brand-beige/50 text-brand-grey'
              }`}
            >
              3. Payment
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Form Area (7 Columns) */}
          <div className="lg:col-span-7">
            {/* Step 1: Shipping Address Form */}
            {step === 1 && (
              <form onSubmit={handleNextToShipping} className="bg-white border border-brand-beige p-8 space-y-6">
                <h2 className="font-serif text-xl font-normal text-brand-black border-b border-brand-beige pb-3">
                  Customer & Delivery Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="e.g. Vivienne"
                      className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                        errors.firstName ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                      }`}
                    />
                    {errors.firstName && <p className="text-[10px] text-red-600 mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="e.g. Beaumont"
                      className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                        errors.lastName ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                      }`}
                    />
                    {errors.lastName && <p className="text-[10px] text-red-600 mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Email Address (For Vault Deeds) *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="v.beaumont@client.com"
                      className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Mobile Telephone (For Courier) *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="740 Park Avenue"
                    className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                      errors.address ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                    }`}
                  />
                  {errors.address && <p className="text-[10px] text-red-600 mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Suite / Floor
                    </label>
                    <input
                      type="text"
                      value={formData.apartment}
                      onChange={(e) => handleInputChange('apartment', e.target.value)}
                      placeholder="Penthouse A"
                      className="w-full bg-brand-ivory border border-brand-beige px-3 py-2.5 text-xs focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="New York"
                      className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                        errors.city ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                      }`}
                    />
                    {errors.city && <p className="text-[10px] text-red-600 mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      placeholder="10021"
                      className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                        errors.postalCode ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                      }`}
                    />
                    {errors.postalCode && <p className="text-[10px] text-red-600 mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                      State / Province *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="NY"
                      className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                        errors.state ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                      }`}
                    />
                    {errors.state && <p className="text-[10px] text-red-600 mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="w-full bg-brand-ivory border border-brand-beige px-3 py-2.5 text-xs focus:outline-none focus:border-brand-gold"
                    >
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="France">France</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Monaco">Monaco</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white py-4 text-xs uppercase tracking-luxury font-semibold transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>Continue to Transit Selection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Step 2: Shipping Options */}
            {step === 2 && (
              <div className="bg-white border border-brand-beige p-8 space-y-6">
                <h2 className="font-serif text-xl font-normal text-brand-black border-b border-brand-beige pb-3">
                  Select White-Glove Transit Method
                </h2>

                <div className="space-y-4">
                  <label
                    onClick={() => setShippingMethod('standard')}
                    className={`block p-5 border cursor-pointer transition-all ${
                      shippingMethod === 'standard'
                        ? 'border-brand-gold bg-brand-ivory ring-1 ring-brand-gold'
                        : 'border-brand-beige hover:border-brand-gold'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-brand-gold shrink-0" />
                        <div>
                          <span className="block text-xs uppercase tracking-luxury font-semibold text-brand-black">
                            Complimentary Insured Courier Transit
                          </span>
                          <span className="text-xs text-brand-grey">
                            Delivered in 2–4 business days with signature & adult ID check.
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-black uppercase">FREE</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setShippingMethod('vault')}
                    className={`block p-5 border cursor-pointer transition-all ${
                      shippingMethod === 'vault'
                        ? 'border-brand-gold bg-brand-ivory ring-1 ring-brand-gold'
                        : 'border-brand-beige hover:border-brand-gold'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0" />
                        <div>
                          <span className="block text-xs uppercase tracking-luxury font-semibold text-brand-black">
                            Dedicated Armed Courier Vault Transit
                          </span>
                          <span className="text-xs text-brand-grey">
                            Guaranteed next-morning dispatch directly to residence or banking vault.
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-black">{formatPrice(45)}</span>
                    </div>
                  </label>

                  <label
                    onClick={() => setShippingMethod('salon')}
                    className={`block p-5 border cursor-pointer transition-all ${
                      shippingMethod === 'salon'
                        ? 'border-brand-gold bg-brand-ivory ring-1 ring-brand-gold'
                        : 'border-brand-beige hover:border-brand-gold'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-brand-gold shrink-0" />
                        <div>
                          <span className="block text-xs uppercase tracking-luxury font-semibold text-brand-black">
                            Private VIP Salon Collection
                          </span>
                          <span className="text-xs text-brand-grey">
                            Complimentary Champagne reception at our Paris, London, or NYC Salons.
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-brand-black uppercase">COMPLIMENTARY</span>
                    </div>
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="border border-brand-black py-4 px-6 text-xs uppercase tracking-luxury font-medium"
                  >
                    Back to Address
                  </button>
                  <button
                    type="button"
                    onClick={handleNextToPayment}
                    className="flex-1 bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white py-4 text-xs uppercase tracking-luxury font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method */}
            {step === 3 && (
              <form onSubmit={handlePlaceOrder} className="bg-white border border-brand-beige p-8 space-y-6">
                <h2 className="font-serif text-xl font-normal text-brand-black border-b border-brand-beige pb-3">
                  Payment Method & Vault Verification
                </h2>

                {/* Payment Selection Tabs */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 border text-xs uppercase tracking-luxury font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-brand-black bg-brand-black text-brand-gold'
                        : 'border-brand-beige bg-white text-brand-black hover:border-brand-gold'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit / Debit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wire')}
                    className={`p-3 border text-xs uppercase tracking-luxury font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'wire'
                        ? 'border-brand-black bg-brand-black text-brand-gold'
                        : 'border-brand-beige bg-white text-brand-black hover:border-brand-gold'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Bank Wire (-2%)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('klarna')}
                    className={`p-3 border text-xs uppercase tracking-luxury font-medium flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === 'klarna'
                        ? 'border-brand-black bg-brand-black text-brand-gold'
                        : 'border-brand-beige bg-white text-brand-black hover:border-brand-gold'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Klarna Luxe</span>
                  </button>
                </div>

                {/* Credit Card Inputs */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4 pt-2">
                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        value={cardData.nameOnCard}
                        onChange={(e) => setCardData({ ...cardData, nameOnCard: e.target.value })}
                        placeholder="e.g. VIVIENNE BEAUMONT"
                        className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none uppercase ${
                          errors.nameOnCard ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                        }`}
                      />
                      {errors.nameOnCard && <p className="text-[10px] text-red-600 mt-1">{errors.nameOnCard}</p>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        placeholder="4532 •••• •••• 8842"
                        className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none font-mono ${
                          errors.cardNumber ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                        }`}
                      />
                      {errors.cardNumber && <p className="text-[10px] text-red-600 mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                          Expiration (MM/YY) *
                        </label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          placeholder="12/28"
                          className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                            errors.expiry ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                          }`}
                        />
                        {errors.expiry && <p className="text-[10px] text-red-600 mt-1">{errors.expiry}</p>}
                      </div>

                      <div>
                        <label className="block text-xs uppercase tracking-luxury text-brand-black font-medium mb-1">
                          Security CVC *
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardData.cvc}
                          onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                          placeholder="•••"
                          className={`w-full bg-brand-ivory border px-3 py-2.5 text-xs text-brand-black focus:outline-none ${
                            errors.cvc ? 'border-red-500' : 'border-brand-beige focus:border-brand-gold'
                          }`}
                        />
                        {errors.cvc && <p className="text-[10px] text-red-600 mt-1">{errors.cvc}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Wire Transfer Details */}
                {paymentMethod === 'wire' && (
                  <div className="p-4 bg-brand-ivory border border-brand-beige text-xs text-brand-grey space-y-2">
                    <p className="font-semibold text-brand-black">Private Banking Wire Instructions</p>
                    <p>
                      A 2% courtesy deduction is applied automatically. Upon placing this order, you will receive our Bank of America Private Wealth routing and IBAN coordinates. Funds must be received within 48 hours to secure vault allocation.
                    </p>
                  </div>
                )}

                {/* Klarna Luxe */}
                {paymentMethod === 'klarna' && (
                  <div className="p-4 bg-brand-ivory border border-brand-beige text-xs text-brand-grey space-y-2">
                    <p className="font-semibold text-brand-black">4 Interest-Free Luxury Installments</p>
                    <p>
                      Pay {formatPrice(finalTotal / 4)} today, followed by 3 fortnightly payments of {formatPrice(finalTotal / 4)}. Zero interest or fees.
                    </p>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="border border-brand-black py-4 px-6 text-xs uppercase tracking-luxury font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-brand-gold hover:bg-brand-gold-light text-brand-black py-4 text-xs uppercase tracking-luxury font-bold transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                        <span>Authorizing Vault Transaction...</span>
                      </span>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Place Order & Authorize Acquisition</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right: Order Summary Sidebar (5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-brand-beige p-6 sm:p-8 space-y-6 shadow-sm">
            <h2 className="font-serif text-xl font-normal text-brand-black pb-3 border-b border-brand-beige">
              Acquisition Breakdown
            </h2>

            {/* List of items */}
            <div className="divide-y divide-brand-beige/60 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-3 flex gap-3 items-center">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 object-cover border border-brand-beige shrink-0 bg-brand-ivory"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-xs font-medium text-brand-black truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-[10px] text-brand-grey">
                      Qty: {item.quantity} • {item.selectedMetal} {item.selectedSize ? `(${item.selectedSize})` : ''}
                    </p>
                  </div>
                  <span className="font-sans text-xs font-semibold text-brand-black shrink-0 whitespace-nowrap">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Financials */}
            <div className="space-y-2.5 text-xs text-brand-grey pt-4 border-t border-brand-beige">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-brand-black font-medium">{formatPrice(cartSubtotal)}</span>
              </div>

              {wireDiscount > 0 && (
                <div className="flex justify-between text-green-700 font-medium">
                  <span>Private Wire Courtesy (2%)</span>
                  <span>-{formatPrice(wireDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Armored Vault Courier</span>
                <span className="text-brand-black font-medium">
                  {shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Luxury VAT / Import</span>
                <span className="text-brand-black font-medium">{formatPrice(estimatedTax)}</span>
              </div>

              <div className="flex justify-between text-sm font-semibold text-brand-black pt-4 border-t border-brand-beige">
                <span>Grand Total</span>
                <span className="font-sans text-2xl font-semibold text-brand-black whitespace-nowrap">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <div className="p-4 bg-brand-ivory border border-brand-gold/30 text-[11px] text-brand-grey space-y-1.5">
              <div className="flex items-center gap-1.5 text-brand-black font-medium">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>Private Client Guarantee</span>
              </div>
              <p>
                Every acquisition is sealed in a tamper-evident presentation casket, accompanied by lifetime GIA/SSEF authenticity certificates and covered by maritime courier insurance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
