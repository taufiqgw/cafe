import { MenuItem, CoffeeReview } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  {
    id: "m1",
    name: "Golden Crema Espresso",
    category: "hot",
    price: 3.5,
    rating: 4.9,
    description: "Pure, intense shot of artisanal coffee, showcasing a thick, sweet golden crema with hints of citrus and dark cocoa.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4j1BZxM8PYG8XBZDC9LlzHYTLCANKHv4F1eQiShOC9LT8YqwkHjpceDzHeYcwnHBa8oZdH3eGG3uAMj3B3c67BXWrK5z4k8RRQoXcVgQp-3bJzLhBtrdl8oE1KMW_jeVzC3pAphAb9j_fyVyH6eOVtLHjJlNoOint_TxHoWifrNkx0kWgxCxAlMm4nMGLxfSsLKZuC2OyysKMtKb_G-6TbvYkX--QR0Jfy-sOqBDniu9Myf6-2f7_1qgdPxlzVoJBp_XJ7FL77c",
    flavorNotes: ["Citrus", "Hazelnut", "Dark Chocolate"],
    ingredients: ["Single-origin Arabica, filtered hot water"]
  },
  {
    id: "m2",
    name: "Classic Silk Latte",
    category: "hot",
    price: 4.8,
    rating: 4.8,
    description: "Rich double espresso merged with velvety textured steamed milk and a thin layer of fine microfoam.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4j1BZxM8PYG8XBZDC9LlzHYTLCANKHv4F1eQiShOC9LT8YqwkHjpceDzHeYcwnHBa8oZdH3eGG3uAMj3B3c67BXWrK5z4k8RRQoXcVgQp-3bJzLhBtrdl8oE1KMW_jeVzC3pAphAb9j_fyVyH6eOVtLHjJlNoOint_TxHoWifrNkx0kWgxCxAlMm4nMGLxfSsLKZuC2OyysKMtKb_G-6TbvYkX--QR0Jfy-sOqBDniu9Myf6-2f7_1qgdPxlzVoJBp_XJ7FL77c",
    flavorNotes: ["Creamy", "Toffee", "Smooth"],
    ingredients: ["Espresso", "Textured Steamed Milk", "Sweet Vanilla hint"]
  },
  {
    id: "m3",
    name: "Signature Caramel Macchiato",
    category: "hot",
    price: 5.2,
    rating: 4.9,
    description: "Freshly steamed milk with vanilla-flavored syrup, marked with espresso and topped with proprietary buttery caramel drizzle.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4j1BZxM8PYG8XBZDC9LlzHYTLCANKHv4F1eQiShOC9LT8YqwkHjpceDzHeYcwnHBa8oZdH3eGG3uAMj3B3c67BXWrK5z4k8RRQoXcVgQp-3bJzLhBtrdl8oE1KMW_jeVzC3pAphAb9j_fyVyH6eOVtLHjJlNoOint_TxHoWifrNkx0kWgxCxAlMm4nMGLxfSsLKZuC2OyysKMtKb_G-6TbvYkX--QR0Jfy-sOqBDniu9Myf6-2f7_1qgdPxlzVoJBp_XJ7FL77c",
    flavorNotes: ["Caramel Candy", "Buttery", "Sweet Vanilla"],
    ingredients: ["Espresso", "Vanilla Syrup", "Steamed Milk", "Caramel Drizzle"]
  },
  {
    id: "m4",
    name: "Artisanal Velvet Mocha",
    category: "hot",
    price: 5.5,
    rating: 4.7,
    description: "Espresso paired with locally sourced organic chocolate, steamed with dense milk and topped with rich premium cocoa dust.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4j1BZxM8PYG8XBZDC9LlzHYTLCANKHv4F1eQiShOC9LT8YqwkHjpceDzHeYcwnHBa8oZdH3eGG3uAMj3B3c67BXWrK5z4k8RRQoXcVgQp-3bJzLhBtrdl8oE1KMW_jeVzC3pAphAb9j_fyVyH6eOVtLHjJlNoOint_TxHoWifrNkx0kWgxCxAlMm4nMGLxfSsLKZuC2OyysKMtKb_G-6TbvYkX--QR0Jfy-sOqBDniu9Myf6-2f7_1qgdPxlzVoJBp_XJ7FL77c",
    flavorNotes: ["Rich Cocoa", "Roasted Almond", "Heavy Body"],
    ingredients: ["Dark Cocoa Paste", "Espresso", "Velvet Steam Milk"]
  },
  {
    id: "m5",
    name: "18-Hour Sweet Cold Brew",
    category: "cold",
    price: 4.5,
    rating: 4.9,
    description: "Meticulously slow-steeped in cold spring water for 18 hours, resulting in an exceptionally balanced, low-acid, and sweetened cold concentrate.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4j1BZxM8PYG8XBZDC9LlzHYTLCANKHv4F1eQiShOC9LT8YqwkHjpceDzHeYcwnHBa8oZdH3eGG3uAMj3B3c67BXWrK5z4k8RRQoXcVgQp-3bJzLhBtrdl8oE1KMW_jeVzC3pAphAb9j_fyVyH6eOVtLHjJlNoOint_TxHoWifrNkx0kWgxCxAlMm4nMGLxfSsLKZuC2OyysKMtKb_G-6TbvYkX--QR0Jfy-sOqBDniu9Myf6-2f7_1qgdPxlzVoJBp_XJ7FL77c",
    flavorNotes: ["Chocolate", "Molasses", "Subtle Fruitiness"],
    ingredients: ["Cold steeped coffee beans", "Purified spring ice"]
  },
  {
    id: "m6",
    name: "Agave Coconut Nitro",
    category: "cold",
    price: 5.4,
    rating: 4.8,
    description: "Creamy draft nitro cold brew charged with nitrogen gas, layered with silky coconut milk, and finished with organic amber agave nectar.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4j1BZxM8PYG8XBZDC9LlzHYTLCANKHv4F1eQiShOC9LT8YqwkHjpceDzHeYcwnHBa8oZdH3eGG3uAMj3B3c67BXWrK5z4k8RRQoXcVgQp-3bJzLhBtrdl8oE1KMW_jeVzC3pAphAb9j_fyVyH6eOVtLHjJlNoOint_TxHoWifrNkx0kWgxCxAlMm4nMGLxfSsLKZuC2OyysKMtKb_G-6TbvYkX--QR0Jfy-sOqBDniu9Myf6-2f7_1qgdPxlzVoJBp_XJ7FL77c",
    flavorNotes: ["Tropical Coconut", "Rich Agave", "Effervescent Crema"],
    ingredients: ["Draft Nitro cold brew", "Creamy coconut extract", "Faceted ice"]
  },
  {
    id: "m7",
    name: "Lavender Salted Iced Latte",
    category: "cold",
    price: 5.6,
    rating: 4.6,
    description: "Double ristretto over ice cubes with custom lavender-infused organic agave syrup, textured milk, and finished with crystalline pink sea salt.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4j1BZxM8PYG8XBZDC9LlzHYTLCANKHv4F1eQiShOC9LT8YqwkHjpceDzHeYcwnHBa8oZdH3eGG3uAMj3B3c67BXWrK5z4k8RRQoXcVgQp-3bJzLhBtrdl8oE1KMW_jeVzC3pAphAb9j_fyVyH6eOVtLHjJlNoOint_TxHoWifrNkx0kWgxCxAlMm4nMGLxfSsLKZuC2OyysKMtKb_G-6TbvYkX--QR0Jfy-sOqBDniu9Myf6-2f7_1qgdPxlzVoJBp_XJ7FL77c",
    flavorNotes: ["Lavender Floral", "Salted Butter", "Caramelized Sugar"],
    ingredients: ["Espresso", "Lavender essence", "Cold whole milk", "Pink Himalayan sea salt"]
  },
  {
    id: "m8",
    name: "Matcha Espresso Fusion",
    category: "signature",
    price: 5.9,
    rating: 4.9,
    description: "Stunning three-layered beverage made of sweetened Uji Matcha green tea, organic pasture milk, and robust freshly pulled double-shot espresso.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk4j1BZxM8PYG8XBZDC9LlzHYTLCANKHv4F1eQiShOC9LT8YqwkHjpceDzHeYcwnHBa8oZdH3eGG3uAMj3B3c67BXWrK5z4k8RRQoXcVgQp-3bJzLhBtrdl8oE1KMW_jeVzC3pAphAb9j_fyVyH6eOVtLHjJlNoOint_TxHoWifrNkx0kWgxCxAlMm4nMGLxfSsLKZuC2OyysKMtKb_G-6TbvYkX--QR0Jfy-sOqBDniu9Myf6-2f7_1qgdPxlzVoJBp_XJ7FL77c",
    flavorNotes: ["Grassy Green Tea", "Intense Espresso", "Bold Contrast"],
    ingredients: ["Ceremonial Matcha", "Velvety cow / oat milk", "Ristretto espresso shot"]
  }
];

export const INITIAL_REVIEWS: CoffeeReview[] = [
  {
    id: "r1",
    name: "Sonia G.",
    rating: 5,
    comment: "This place is a absolute masterclass! The Golden Crema espresso is thick, complex, and tastes exactly like heaven. I had the AI custom blend recommend me a medium oat milk with lavender syrup, and it is a total gamechanger!",
    date: "1 day ago",
    avatarLetter: "S",
    mood: "Focused"
  },
  {
    id: "r2",
    name: "Tomy S.",
    rating: 5,
    comment: "Simply brilliant. The branding, layout, and atmosphere feel so chic and cozy. The Roast Master recommendation nailed my Monday morning fatigue perfectly. A must-try!",
    date: "3 days ago",
    avatarLetter: "T",
    mood: "Tired"
  },
  {
    id: "r3",
    name: "Amanda P.",
    rating: 4,
    comment: "The Lavender Salted Iced Latte is fantastic! The contrast with Himalayan pink salt on top of sweet lavender notes is pure sensory magic. 10/10 visual presentation as well.",
    date: "1 week ago",
    avatarLetter: "A",
    mood: "Calm"
  }
];

export const TOPPING_OPTIONS = [
  "Whipped Cream",
  "Caramel Drizzle",
  "Chocolate Rain (Cocoa Dust)",
  "Cinnamon Powder",
  "Salted Caramel Sauce",
  "Lavender Petals",
  "Vanilla Bean Specks",
  "Himalayan Pink Salt Dust"
];
