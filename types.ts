export interface MenuItem {
  id: string;
  name: string;
  category: "hot" | "cold" | "signature";
  price: number;
  rating: number;
  description: string;
  image: string;
  flavorNotes: string[];
  ingredients: string[];
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  customization?: {
    roast?: string;
    milk?: string;
    sweetness?: string;
    toppings?: string[];
    size?: string;
  };
}

export interface CustomBlend {
  roast: "Light" | "Medium" | "Dark" | "Extra Bold";
  milk: "Whole Milk" | "Almond Milk" | "Oat Milk" | "Soy Milk" | "No Milk (Black)";
  sweetness: "Zero" | "Less Sweet (25%)" | "Normal (50%)" | "Extra Sweet (100%)";
  toppings: string[];
  size: "Standard (12oz)" | "Grande (16oz)" | "Super Grande (20oz)";
}

export interface CoffeeReview {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatarLetter: string;
  mood?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}
