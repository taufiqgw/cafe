import { useState } from "react";
import { MenuItem } from "../types";
import { MENU_ITEMS } from "../data";
import { Star, ShoppingBag, Leaf, HelpCircle, Check, Info } from "lucide-react";

interface MenuProps {
  onAddToCart: (item: MenuItem) => void;
}

export default function Menu({ onAddToCart }: MenuProps) {
  const [activeTab, setActiveTab] = useState<"all" | "hot" | "cold" | "signature">("all");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredItems = MENU_ITEMS.filter((item) => {
    if (activeTab === "all") return true;
    return item.category === activeTab;
  });

  const handleAddClick = (item: MenuItem) => {
    onAddToCart(item);
    setJustAddedId(item.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 2000);
  };

  return (
    <section id="menu" className="py-20 bg-coffee-bg">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-xs uppercase tracking-widest text-coffee-accent font-bold">The Cafe Board</span>
          <h2 className="text-3xl md:text-4xl font-serif text-coffee-dark uppercase tracking-wide">
            Our Elite Brew Board
          </h2>
          <div className="w-20 h-1 bg-coffee-accent mx-auto rounded-full" />
          <p className="text-coffee-text max-w-2xl mx-auto text-sm">
            Handcrafted with organic, single-origin house beans pulled by certified expert baristas. Discover are standard selections or seasonal treats.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex justify-center gap-2 md:gap-4 mb-12 flex-wrap">
          {(["all", "hot", "cold", "signature"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-coffee-dark text-white shadow-md shadow-coffee-dark/20"
                  : "bg-white text-coffee-text/80 hover:text-coffee-accent hover:bg-white/80"
              }`}
            >
              {tab === "all" ? "All Board" : tab === "hot" ? "Hot Infusions" : tab === "cold" ? "Iced Brews" : "Signature Fusions"}
            </button>
          ))}
        </div>

        {/* Board Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-gray-100 hover:border-coffee-accent/20 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Product Header / Image */}
              <div className="relative pt-[85%] overflow-hidden bg-amber-50/20">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500 ease-out"
                />
                
                {/* Badges overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                  <span className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-coffee-accent shadow-sm uppercase tracking-wide">
                    {item.category}
                  </span>
                  
                  <div className="flex items-center gap-1 bg-coffee-dark/90 backdrop-blur-md text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-sm">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="font-serif text-[15px] font-bold text-coffee-dark line-clamp-1 group-hover:text-coffee-accent transition-colors">
                      {item.name}
                    </h3>
                    <span className="text-sm font-bold text-coffee-medium font-mono">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-coffee-text text-xs leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Flavor Tag Chips */}
                <div className="flex flex-wrap gap-1">
                  {item.flavorNotes.map((note) => (
                    <span
                      key={note}
                      className="bg-coffee-bg text-coffee-text text-[9px] px-2 py-0.5 rounded-full font-medium"
                    >
                      {note}
                    </span>
                  ))}
                </div>

                {/* Operations */}
                <div className="pt-2 border-t border-gray-50 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="p-2.5 rounded-full bg-coffee-bg hover:bg-coffee-accent/10 hover:text-coffee-accent text-coffee-text cursor-pointer transition-colors"
                    title="View Ingredients"
                  >
                    <Info className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() => handleAddClick(item)}
                    className={`flex-1 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
                      justAddedId === item.id
                        ? "bg-emerald-500 text-white"
                        : "bg-coffee-dark text-white hover:bg-coffee-accent hover:shadow-md hover:shadow-coffee-accent/15"
                    }`}
                  >
                    {justAddedId === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>Add To order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal Dialog */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="relative pt-[60%] bg-coffee-bg/40 flex items-center justify-center">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-contain p-6"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 bg-coffee-dark text-white p-1.5 rounded-full hover:bg-coffee-accent transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-left">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold text-coffee-accent uppercase tracking-widest block mb-1">
                      {selectedItem.category} brew
                    </span>
                    <h3 className="text-xl font-serif text-coffee-dark font-bold">
                      {selectedItem.name}
                    </h3>
                  </div>
                  <span className="text-lg font-bold font-mono text-coffee-medium">
                    ${selectedItem.price.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-coffee-text leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Sub panels */}
                <div className="space-y-3 pt-3 border-t border-gray-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-coffee-dark uppercase tracking-widest block">
                      Barista Flavor Profile:
                    </span>
                    <div className="flex gap-1.5 flex-wrap">
                      {selectedItem.flavorNotes.map((fn) => (
                        <span key={fn} className="bg-coffee-accent/10 text-coffee-medium text-[10px] px-2.5 py-0.5 rounded-md font-semibold">
                          {fn}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-coffee-dark uppercase tracking-widest block">
                      Core Ingredients:
                    </span>
                    <p className="text-[11px] text-coffee-text italic">
                      {selectedItem.ingredients.join(", ")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddClick(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="w-full mt-4 bg-coffee-dark text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-coffee-accent transition-colors"
                >
                  Add To Order • ${selectedItem.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
