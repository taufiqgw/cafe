import { useState } from "react";
import { CustomBlend, MenuItem } from "../types";
import { Coffee, Layers, Flame, Sparkles, Plus, Check, HelpCircle, Loader2 } from "lucide-react";
import { TOPPING_OPTIONS } from "../data";

interface CustomizerProps {
  onAddCustomToCart: (custom: CustomBlend, price: number, name: string) => void;
}

export default function Customizer({ onAddCustomToCart }: CustomizerProps) {
  const [blend, setBlend] = useState<CustomBlend>({
    roast: "Medium",
    milk: "Oat Milk",
    sweetness: "Normal (50%)",
    toppings: [],
    size: "Standard (12oz)",
  });

  const [aiAnalysis, setAiAnalysis] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [alertAdded, setAlertAdded] = useState(false);

  // Dynamic price calculation
  const calculatePrice = () => {
    let base = 3.90;
    
    if (blend.roast === "Extra Bold") base += 0.40;
    
    if (blend.milk === "Almond Milk" || blend.milk === "Oat Milk") {
      base += 0.60;
    } else if (blend.milk === "Soy Milk") {
      base += 0.50;
    }

    base += blend.toppings.length * 0.30;

    if (blend.size === "Grande (16oz)") {
      base += 0.60;
    } else if (blend.size === "Super Grande (20oz)") {
      base += 1.10;
    }

    return parseFloat(base.toFixed(2));
  };

  const totalPrice = calculatePrice();

  // Create a beautiful generated name
  const generateBlendName = () => {
    const roastPrefix = blend.roast === "Light" ? "Gentle" : blend.roast === "Medium" ? "Classic" : blend.roast === "Dark" ? "Deep Velvet" : "Imperial Master";
    const dairyTerm = blend.milk === "No Milk (Black)" ? "Americano Cream" : blend.milk.replace(" Milk", "");
    const toppingNote = blend.toppings.length > 0 ? "with " + blend.toppings[0].split(" ")[0] : "Signature";
    return `${roastPrefix} ${dairyTerm} ${toppingNote}`;
  };

  const currentName = generateBlendName();

  // Trigger AI Roast master paring notes using our server-side API!
  const handleAnalyzeBlend = async () => {
    setAnalyzing(true);
    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customBlend: blend,
          query: `Analyze my custom crafted coffee blend named "${currentName}". Provide a quick 3-bullet tasting note review, suggest a pastry paring, and issue a score rating out of 10. Keep the response compact and highly stylized.`,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setAiAnalysis(data.text);
      } else {
        setAiAnalysis("Barista was too busy with other pours, but your combination sounds incredibly delicious and balanced!");
      }
    } catch (err) {
      console.error(err);
      setAiAnalysis("Perfect combination! This setup brings rich, warm undertones paired with a velvety smooth crema finish. Excellent with warm butter croissants.");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleToppingToggle = (topping: string) => {
    setBlend((prev) => {
      const exists = prev.toppings.includes(topping);
      const updated = exists
        ? prev.toppings.filter((t) => t !== topping)
        : [...prev.toppings, topping];
      return { ...prev, toppings: updated };
    });
  };

  const handleAddClick = () => {
    onAddCustomToCart(blend, totalPrice, currentName);
    setAlertAdded(true);
    setTimeout(() => {
      setAlertAdded(false);
    }, 3000);
  };

  return (
    <section id="customize" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-coffee-accent font-bold">The Blend Lab</span>
          <h2 className="text-3xl md:text-4xl font-serif text-coffee-dark">
            Customize Your Dream Coffee
          </h2>
          <div className="w-20 h-1 bg-coffee-accent mx-auto rounded-full" />
          <p className="text-coffee-text max-w-2xl mx-auto text-sm">
            Control every element of your perfect pour. Mix roasts, milks, sweetness, and toppings, then get an instant flavor analysis from our AI Roast Master.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch" data-purpose="customizer-container">
          {/* Left Column: Interactive Settings */}
          <div className="flex-1 space-y-8 bg-coffee-bg/40 p-6 md:p-8 rounded-3xl border border-gray-100">
            {/* Roast Level Choice */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-coffee-dark block tracking-wide uppercase">
                1. Select Roast Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["Light", "Medium", "Dark", "Extra Bold"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setBlend({ ...blend, roast: r })}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer border transition-all ${
                      blend.roast === r
                        ? "bg-coffee-dark text-white border-coffee-dark shadow-md"
                        : "bg-white text-coffee-text border-gray-100 hover:border-coffee-accent/30"
                    }`}
                  >
                    <Flame className={`h-4.5 w-4.5 ${blend.roast === r ? "text-coffee-accent" : "text-gray-400"}`} />
                    <span>{r === "Extra Bold" ? "Extra Bold (+$0.40)" : r}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Milk Choices */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-coffee-dark block tracking-wide uppercase">
                2. Steamed Milk / Dairy Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(["Whole Milk", "Almond Milk", "Oat Milk", "Soy Milk", "No Milk (Black)"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setBlend({ ...blend, milk: m })}
                    className={`p-3 rounded-2xl flex items-center gap-2 text-xs font-semibold cursor-pointer border transition-all ${
                      blend.milk === m
                        ? "bg-coffee-dark text-white border-coffee-dark shadow-sm"
                        : "bg-white text-coffee-text border-gray-100 hover:border-coffee-accent/30"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${blend.milk === m ? "bg-coffee-accent" : "bg-gray-300"}`} />
                    <span>
                      {m === "Almond Milk" || m === "Oat Milk" ? `${m} (+$0.60)` : m === "Soy Milk" ? `${m} (+$0.50)` : m}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sweetness Slider */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-coffee-dark block tracking-wide uppercase">
                3. Sweetness Level
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(["Zero", "Less Sweet (25%)", "Normal (50%)", "Extra Sweet (100%)"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setBlend({ ...blend, sweetness: s })}
                    className={`p-3 rounded-2xl text-xs font-semibold cursor-pointer border transition-all text-center ${
                      blend.sweetness === s
                        ? "bg-coffee-dark text-white border-coffee-dark shadow-sm"
                        : "bg-white text-coffee-text border-gray-100 hover:border-coffee-accent/30"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Topping Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-coffee-dark tracking-wide uppercase">
                  4. Add Toppings <span className="text-xs font-normal text-coffee-accent">(+$0.30 each)</span>
                </label>
                <span className="text-xs font-mono text-coffee-accent">{blend.toppings.length} selected</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {TOPPING_OPTIONS.map((t) => {
                  const isSelected = blend.toppings.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() => handleToppingToggle(t)}
                      className={`p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between text-left ${
                        isSelected
                          ? "bg-coffee-accent/15 text-coffee-medium border-coffee-accent"
                          : "bg-white text-coffee-text border-gray-100 hover:border-coffee-accent/20"
                      }`}
                    >
                      <span className="truncate pr-1">{t}</span>
                      {isSelected ? (
                        <Check className="h-3.5 w-3.5 text-coffee-accent shrink-0" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-coffee-dark block tracking-wide uppercase">
                5. Select Cup Size
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(["Standard (12oz)", "Grande (16oz)", "Super Grande (20oz)"] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setBlend({ ...blend, size: sz })}
                    className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-1 text-xs font-semibold cursor-pointer border transition-all ${
                      blend.size === sz
                        ? "bg-coffee-dark text-white border-coffee-dark shadow-md"
                        : "bg-white text-coffee-text border-gray-100 hover:border-coffee-accent/30"
                    }`}
                  >
                    <span className="font-serif text-[13px]">{sz.split(" ")[0]}</span>
                    <span className="text-[10px] text-coffee-accent">
                      {sz === "Grande (16oz)" ? "+$0.60" : sz === "Super Grande (20oz)" ? "+$1.10" : "Included"}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Barista Board Previews & AI feedback */}
          <div className="w-full lg:w-96 flex flex-col gap-6">
            {/* Visual Preview / Summary Receipt */}
            <div className="bg-coffee-dark rounded-3xl p-6 text-white shadow-xl relative overflow-hidden flex-1 flex flex-col justify-between">
              {/* Coffee Stains background decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-coffee-accent/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-coffee-accent font-bold">Barista Card</span>
                    <h3 className="text-xl font-serif text-white font-bold tracking-tight">{currentName}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-gray-300 block">Total Est.</span>
                    <span className="text-2xl font-bold text-coffee-accent">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Formula breakdown */}
                <div className="space-y-3.5 text-xs text-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Roasting Level:</span>
                    <span className="font-bold">{blend.roast}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Milk Substitute:</span>
                    <span className="font-bold">{blend.milk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sweetness Intensity:</span>
                    <span className="font-bold">{blend.sweetness}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cup Size:</span>
                    <span className="font-bold">{blend.size}</span>
                  </div>
                  
                  <div className="pt-2">
                    <span className="text-gray-400 block mb-1">Toppings Included:</span>
                    {blend.toppings.length === 0 ? (
                      <span className="italic text-gray-400 text-[11bp]">None selected</span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {blend.toppings.map((t) => (
                          <span key={t} className="bg-white/10 px-2 py-0.5 rounded-full text-[10px]">
                            {t.replace(" Powder", "").replace(" Syrup", "")}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Interaction Buttons */}
              <div className="mt-8 pt-4 border-t border-white/10 space-y-3">
                <button
                  type="button"
                  onClick={handleAddClick}
                  className="w-full bg-coffee-accent text-white py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-coffee-dark shadow-md transition-all duration-300 cursor-pointer active:scale-95"
                >
                  Add Custom Blend to Cart
                </button>

                {alertAdded && (
                  <div className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 py-2 px-3 rounded-xl text-center text-xs font-semibold">
                    ✨ Blend successfully added to shopping cart!
                  </div>
                )}
              </div>
            </div>

            {/* AI Roast Master Feedback Board */}
            <div className="bg-amber-50/60 border border-amber-100 rounded-3xl p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-coffee-accent/15 rounded-xl text-coffee-accent">
                    <Sparkles className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-coffee-dark uppercase tracking-widest">
                      AI Roasted Taste Profile
                    </h4>
                    <p className="text-[10px] text-coffee-text italic">Evaluate flavor notes & food parings</p>
                  </div>
                </div>

                {/* Show current analysis */}
                <div className="bg-white rounded-2xl p-4 border border-coffee-accent/5 text-xs text-coffee-dark min-h-[140px] flex flex-col justify-between">
                  {analyzing ? (
                    <div className="flex flex-col items-center justify-center py-8 space-y-2">
                      <Loader2 className="h-6 w-6 text-coffee-accent animate-spin" />
                      <span className="text-[11px] text-coffee-text italic animate-pulse">
                        Analyzing cream density & roast curves...
                      </span>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="space-y-2 whitespace-pre-line leading-relaxed pb-2">
                      {aiAnalysis}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
                      <HelpCircle className="h-7 w-7 text-gray-300" />
                      <span className="text-[11px] text-coffee-text leading-relaxed px-4">
                        Click analyze to trigger Gemini AI evaluation of your curated blend ingredients.
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleAnalyzeBlend}
                    disabled={analyzing}
                    className="w-full mt-3 bg-coffee-dark text-white py-2 rounded-xl text-[11px] font-bold hover:bg-coffee-accent transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>{aiAnalysis ? "Re-Analyze Blend" : "Analyze Taste Profile"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
