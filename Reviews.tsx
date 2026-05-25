import { useState, FormEvent } from "react";
import { CoffeeReview } from "../types";
import { INITIAL_REVIEWS } from "../data";
import { Star, Smile, Send } from "lucide-react";

export default function Reviews() {
  const [reviews, setReviews] = useState<CoffeeReview[]>(INITIAL_REVIEWS);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [mood, setMood] = useState("Focused");
  const [alerts, setAlerts] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newReview: CoffeeReview = {
      id: Date.now().toString(),
      name: name.trim(),
      comment: comment.trim(),
      rating,
      mood,
      date: "Just now",
      avatarLetter: name.trim().charAt(0).toUpperCase(),
    };

    setReviews([newReview, ...reviews]);
    setName("");
    setComment("");
    setRating(5);
    setAlerts(true);
    setTimeout(() => {
      setAlerts(false);
    }, 3000);
  };

  return (
    <section id="reviews" className="py-20 bg-coffee-bg">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Title */}
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs uppercase tracking-widest text-coffee-accent font-bold">The Guest Journal</span>
          <h2 className="text-3xl md:text-4xl font-serif text-coffee-dark uppercase">
            What Our Patrons Say
          </h2>
          <div className="w-20 h-1 bg-coffee-accent mx-auto rounded-full" />
          <p className="text-coffee-text max-w-2xl mx-auto text-sm">
            Read real-time tasting feedback from Melbourne's deep coffee-loving community. Submitting your review helps us adjust the barista roasting curves!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-stretch" data-purpose="reviews-container">
          {/* Left Column: Guest reviews masonry */}
          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="bg-white border border-gray-100 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow duration-300 text-left"
                >
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-coffee-accent/10 border border-coffee-accent/20 text-coffee-medium font-bold rounded-2xl flex items-center justify-center">
                          {r.avatarLetter}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-coffee-dark">{r.name}</h4>
                          <span className="text-[9px] text-gray-400 font-medium block">{r.date}</span>
                        </div>
                      </div>

                      {r.mood && (
                        <span className="bg-coffee-bg text-coffee-accent border border-coffee-accent/10 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide">
                          Feeling {r.mood}
                        </span>
                      )}
                    </div>

                    {/* Quality Stars */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-3.5 w-3.5 ${
                            idx < r.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs text-coffee-text leading-relaxed italic">
                      "{r.comment}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Write a review */}
          <div className="w-full lg:w-96">
            <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-md text-left sticky top-28 space-y-6">
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-coffee-dark">
                  Write Your Brew Review
                </h3>
                <p className="text-xs text-coffee-text">
                  Share your tastebuds with the world.
                </p>
              </div>

              {alerts && (
                <div className="bg-emerald-50 text-emerald-600 border border-emerald-100 p-3 rounded-xl text-center text-xs font-semibold">
                  ✨ Thank you! Review submitted to guest book.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Guest Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-coffee-dark uppercase tracking-wide">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter guest name..."
                    className="w-full bg-coffee-bg px-4 py-3 rounded-xl text-xs text-coffee-dark border border-gray-100 focus:outline-none focus:ring-1 focus:ring-coffee-accent"
                  />
                </div>

                {/* Rating selection */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-coffee-dark uppercase tracking-wide">
                    Pour Review Score
                  </label>
                  <div className="flex gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setRating(s)}
                        className="cursor-pointer"
                      >
                        <Star
                          className={`h-6 w-6 transition-all duration-150 ${
                            s <= rating ? "fill-amber-400 text-amber-400" : "text-gray-200"
                          } hover:scale-115`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mood Tag */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-coffee-dark uppercase tracking-wide">
                    Your Current Feeling
                  </label>
                  <select
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="w-full bg-coffee-bg px-4 py-3 rounded-xl text-xs text-coffee-dark border border-gray-100 focus:outline-none focus:ring-1 focus:ring-coffee-accent cursor-pointer"
                  >
                    <option value="Focused">Focused 💻</option>
                    <option value="Calm">Calm 🍃</option>
                    <option value="Tired">Tired 🥱</option>
                    <option value="Energetic">Energetic ⚡</option>
                    <option value="Stressed">Stressed 🤯</option>
                  </select>
                </div>

                {/* Review Textarea */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-coffee-dark uppercase tracking-wide">
                    Patron Opinion
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe are crema quality, taste notes, or visual presentation..."
                    className="w-full bg-coffee-bg p-4 rounded-xl text-xs text-coffee-dark border border-gray-100 focus:outline-none focus:ring-1 focus:ring-coffee-accent placeholder:text-gray-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-coffee-medium text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-coffee-accent transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-coffee-medium/10 active:scale-95"
                >
                  <Send className="h-4.5 w-4.5" />
                  <span>Submit Guest review</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
