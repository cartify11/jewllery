import React, { useState } from 'react';
import { 
  Mail, 
  PhoneCall, 
  MapPin, 
  Clock, 
  Calendar, 
  Sparkles, 
  Send,
  Building,
  ShieldCheck
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ContactPage: React.FC = () => {
  const { addToast } = useShop();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Private Viewing Appointment',
    salon: 'Paris — Place Vendôme',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      addToast('Please complete all required fields.', 'info');
      return;
    }
    setSubmitted(true);
    addToast('Your inquiry has been received. Our Private Concierge will contact you within 4 hours.', 'gold');
  };

  const salons = [
    {
      city: 'Paris',
      address: '14 Place Vendôme, 75001 Paris, France',
      phone: '+33 1 42 68 55 00',
      hours: 'Monday – Saturday: 10:00 – 19:00',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600',
    },
    {
      city: 'London',
      address: '42 New Bond Street, Mayfair, London W1S 2RY, UK',
      phone: '+44 20 7493 8800',
      hours: 'Monday – Saturday: 10:00 – 18:30',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600',
    },
    {
      city: 'New York',
      address: '680 Madison Avenue, New York, NY 10065, USA',
      phone: '+1 (212) 588-4200',
      hours: 'Monday – Saturday: 10:00 – 18:00',
      image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&q=80&w=600',
    },
  ];

  return (
    <div className="bg-brand-ivory min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
            Personal Concierge Service
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-brand-black mt-2">
            Contact & Private Appointments
          </h1>
          <div className="w-16 h-[1.5px] bg-brand-gold mx-auto my-6" />
          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
            Whether you wish to reserve a private salon viewing, request a bespoke high jewellery commission, or seek guidance on diamond selection, our dedicated team is at your complete disposal.
          </p>
        </div>

        {/* Main Grid: Form & Concierge Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
          {/* Left Form (7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-brand-beige p-8 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold mx-auto">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-normal text-brand-black">
                  Inquiry Successfully Registered
                </h3>
                <p className="text-xs text-brand-grey max-w-md mx-auto leading-relaxed">
                  Thank you, {form.name}. A senior client director from our {form.salon} salon will reach out via {form.email} to confirm your appointment arrangements.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold uppercase tracking-luxury text-brand-gold hover:underline"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                <div className="border-b border-brand-beige pb-3">
                  <h2 className="font-serif text-xl font-normal text-brand-black">
                    Request Private Consultation
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Lady Katherine Vance"
                      className="w-full bg-brand-ivory border border-brand-beige px-3 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="client@residence.com"
                      className="w-full bg-brand-ivory border border-brand-beige px-3 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-gold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-brand-ivory border border-brand-beige px-3 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-gold"
                    />
                  </div>

                  <div>
                    <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                      Nature of Inquiry
                    </label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-brand-ivory border border-brand-beige px-3 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-gold"
                    >
                      <option value="Private Viewing Appointment">Private Salon Viewing Appointment</option>
                      <option value="Bespoke Commission">Bespoke High Jewellery Commission</option>
                      <option value="Diamond Sourcing Consultation">Rare Diamond & Gemstone Sourcing</option>
                      <option value="Order & Delivery Inquiry">Order Status & White-Glove Transit</option>
                      <option value="Press & VIP Relations">Press & VIP Relations</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                    Preferred Salon Location
                  </label>
                  <select
                    value={form.salon}
                    onChange={(e) => setForm({ ...form, salon: e.target.value })}
                    className="w-full bg-brand-ivory border border-brand-beige px-3 py-2.5 text-xs text-brand-black focus:outline-none focus:border-brand-gold"
                  >
                    <option value="Paris — Place Vendôme">Paris — Place Vendôme Salon</option>
                    <option value="London — New Bond Street">London — New Bond Street Salon</option>
                    <option value="New York — Madison Avenue">New York — Madison Avenue Salon</option>
                    <option value="Digital Virtual Private Suite">Digital Virtual Private Suite (Zoom/FaceTime)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-luxury text-brand-black font-medium mb-1">
                    Message or Creation of Interest *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Specify particular creations, target dates, ring sizes, or bespoke preferences..."
                    className="w-full bg-brand-ivory border border-brand-beige p-3 text-xs text-brand-black focus:outline-none focus:border-brand-gold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-black hover:bg-brand-gold hover:text-brand-black text-white py-4 text-xs uppercase tracking-luxury font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Private Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info Box (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-charcoal text-white p-8 border border-brand-gold/30 space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-medium">
                  Direct Line
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mt-1">
                  VIP Private Concierge
                </h3>
              </div>

              <div className="space-y-4 text-xs text-brand-beige">
                <div className="flex items-start gap-3">
                  <PhoneCall className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Global Telephone Hotline</span>
                    <span>+1 (800) 489-AURELIA (Complimentary)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Concierge Email</span>
                    <span>concierge@aureliajewels.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-medium block">Hours of Operation</span>
                    <span>24/7 Dedicated Client Services</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-[11px] text-brand-grey flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Strict Client Discretion & Non-Disclosure Assured</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Salons Showcase */}
        <div>
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl font-normal text-brand-black">Our Flagship Salons</h3>
            <p className="text-xs text-brand-grey mt-2">Visit us for private fittings, champagne receptions, and jewelry inspections.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {salons.map((salon) => (
              <div key={salon.city} className="bg-white border border-brand-beige overflow-hidden shadow-sm">
                <div className="h-48 overflow-hidden">
                  <img src={salon.image} alt={salon.city} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 space-y-3 text-xs">
                  <h4 className="font-serif text-xl text-brand-black">{salon.city} Salon</h4>
                  <p className="text-brand-grey flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>{salon.address}</span>
                  </p>
                  <p className="text-brand-grey flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{salon.phone}</span>
                  </p>
                  <p className="text-brand-grey flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{salon.hours}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
