import { ArrowRight, Star, Heart, Award } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onOrderNowClick: () => void;
}

export default function Hero({ onOrderNowClick }: HeroProps) {
  return (
    <section id="home" className="relative pt-24 pb-12 overflow-hidden bg-coffee-bg">
      {/* Background Decorative Wavy Radial Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute bottom-1/4 -left-48 w-[500px] h-[500px] bg-coffee-accent/5 rounded-full blur-[80px]" />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-coffee-medium/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8 min-h-[75vh]">
          {/* Hero Text Content */}
          <div className="flex-1 space-y-6 md:space-y-8 text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white border border-coffee-accent/10 px-4 py-2 rounded-full shadow-sm text-xs font-semibold text-coffee-accent"
            >
              <Star className="h-3.5 w-3.5 fill-coffee-accent text-coffee-accent" />
              <span>Voted Melbourne's Finest Craft Coffee</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-6xl xl:text-7xl font-serif text-coffee-dark leading-tight"
            >
              Discover The Art <br />
              <span className="text-coffee-accent font-normal italic">Of Perfect</span> Coffee.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-coffee-text text-base md:text-lg leading-relaxed font-sans max-w-lg"
            >
              Experience the difference as we meticulously select and roast the finest beans to create a truly unforgettable cup of coffee. Join us on a journey of taste and awaken your senses, one sip at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                onClick={onOrderNowClick}
                className="bg-coffee-dark text-white pl-8 pr-2 py-2 rounded-full flex items-center justify-between gap-6 hover:bg-coffee-accent hover:shadow-lg hover:shadow-coffee-accent/20 transition-all duration-300 group cursor-pointer"
              >
                <span className="font-semibold text-sm tracking-wide">Customize & Order Now</span>
                <span className="bg-white text-coffee-dark rounded-full w-9 h-9 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  <ArrowRight className="h-4 w-4 text-coffee-dark" />
                </span>
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById("roastmaster");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="border border-coffee-dark/20 text-coffee-dark px-6 py-3 rounded-full text-sm font-semibold hover:border-coffee-accent hover:text-coffee-accent bg-transparent transition-all duration-300"
              >
                Talk to Roast Master AI
              </button>
            </motion.div>

            {/* Statistics Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 max-w-md border-t border-coffee-dark/5"
            >
              <div>
                <p className="text-2xl md:text-3xl font-bold font-serif text-coffee-dark">
                  1K<span className="text-coffee-accent">+</span>
                </p>
                <p className="text-xs text-coffee-text/80 font-medium tracking-wide uppercase">Reviews</p>
              </div>
              <div className="border-l border-coffee-dark/10 pl-6">
                <p className="text-2xl md:text-3xl font-bold font-serif text-coffee-dark">
                  3K<span className="text-coffee-accent">+</span>
                </p>
                <p className="text-xs text-coffee-text/80 font-medium tracking-wide uppercase">Best Sell</p>
              </div>
              <div className="border-l border-coffee-dark/10 pl-6">
                <p className="text-2xl md:text-3xl font-bold font-serif text-coffee-dark">
                  150K<span className="text-coffee-accent">+</span>
                </p>
                <p className="text-xs text-coffee-text/80 font-medium tracking-wide uppercase">Menu</p>
              </div>
            </motion.div>
          </div>

          {/* Hero Visual Column */}
          <div className="flex-1 relative w-full flex items-center justify-center" data-purpose="hero-visual">
            {/* Massive Decorative Typography behind image */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none choose-none select-none select-none opacity-[0.03] select-none">
              <span className="text-[120px] sm:text-[180px] lg:text-[220px] font-black font-sans leading-none text-coffee-dark tracking-tighter">
                COFFEE
              </span>
            </div>

            {/* High visual presentation of splash cup */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.9, type: "spring", bounce: 0.3 }}
              className="relative max-w-md md:max-w-lg lg:max-w-xl w-full"
            >
              {/* Spinning background light effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-radial from-coffee-accent/10 via-transparent to-transparent blur-[60px] pointer-events-none -z-10" />

              <img
                src="https://files.catbox.moe/kerna0.png"
                alt="Premium coffee splash in a elite white cup"
                referrerPolicy="no-referrer"
                className="w-full h-auto drop-shadow-3xl transform hover:scale-105 hover:rotate-2 transition-all duration-500 ease-out z-10 relative cursor-pointer"
              />

              {/* Float-out labels */}
              <div className="absolute top-[35%] -left-12 bg-white/90 backdrop-blur-md border border-coffee-accent/20 px-4 py-2 rounded-2xl shadow-md hidden sm:flex items-center gap-2.5 animate-bounce">
                <span className="bg-coffee-accent p-1.5 rounded-xl text-white"><Heart className="h-3 w-3 fill-white" /></span>
                <span className="text-xs font-bold text-coffee-dark">Extra Aromatic Crema</span>
              </div>

              <div className="absolute bottom-16 -right-12 bg-white/90 backdrop-blur-md border border-coffee-accent/20 px-4 py-2 rounded-2xl shadow-md hidden sm:flex items-center gap-2.5 animate-pulse">
                <span className="bg-coffee-medium p-1.5 rounded-xl text-white"><Award className="h-3 w-3" /></span>
                <span className="text-xs font-bold text-coffee-dark">Organic Bean Sourcing</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
