import { useState, FormEvent } from "react";
import { X, Gift, Sparkles, Shield, Mail, Check } from "lucide-react";

interface VIPSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function VIPSignupModal({ isOpen, onClose }: VIPSignupModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brews, setBrews] = useState<string[]>(["Espresso Base"]);
  const [complete, setComplete] = useState(false);

  if (!isOpen) return null;

  const handleBrewToggle = (brew: string) => {
    setBrews((prev) =>
      prev.includes(brew) ? prev.filter((b) => b !== brew) : [...prev, brew]
    );
  };

  const handleVIPRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    // Simulate elite registration
    setComplete(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmer backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200" 
      />

      {/* Card Shield wrapper */}
      <div className="relative bg-white max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row max-h-[90vh] md:max-h-[640px] animate-in zoom-in-95 duration-200 z-10 text-left">
        
        {/* Left Aspect: Visual Slate banner */}
        <div className="hidden md:flex md:w-44 bg-coffee-dark p-6 flex-col justify-between text-white relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-coffee-accent/15 rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full blur-md pointer-events-none" />
          
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-coffee-accent">
              Exclusive VIP Club
            </span>
            <h4 className="font-serif text-lg font-bold leading-tight">
              The Golden Beans
            </h4>
          </div>

          <div className="space-y-4 text-[10.5px] leading-relaxed text-gray-300">
            <div className="flex gap-2">
              <span className="text-coffee-accent font-bold">1.</span>
              <span>Free birthday pour-over blend cup.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-coffee-accent font-bold">2.</span>
              <span>10% flat lifetime discount.</span>
            </div>
            <div className="flex gap-2">
              <span className="text-coffee-accent font-bold">3.</span>
              <span>Private VIP cupping events invitation.</span>
            </div>
          </div>

          <span className="text-[8.5px] text-gray-400 font-mono tracking-wide uppercase">
            Est. Melbourne 2026
          </span>
        </div>

        {/* Right Aspect: Form controls */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-coffee-accent tracking-widest">
                Patron VIP Privileges
              </span>
              <h3 className="text-xl font-serif text-coffee-dark font-bold leading-none">
                Register For Free Cups
              </h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-full hover:bg-coffee-bg text-coffee-text transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {complete ? (
            /* CONGRATULATIONS PANEL */
            <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8">
              <div className="w-14 h-14 bg-amber-50 text-coffee-accent rounded-full flex items-center justify-center border-2 border-coffee-accent/20">
                <Gift className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold font-serif text-coffee-dark">You are on the Barister's List!</h4>
                <p className="text-xs text-coffee-text leading-relaxed px-4">
                  Awesome, **{name}**! Check your email at **{email}** for your first **Buy-One-Get-One-Free voucher code** and digital patron pass.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-coffee-dark text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-coffee-accent transition-colors cursor-pointer mt-4"
              >
                Let's Brew!
              </button>
            </div>
          ) : (
            /* ACTIVE SIGNUP FORM */
            <form onSubmit={handleVIPRegister} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-coffee-dark">
                  Guest Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Amanda Parker"
                  className="w-full bg-coffee-bg px-4 py-3 rounded-xl text-xs text-coffee-dark border border-gray-100 focus:outline-none focus:ring-1 focus:ring-coffee-accent"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-coffee-dark">
                  Direct Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-coffee-bg px-4 py-3 rounded-xl text-xs text-coffee-dark border border-gray-100 focus:outline-none focus:ring-1 focus:ring-coffee-accent"
                />
              </div>

              {/* Preferences Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-coffee-dark block">
                  Favorite Brew Methods (Multi-Select)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Espresso Base", "Cold Nitro Brew", "Filter Drip", "Chemex Slow Pour"].map((b) => {
                    const selected = brews.includes(b);
                    return (
                      <button
                        type="button"
                        key={b}
                        onClick={() => handleBrewToggle(b)}
                        className={`p-2 rounded-xl text-[10.5px] border font-medium text-left transition-all flex items-center justify-between cursor-pointer ${
                          selected
                            ? "bg-coffee-accent/10 border-coffee-accent text-coffee-medium font-semibold"
                            : "bg-coffee-bg/50 border-gray-100 text-coffee-text hover:border-coffee-accent/20"
                        }`}
                      >
                        <span>{b}</span>
                        {selected && <Check className="h-3 w-3 text-coffee-accent" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-coffee-medium text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-coffee-accent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-coffee-medium/10 mt-2 hover:shadow-lg active:scale-95"
                >
                  <Sparkles className="h-4.5 w-4.5 text-white animate-bounce" />
                  <span>Secure Lifetime Member Card</span>
                </button>
              </div>

              <div className="flex items-center gap-1.5 md:gap-2 justify-center text-[10px] text-gray-400 font-medium">
                <Shield className="h-3 w-3" />
                <span>Zero spam. Revoke invitations at any time.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
