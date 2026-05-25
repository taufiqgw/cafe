/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { MenuItem, CustomBlend, CartItem } from "./types";
import { MENU_ITEMS } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Customizer from "./components/Customizer";
import Menu from "./components/Menu";
import AIChat from "./components/AIChat";
import Reviews from "./components/Reviews";
import CartSidebar from "./components/CartSidebar";
import VIPSignupModal from "./components/VIPSignupModal";
import { Coffee, ShieldCheck, ThumbsUp, Sparkles, MapPin, ArrowRight } from "lucide-react";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // Auto detect scrolling active section to set correct headers
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "menu", "customize", "roastmaster", "reviews"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.item.id === item.id && !i.customization);
      if (exists) {
        return prev.map((i) =>
          i.item.id === item.id && !i.customization ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const handleAddCustomToCart = (blend: CustomBlend, price: number, name: string) => {
    // Generate a beautiful mock layout item
    const customItem: MenuItem = {
      id: `custom-${Date.now()}`,
      name: name,
      category: "signature",
      price: price,
      rating: 5.0,
      description: `Premium customized blend: ${blend.roast} Roast, ${blend.milk}, with sweet ${blend.sweetness} and premium toppings.`,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4j1BZxM8PYG8XBZDC9LlzHYTLCANKHv4F1eQiShOC9LT8YqwkHjpceDzHeYcwnHBa8oZdH3eGG3uAMj3B3c67BXWrK5z4k8RRQoXcVgQp-3bJzLhBtrdl8oE1KMW_jeVzC3pAphAb9j_fyVyH6eOVtLHjJlNoOint_TxHoWifrNkx0kWgxCxAlMm4nMGLxfSsLKZuC2OyysKMtKb_G-6TbvYkX--QR0Jfy-sOqBDniu9Myf6-2f7_1qgdPxlzVoJBp_XJ7FL77c",
      flavorNotes: [blend.roast, blend.sweetness.split(" ")[0]],
      ingredients: [blend.roast, blend.milk, ...blend.toppings]
    };

    setCart((prev) => {
      // Always treat custom blends as distinct entries
      return [...prev, { item: customItem, quantity: 1, customization: blend }];
    });
  };

  const handleUpdateCartQuantity = (id: string, customName: string | undefined, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => {
          const matches = customName 
            ? i.item.name === customName && i.item.id === id 
            : i.item.id === id && !i.customization;
          if (matches) {
            return { ...i, quantity: i.quantity + delta };
          }
          return i;
        })
        .filter((i) => i.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string, customName: string | undefined) => {
    setCart((prev) =>
      prev.filter((i) => {
        const matches = customName 
          ? i.item.name === customName && i.item.id === id 
          : i.item.id === id && !i.customization;
        return !matches;
      })
    );
  };

  return (
    <div className="min-h-screen bg-coffee-bg text-coffee-dark font-sans flex flex-col justify-between selection:bg-coffee-accent/20">
      
      {/* 1. Nav header */}
      <Header
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        openSignup={() => setIsSignupOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 2. Main stream */}
      <main className="flex-1 w-full space-y-0">
        
        {/* Hero Landing */}
        <Hero onOrderNowClick={() => {
          const customizeSec = document.getElementById("customize");
          if (customizeSec) customizeSec.scrollIntoView({ behavior: "smooth" });
        }} />

        {/* Dynamic Services Section */}
        <section id="services" className="py-24 bg-white relative">
          <div className="absolute inset-x-0 -top-12 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
          
          <div className="container mx-auto px-4 md:px-6">
            
            {/* Title */}
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs uppercase tracking-widest text-coffee-accent font-bold">What We Do</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-coffee-dark uppercase tracking-widest leading-none">
                Our Delicious Services
              </h2>
              <div className="w-20 h-1 bg-coffee-accent mx-auto rounded-full" />
              <p className="text-coffee-text max-w-xl mx-auto text-xs leading-relaxed">
                We offer a carefully curated collection that showcases the distinct characteristics of beans sourced from specific regions.
              </p>
            </div>

            {/* Visual Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Coffee Types */}
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl hover:border-coffee-accent/15 transition-all duration-300 text-center flex flex-col items-center justify-between group">
                <div className="w-20 h-20 bg-amber-50/40 rounded-3xl flex items-center justify-center mb-6 text-coffee-accent group-hover:scale-110 transition-transform">
                  <Coffee className="h-9 w-9" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-bold font-serif text-coffee-dark">
                    Coffee Types
                  </h3>
                  <p className="text-coffee-text text-xs leading-relaxed">
                    We offer a tantalizing variety of coffee types to cater to your unique preferences. From robust dark espressos to creamy silk microfours.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById("menu");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 text-coffee-accent font-bold text-xs flex items-center gap-1.5 hover:gap-3 transition-all cursor-pointer"
                >
                  <span>Explore Selections</span>
                  <span>→</span>
                </button>
              </div>

              {/* Card 2: Different Beans */}
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl hover:border-coffee-accent/15 transition-all duration-300 text-center flex flex-col items-center justify-between group">
                <div className="w-20 h-20 bg-amber-50/40 rounded-3xl flex items-center justify-center mb-6 text-coffee-accent group-hover:scale-110 transition-transform">
                  <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707-.707m12.728 0l-.707.707M6.343 6.343l-.707-.707m1.286 1.286A9 9 0 1118 12h-3a3 3 0 00-3-3V6a6 6 0 00-6 6v3" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-bold font-serif text-coffee-dark">
                    Different Beans
                  </h3>
                  <p className="text-coffee-text text-xs leading-relaxed">
                    We take pride in sourcing and roasting the finest quality beans from premium sustainable growers around the globe.
                  </p>
                </div>
                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="mt-6 text-coffee-accent font-bold text-xs flex items-center gap-1.5 hover:gap-3 transition-all cursor-pointer"
                >
                  <span>Request Single-Origins</span>
                  <span>→</span>
                </button>
              </div>

              {/* Card 3: Cold Coffee */}
              <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl hover:border-coffee-accent/15 transition-all duration-300 text-center flex flex-col items-center justify-between group">
                <div className="w-20 h-20 bg-amber-50/40 rounded-3xl flex items-center justify-center mb-6 text-coffee-accent group-hover:scale-110 transition-transform">
                  <svg className="h-9 w-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-bold font-serif text-coffee-dark">
                    Cold Coffee
                  </h3>
                  <p className="text-coffee-text text-xs leading-relaxed">
                    We offer a premium, slow-steeped, and nitrogen-charged cold brew menu to keep you refreshed and fully energized on balmy days.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    const el = document.getElementById("menu");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-6 text-coffee-accent font-bold text-xs flex items-center gap-1.5 hover:gap-3 transition-all cursor-pointer"
                >
                  <span>View Cold Menu</span>
                  <span>→</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* Dynamic Menu Module */}
        <Menu onAddToCart={handleAddToCart} />

        {/* Deep Cup Customizer Module */}
        <Customizer onAddCustomToCart={handleAddCustomToCart} />

        {/* AI Barista Roast Master Chat */}
        <AIChat />

        {/* Guest Review Sub-forum */}
        <Reviews />

        {/* Bottom Banner Decorative Coffee Beans heap exactly replicating the image representation */}
        <section className="w-full relative overflow-hidden h-72 md:h-80 flex flex-col justify-end">
          {/* Coffee beans hotlink background decoration */}
          <div 
            className="absolute inset-0 bg-repeat-x bg-bottom z-0" 
            style={{ 
              backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtRzT8Gq3su_sT6j-OMskWjwZ5rVngf-WAh8aFQmQQoecjp9ow0YlKDpcAi38SOG0EQA09n9h96D4qGXfGCc09vD1CNFuIZ7gwx2qFapKie2cwrQXbM4fidPoKh8sTIBSt809K-_IXAaXcdUJnEx0LBP_gXY7ulqR6WAgoWleNpcZ0R8FlXgWBxGJgcmnZzrldWD5z_GXKnf8qYpufw1a50pZUQc9vx8Z_jn6G6IDJnCD7jbOURSGClKRU-beXiugjGYy1r1WyKro")',
              backgroundSize: "contain",
              backgroundPosition: "bottom"
            }} 
          />

          {/* Luxury Banner text layered directly over the background */}
          <div className="relative z-10 w-full bg-white/90 backdrop-blur-md py-14 shadow-lg border-t border-gray-100 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif uppercase text-coffee-dark tracking-tighter max-w-4xl px-4 font-bold md:leading-tight">
              Enjoy A New Blend Of Coffee Style
            </h2>
            <p className="text-xs text-coffee-accent font-mono tracking-widest mt-2 uppercase font-bold">
              • Melbourne • Chicago • London • Tokyo •
            </p>
          </div>
        </section>

      </main>

      {/* 3. Footer Section */}
      <footer className="bg-white py-12 border-t border-gray-100 relative z-10 text-left">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-150">
            {/* Meta */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-coffee-dark rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  </svg>
                </div>
                <span className="text-base font-serif font-bold text-coffee-dark uppercase tracking-wide">
                  The Coffee Cup
                </span>
              </div>
              <p className="text-xs text-coffee-text leading-relaxed max-w-sm">
                Dedicated to pulling pristine single-origin espresso shots, roasting rich sustainable coffee cherries, and leveraging Gemini intelligence to customize formulas for true coffee purists.
              </p>
            </div>

            {/* Links */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-coffee-dark uppercase tracking-widest">
                Our Cafe Hours
              </h4>
              <ul className="space-y-2 text-xs text-coffee-text">
                <li className="flex justify-between max-w-[200px]">
                  <span>Mon - Fri:</span>
                  <span className="font-bold text-coffee-dark">6:00 AM - 5:00 PM</span>
                </li>
                <li className="flex justify-between max-w-[200px]">
                  <span>Sat - Sun:</span>
                  <span className="font-bold text-coffee-dark">7:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>

            {/* Address */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-coffee-dark uppercase tracking-widest">
                Melbourne Flagship
              </h4>
              <div className="text-xs text-coffee-text space-y-2">
                <p className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-coffee-accent" />
                  <span>244 Lygon Street, Carlton VIC, 3053</span>
                </p>
                <p className="pl-5 text-[10px] text-gray-400">
                  contact@thecoffeecup.cc
                </p>
              </div>
            </div>
          </div>

          {/* Fine copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-4">
            <span>© 2026 The Coffee Cup. Crafted for Melbourne premium cafe purists.</span>
            <div className="flex gap-6">
              <button onClick={() => setIsSignupOpen(true)} className="hover:text-coffee-accent underline cursor-pointer">VIP Terms</button>
              <a href="#" className="hover:text-coffee-accent">Sitemap</a>
              <a href="#" className="hover:text-coffee-accent">Barista Portal</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. Sliding Shopping Cart Drawer */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCart([])}
      />

      {/* 5. VIP Signup modal */}
      <VIPSignupModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
      />

    </div>
  );
}
