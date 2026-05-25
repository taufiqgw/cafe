import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI client
  // Will leverage process.env.GEMINI_API_KEY
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route: Coffee recommendation / AI barista roast master chat
  app.post("/api/recommend", async (req, res) => {
    try {
      const { mood, customBlend, query, chatHistory } = req.body;
      
      let systemInstruction = "You are 'The Roast Master AI', an elite, friendly, and deeply knowledgeable coffee expert barista working at the premium digital cafe 'The Coffee Cup'. Speak with a warm, passionate tone, using terms from the coffee craft (e.g. bean profiles, roasting levels, flavor notes, brewing methods, crema, mouthfeel). Always suggest delicious recipes, tips, or coffee pairings. Keep your responses structured with nice bullet points, relatively concise (2-3 short paragraphs), and elegant. Use bolding for headings.";

      if (customBlend) {
        systemInstruction += ` The user has custom-crafted a blend: Roasting level: ${customBlend.roast}, Milk type: ${customBlend.milk}, Sweetness level: ${customBlend.sweetness}, Toppings: ${customBlend.toppings.join(', ') || 'None'}, Size: ${customBlend.size}. Encourage their creativity! Provide an expert flavor note analysis (e.g., citrusy, chocolatey, nutty, flowery depending on setup), snack pairing suggestions, and a clever signature name for this custom concoction, along with a fun score rating (e.g., 9.8/10 Roast Master Approved!).`;
      }

      if (mood) {
        systemInstruction += ` The user is currently feeling '${mood}'. Empathize briefly and recommend a perfect coffee beverage (either standard menu items like Espresso, Cafe Latte, Cold Brew, Caramel Macchiato, or a custom combination) that perfectly matches their current emotion (for example: a strong double espresso/ristretto to shake off Tiredness; a smooth, silky vanilla flat white to match Calmness; a vibrant, nitro cold brew for Energy; a warm cinnamon mocha for Stress-relief).`;
      }

      // Prepare previous messaging context if any
      interface ChatPart {
        text: string;
      }
      interface ChatMessage {
        role: "user" | "model";
        parts: ChatPart[];
      }
      
      const contents: ChatMessage[] = [];
      if (chatHistory && Array.isArray(chatHistory)) {
        for (const msg of chatHistory) {
          contents.push({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
          });
        }
      }
      
      // Add current query
      contents.push({
        role: "user",
        parts: [{ text: query || "Recommend me a custom coffee style or analyze my blend!" }]
      });

      // Simple safety fallback
      if (!process.env.GEMINI_API_KEY) {
        // Mock a wonderful placeholder if Gemini Key is not set yet in visual environment
        res.json({
          success: true,
          text: `**Coffee recommendation for you**:\n\n*   **Signature Name**: Sweet Mocha Velvet\n*   **Flavor Profile**: Rich dark chocolate undertones paired with silky texture and velvety foam.\n*   **Barista Pairing Tip**: Excellent with almond croissants or warm cinnamon rolls.\n*   *Roast Master AI Note: I'm running in offline/demo mode, but once you add your GEMINI_API_KEY in the Secrets panel, we'll suggest fully customized AI mastercraft blends tailored directly to your moods and precise coffee customizations!*`
        });
        return;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.85,
        }
      });

      res.json({
        success: true,
        text: response.text,
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({
        success: false,
        error: error.message || "Failed to communicate with AI Roast Master",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
