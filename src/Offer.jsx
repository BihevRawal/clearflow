import { useState } from "react";
import "./css/Offer.css";

export default function Offer() {
  const [active, setActive] = useState(false);

  const handleClick = (e) => {
    e.preventDefault(); // we control the scroll + animation

    // briefly show the pill (nice for mobile tap)
    setActive(true);
    setTimeout(() => setActive(false), 2200);

    const target = document.querySelector("#book");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#book";
    }
  };

  return (
    <a
      href="#book"
      className={`offer-wrapper ${active ? "offer-wrapper-active" : ""}`}
      onClick={handleClick}
      aria-label="Flash offer – get a fast quote"
    >
      {/* Pill that looks like it's extending from the circle */}
      <div className="offer-pill">
        <span className="offer-pill-main">Fast Roof &amp; Gutter Quote</span>
        <span className="offer-pill-sub">
          Tap here to claim your offer →
        </span>
      </div>

      {/* Circular flash-offer badge */}
      <img
        src="/flash-offer.png"
        className="offer-circle"
        alt="Flash Offer"
      />
    </a>
  );
}
