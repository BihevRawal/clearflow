import { useState, useEffect, useRef } from "react";
import "../css/Reviews.css";

export default function Reviews() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");     // NEW
  const [phone, setPhone] = useState("");     // NEW
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);

  const sliderRef = useRef(null);

  // Discount modal state
  const [showDiscount, setShowDiscount] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [checkingCode, setCheckingCode] = useState(false);
  const [discountResult, setDiscountResult] = useState(null);

  // Fetch approved reviews from our API route
  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/get-reviews");
        const data = await res.json();
        setReviews(data.records || []);
      } catch (e) {
        console.error("Failed to load reviews", e);
      } finally {
        setLoadingReviews(false);
      }
    }
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !text.trim() || !email.trim()) {
      alert("Please enter your name, email and review.");
      return;
    }

    setLoadingSubmit(true);
    try {
      const res = await fetch("/api/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          rating: Number(rating),
          review_text: text.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Submit failed");
      }

      alert("Thanks! Your review was submitted and is waiting for approval.");
      setName("");
      setEmail("");
      setPhone("");
      setRating(5);
      setText("");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const renderStars = (n) => {
    const filled = "★".repeat(n || 0);
    const empty = "☆".repeat(5 - (n || 0));
    return (
      <span className="review-stars">
        <span className="filled">{filled}</span>
        <span className="empty">{empty}</span>
      </span>
    );
  };

  const openDiscountModal = () => {
    setDiscountResult(null);
    setDiscountCode("");
    setShowDiscount(true);
  };

  const handleCheckCode = async () => {
    if (!discountCode.trim()) return;

    setCheckingCode(true);
    setDiscountResult(null);

    try {
      const res = await fetch("/api/check-discount", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: discountCode.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.valid) {
        setDiscountResult({
          ok: true,
          message: "✅ Code valid! You’ve unlocked 5% off your next service.",
        });
      } else {
        setDiscountResult({
          ok: false,
          message:
            data.message ||
            "❌ Invalid code. Please double-check the code and try again.",
        });
      }
    } catch (err) {
      console.error(err);
      setDiscountResult({
        ok: false,
        message: "Something went wrong. Please try again in a moment.",
      });
    } finally {
      setCheckingCode(false);
    }
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="reviews-inner">
        <h2 className="reviews-title">Reviews</h2>

        {/* Write review row */}
        <form className="review-form" onSubmit={handleSubmit}>
          <input
            className="review-input"
            placeholder="Your name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="review-input"
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="review-input"
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <div className="rating-picker">
            {Array.from({ length: 5 }, (_, i) => {
              const starValue = i + 1;
              return (
                <button
                  type="button"
                  key={starValue}
                  className={
                    starValue <= rating ? "star-btn active" : "star-btn"
                  }
                  onClick={() => setRating(starValue)}
                >
                  ★
                </button>
              );
            })}
          </div>

          <input
            className="review-input large"
            placeholder="Write your review here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <button
            type="submit"
            className="review-submit-btn"
            disabled={loadingSubmit}
          >
            {loadingSubmit ? "Submitting…" : "Submit Review"}
          </button>
        </form>

        {/* Approved reviews slider */}
        <div className="reviews-slider-wrapper">
          <button
            type="button"
            className="slider-arrow left"
            onClick={scrollLeft}
            aria-label="Previous reviews"
          >
            ‹
          </button>

          <div className="reviews-slider" ref={sliderRef}>
            {loadingReviews ? (
              <div className="reviews-empty">Loading reviews…</div>
            ) : reviews.length === 0 ? (
              <div className="reviews-empty">
                No reviews yet. Be the first to leave one!
              </div>
            ) : (
              reviews.map((r) => {
                const f = r.fields || {};
                return (
                  <div key={r.id} className="review-card">
                    {renderStars(f.rating)}
                    <p className="review-text">“{f.review_text}”</p>
                    <p className="review-name">
                      — {f.customer_name || "Happy customer"}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          <button
            type="button"
            className="slider-arrow right"
            onClick={scrollRight}
            aria-label="Next reviews"
          >
            ›
          </button>
        </div>

        {/* Claim Discount CTA */}
        <div className="discount-cta">
          <p className="discount-text">
            Left us a review and received a special code?
          </p>
          <button
            type="button"
            className="discount-btn"
            onClick={openDiscountModal}
          >
            🎉 Claim Your 5% Discount
          </button>
        </div>
      </div>

      {/* Discount Modal */}
      {showDiscount && (
        <div className="discount-modal-backdrop">
          <div className="discount-modal">
            <button
              className="discount-modal-close"
              onClick={() => setShowDiscount(false)}
            >
              ×
            </button>

            <h3 className="discount-modal-title">Claim Your Reward</h3>
            <p className="discount-modal-subtitle">
              Enter the unique discount code from your approved review email.
            </p>

            <input
              className="discount-input"
              placeholder="Enter your code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />

            <button
              type="button"
              className="discount-check-btn"
              onClick={handleCheckCode}
              disabled={checkingCode || !discountCode.trim()}
            >
              {checkingCode ? "Checking…" : "Check Code"}
            </button>

            {discountResult && (
              <p
                className={
                  discountResult.ok
                    ? "discount-result success"
                    : "discount-result error"
                }
              >
                {discountResult.message}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
