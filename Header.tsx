import { ShoppingCart, Search, Menu as MenuIcon, X, Loader2 } from "lucide-react";
import { useState } from "react";
import { CartItem } from "../types";

interface HeaderProps {
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  openSignup: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Header({
  cart,
  setIsCartOpen,
  openSignup,
  activeSection,
  setActiveSection,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Menu", id: "menu" },
    { name: "Customize Blend", id: "customize" },
    { name: "Roast Master AI", id: "roastmaster" },
    { name: "Reviews", id: "reviews" },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <nav className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo Section */}
        <div 
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 cursor-pointer group"
          data-purpose="logo-container"
        >
          <div className="w-10 h-10 bg-coffee-medium rounded-full flex items-center justify-center group-hover:bg-coffee-accent transition-colors">
            <svg 
              className="h-6 w-6 text-white transform group-hover:rotate-12 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M13 10V3L4 14h7v7l9-11h-7z" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2"
              />
            </svg>
          </div>
          <span className="text-xl font-bold font-serif text-coffee-dark tracking-tight">
            The Coffee Cup
          </span>
        </div>

        {/* Navigation Links - Desktop */}
        <ul className="hidden lg:flex items-center gap-8 font-medium text-xs uppercase tracking-wider text-coffee-dark/80">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavClick(link.id)}
                className={`relative py-1 font-semibold hover:text-coffee-accent transition-colors ${
                  activeSection === link.id ? "text-coffee-accent font-bold" : ""
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-coffee-accent rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Action Icons & Button */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Cart Icon */}
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-coffee-dark hover:text-coffee-accent hover:bg-coffee-bg rounded-full transition-all duration-300"
            title="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {totalCartCount > 0 && (
              <span className="absolute top-0 right-0 bg-coffee-accent text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Quick VIP Signup Button */}
          <button 
            onClick={openSignup}
            className="hidden md:block bg-coffee-dark text-white px-6 py-2 rounded-full text-xs font-semibold hover:bg-coffee-accent hover:shadow-md transition-all duration-300 active:scale-95"
          >
            Get VIP Offers
          </button>

          {/* Mobile Menu Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-coffee-dark hover:text-coffee-accent rounded-full hover:bg-coffee-bg transition-colors"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4 shadow-inner">
          <ul className="space-y-3 font-medium text-sm text-coffee-dark">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className={`block w-full text-left py-2 hover:text-coffee-accent transition-colors ${
                    activeSection === link.id ? "text-coffee-accent font-bold" : ""
                  }`}
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <button 
            onClick={() => {
              openSignup();
              setMobileMenuOpen(false);
            }}
            className="w-full bg-coffee-dark text-white py-3 rounded-full text-xs font-semibold hover:bg-coffee-accent transition-all duration-300"
          >
            Join the VIP Club (Free Coffee)
          </button>
        </div>
      )}
    </header>
  );
}
