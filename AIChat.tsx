import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Sparkles, Send, Coffee, Trash2, Loader2, Smile, Zap } from "lucide-react";

export default function AIChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "wel",
      role: "model",
      content: "Welcome to The Coffee Cup! I am **The Roast Master AI**, your personal barista and coffee craftsman. ☕\n\nHow are you feeling today? Tap a mood below, or tell me your flavor cravings, and I'll brew the perfect custom recommendation for you!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const moodSelects = [
    { name: "Tired 🥱", prompt: "I am feeling extremely Tired. Suggest a powerful coffee recipe to boost my spirits instantly!" },
    { name: "Stressed 🤯", prompt: "I'm feeling cozy but a bit Stressed. Recommend a smooth, comforting, caffeine-balanced warm treat." },
    { name: "Focused 💻", prompt: "I am Focused and gearing up for heavy work. What's a clean, jitter-free specialty brew for deep concentration?" },
    { name: "Calm 🍃", prompt: "I'm feeling Calm and serene. Recommend a light, aromatic herbal infusion or milky flat white." },
    { name: "Energetic ⚡", prompt: "I'm feeling highly Energetic or playful! Tap me into an icy, creative, fruit-infused cold signature brew." },
  ];

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || input.trim();
    if (!textToSend) return;

    if (!customPrompt) {
      setInput("");
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Proxy request to Express backend endpoint
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToSend,
          // Send last 4 messages to keep context short and clear without hitting cutoff limits
          chatHistory: messages.slice(-4).map(m => ({
            role: m.role,
            content: m.content
          })),
        }),
      });

      const data = await response.json();
      if (data.success) {
        const replyMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "model",
          content: data.text,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, replyMsg]);
      } else {
        throw new Error(data.error || "Failed to generate coffee recommendation.");
      }
    } catch (err: any) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: "Drafting perfect recommendations takes a beautiful pour... ☕\n\n*Here is your Roast Master pairings list*:\n- try pairing with warm cinnamon butter toast\n- recommend our **Classic Silk Latte** made with single-seed Medium Arabica!\n\n*(Connect your GEMINI_API_KEY in the Secrets panel to activate live chat with your digital AI Barista Master!)*",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "wel",
        role: "model",
        content: "Fresh menu sheet loaded! Tell me how you are feeling or what flavor profile (fruity, chocolatey, robust, light) you are craving, and let's craft magic. ✨",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <section id="roastmaster" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Section Title */}
        <div className="text-center mb-12 space-y-4">
          <span className="text-xs uppercase tracking-widest text-coffee-accent font-bold">The AI Barista</span>
          <h2 className="text-3xl font-serif text-coffee-dark">
            Consult The Roast Master AI
          </h2>
          <div className="w-16 h-1 bg-coffee-accent mx-auto rounded-full" />
          <p className="text-coffee-text max-w-md mx-auto text-sm">
            Our neural-network coffee genius can suggest specific bean roasts, food pairings, or custom recipes aligned to your exact mood.
          </p>
        </div>

        {/* Chat App Shell */}
        <div className="bg-coffee-bg/40 border border-gray-100 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[550px]" data-purpose="chat-box">
          {/* Box Header */}
          <div className="bg-coffee-dark text-white p-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-coffee-accent/20 p-2 rounded-xl text-coffee-accent relative">
                <Coffee className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-coffee-dark animate-ping" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider">The Roast Master AI</h3>
                <span className="text-[10px] text-emerald-400 font-bold block">Online • Certified Master Barista</span>
              </div>
            </div>
            <button
              onClick={handleClearHistory}
              className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Clear Conversation"
            >
              <Trash2 className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Messages Log Panel */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-amber-50/10">
            {messages.map((m) => {
              const isUser = m.role === "user";
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? "justify-end" : "justify-start"} items-end gap-2.5 animate-in fade-in duration-300`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 bg-coffee-accent text-white flex items-center justify-center rounded-lg text-[10px] font-bold shrink-0">
                      RM
                    </div>
                  )}
                  <div
                    className={`p-4 rounded-2xl max-w-md text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? "bg-coffee-dark text-white rounded-br-none"
                        : "bg-white text-coffee-dark border border-gray-100 rounded-bl-none prose-invert whitespace-pre-line"
                    }`}
                  >
                    {/* Convert simple markdown bullet headers to sleek structures */}
                    {m.content.split("\n").map((line, idx) => {
                      if (line.startsWith("**") || line.startsWith("* ")) {
                        return <p key={idx} className="font-semibold text-coffee-accent mt-1.5">{line.replace(/\*\*|\*/g, "")}</p>;
                      }
                      return <p key={idx} className="mb-1 last:mb-0">{line}</p>;
                    })}
                  </div>
                </div>
              );
            })}
            
            {loading && (
              <div className="flex justify-start items-center gap-2.5">
                <div className="w-7 h-7 bg-coffee-accent text-white flex items-center justify-center rounded-lg text-[10px] font-bold">
                  RM
                </div>
                <div className="bg-white/80 p-3.5 rounded-2xl border border-gray-100 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 text-coffee-accent animate-spin" />
                  <span className="text-[11px] text-coffee-text italic animate-pulse">Steeping answers...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Mood Selector Chips */}
          <div className="bg-white border-t border-gray-100 p-3 overflow-x-auto whitespace-nowrap flex gap-2">
            <span className="text-[10px] text-coffee-accent font-bold uppercase tracking-wider self-center px-2">
              Select Mood:
            </span>
            {moodSelects.map((mood) => (
              <button
                key={mood.name}
                onClick={() => handleSendMessage(mood.prompt)}
                disabled={loading}
                className="bg-coffee-bg text-coffee-dark border border-gray-100 px-3.5 py-1.5 rounded-full text-[11px] font-medium hover:bg-coffee-accent hover:text-white hover:border-coffee-accent transition-all cursor-pointer inline-block"
              >
                {mood.name}
              </button>
            ))}
          </div>

          {/* Message Input Panel */}
          <div className="bg-white p-4 border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSendMessage();
              }}
              placeholder="Ask for custom recipes, blend reviews, or flavor parings..."
              className="flex-1 bg-coffee-bg px-4 py-3 rounded-xl text-xs text-coffee-dark focus:outline-none focus:ring-1 focus:ring-coffee-accent border border-gray-100 placeholder:text-gray-400"
              disabled={loading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !input.trim()}
              className="bg-coffee-dark text-white p-3 rounded-xl hover:bg-coffee-accent cursor-pointer transition-colors shrink-0 flex items-center justify-center disabled:opacity-50 disabled:hover:bg-coffee-dark"
            >
              <Send className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
