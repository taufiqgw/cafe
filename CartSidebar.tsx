import { CartItem } from "../types";
import { X, Trash2, Plus, Minus, Coffee, ShoppingBag, Truck, Gift, CheckCircle } from "lucide-react";
import { useState } from "react";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, customName: string | undefined, delta: number) => void;
  onRemoveItem: (id: string, customName: string | undefined) => void;
  onClearCart: () => void;
}

export default function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartSidebarProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery">("pickup");
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  if (!isOpen) return null;

  // Calculators
  const itemsSubtotal = cart.reduce((acc, curr) => acc + (curr.item.price * curr.quantity), 0);
  const tax = itemsSubtotal * 0.10; // 10% tax
  const deliveryFee = deliveryMethod === "delivery" ? 3.50 : 0.00;
  const grandTotal = itemsSubtotal > 0 ? itemsSubtotal + tax + deliveryFee : 0;

  const handleCheckoutSubmit = () => {
    setCheckingOut(true);
    // Simulate barista brewing process
    setTimeout(() => {
      setCheckingOut(false);
      setCheckoutComplete(true);
    }, 2500);
  };

  const handleFinishAndRest = () => {
    onClearCart();
    setCheckoutComplete(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Background Dimmer Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/55 backdrop-blur-xs animate-in fade-in duration-200" 
      />

      {/* Cart Drawer Shell */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 z-10">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="text-coffee-accent h-5 w-5" />
            <h3 className="font-serif text-lg font-bold text-coffee-dark">
              Your Brew Mug
            </h3>
            <span className="text-[10px] bg-coffee-bg text-coffee-medium font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((acc, curr) => acc + curr.quantity, 0)} items
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-coffee-bg text-coffee-text cursor-pointer transition-colors"
          >
            <X className="h-5.5 w-5.5" />
          </button>
        </div>

        {checkoutComplete ? (
          /* CONGRATULATIONS / ORDER PROGRESS BAR PANEL */
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border-2 border-emerald-300 animate-pulse">
              <CheckCircle className="h-9 w-9" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-serif text-coffee-dark font-bold">
                Order Sent To Barista!
              </h4>
              <p className="text-xs text-coffee-text leading-relaxed px-4">
                We have received your brew formula and single-origin beans are being milled right now! Your estimated pickup/delivery arrival time is <span className="font-bold text-coffee-accent">14 minutes</span>.
              </p>
            </div>

            {/* Brewing tracker animation */}
            <div className="w-full bg-coffee-bg p-4 rounded-2xl border border-gray-100 text-left space-y-4">
              <span className="text-[10px] font-bold text-coffee-accent uppercase tracking-widest block">
                Brewhouse Stage Status:
              </span>
              <div className="space-y-2.5 text-xs text-coffee-dark">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                  <span className="font-semibold">Milling Single-Origin Beans</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-40">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0" />
                  <span>Steaming Silk Microfoam (85°C)</span>
                </div>
                <div className="flex items-center gap-2.5 opacity-40">
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0" />
                  <span>Candel Caramel Agave Drizzle pour</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleFinishAndRest}
              className="w-full bg-coffee-dark text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-coffee-accent cursor-pointer transition-colors"
            >
              Back to Main Bar
            </button>
          </div>
        ) : cart.length === 0 ? (
          /* EMPTY CART VIEW */
          <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
            <Coffee className="h-14 w-14 text-gray-200 stroke-[1.5]" />
            <div className="space-y-1">
              <h4 className="font-serif text-[15px] font-bold text-coffee-dark">Your mug is empty</h4>
              <p className="text-xs text-coffee-text px-6 leading-relaxed">
                Add standard artisanal brews from the Board or customize a custom blend using our Neural Lab customizer.
              </p>
            </div>
          </div>
        ) : (
          /* DYNAMIC CART CHECKOUT FORM */
          <>
            {/* Scrollable Cart List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.map((item, index) => {
                const isCustom = !!item.customization;
                const displayName = isCustom ? item.item.name : item.item.name;
                
                return (
                  <div 
                    key={`${item.item.id}-${index}`}
                    className="flex justify-between gap-4 p-4 rounded-2xl border border-gray-100 bg-coffee-bg/25 animate-in fade-in duration-300"
                  >
                    {/* Visual */}
                    <div className="w-12 h-12 bg-white rounded-xl border border-gray-50 shrink-0 flex items-center justify-center p-1">
                      <img 
                        src={item.item.image} 
                        alt={displayName} 
                        referrerPolicy="no-referrer"
                        className="max-h-full object-contain"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 text-left">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-bold text-coffee-dark line-clamp-1">{displayName}</h4>
                        <span className="text-xs font-mono font-bold text-coffee-dark">${(item.item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      {isCustom && item.customization ? (
                        <p className="text-[10px] text-coffee-accent mt-0.5 font-medium leading-relaxed">
                          Setup: {item.customization.roast} Roast • {item.customization.milk} • {item.customization.sweetness}
                        </p>
                      ) : (
                        <p className="text-[10px] text-gray-400 mt-0.5 italic">
                          Signature house recipe
                        </p>
                      )}

                      {/* Controls */}
                      <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center gap-2 border border-gray-100 bg-white px-2.5 py-1 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.item.id, item.customization ? displayName : undefined, -1)}
                            className="text-gray-400 hover:text-coffee-dark cursor-pointer"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-mono font-bold text-coffee-dark min-w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.item.id, item.customization ? displayName : undefined, 1)}
                            className="text-gray-400 hover:text-coffee-dark cursor-pointer"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.item.id, item.customization ? displayName : undefined)}
                          className="text-gray-300 hover:text-rose-500 cursor-pointer transition-colors p-1"
                          title="Delete Item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Delivery / Shipping Method Options */}
            <div className="px-6 py-4 bg-coffee-bg/30 border-t border-gray-50 text-left space-y-3">
              <span className="text-[10px] font-bold text-coffee-accent uppercase tracking-widest block">
                Serving Delivery Style:
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    deliveryMethod === "pickup"
                      ? "bg-white text-coffee-dark border-coffee-dark shadow-xs"
                      : "bg-transparent text-coffee-text border-gray-100 hover:border-coffee-accent/20"
                  }`}
                >
                  <Gift className="h-4 w-4 shrink-0" />
                  <span>Self Pickup (Free)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    deliveryMethod === "delivery"
                      ? "bg-white text-coffee-dark border-coffee-dark shadow-xs"
                      : "bg-transparent text-coffee-text border-gray-100 hover:border-coffee-accent/20"
                  }`}
                >
                  <Truck className="h-4 w-4 shrink-0" />
                  <span>Hot Delivery (+$3.50)</span>
                </button>
              </div>
            </div>

            {/* Total breakdown */}
            <div className="p-6 border-t border-gray-100 bg-white text-left space-y-4">
              <div className="space-y-2 text-xs text-coffee-text">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium text-coffee-dark">${itemsSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Brewery Tax (10%)</span>
                  <span className="font-mono font-medium text-coffee-dark">${tax.toFixed(2)}</span>
                </div>
                {deliveryMethod === "delivery" && (
                  <div className="flex justify-between">
                    <span>Hot Fast Delivery Fee</span>
                    <span className="font-mono font-medium text-coffee-dark">$3.50</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold border-t border-gray-55 pt-2.5 mt-1 text-coffee-dark">
                  <span>Grand Total</span>
                  <span className="font-mono text-coffee-medium text-base">${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckoutSubmit}
                disabled={checkingOut}
                className="w-full bg-coffee-medium text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-coffee-accent transition-all duration-300 shadow-md shadow-coffee-medium/15 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {checkingOut ? (
                  <>
                    <svg className="animate-spin h-4.5 w-4.5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Transmitting order to barista...</span>
                  </>
                ) : (
                  <span>Send recipe to brewhouse • ${grandTotal.toFixed(2)}</span>
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
