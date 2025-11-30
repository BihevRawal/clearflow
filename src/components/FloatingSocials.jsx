import { useState } from "react";
import "../css/FloatingSocials.css";

export default function FloatingSocials() {
  const [open, setOpen] = useState(false);

  return (
    <div className="floating-top-container">
      {/* Toggle Button (always visible) */}
      <button
        className="floating-top-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Social Menu"
      >
        <img
          src="/icons/share.svg"
          alt="Share"
          className={`share-icon ${open ? "rotate" : ""}`}
        />
      </button>

      {/* Icons (expand DOWNWARDS) */}
      <div className={`floating-top-icons ${open ? "show" : ""}`}>
        <a href="https://facebook.com" target="_blank" aria-label="Facebook">
          <img src="/icons/facebook.svg" alt="Facebook" />
        </a>

        <a href="https://instagram.com" target="_blank" aria-label="Instagram">
          <img src="/icons/instagram.svg" alt="Instagram" />
        </a>

        <a href="https://tiktok.com" target="_blank" aria-label="TikTok">
          <img src="/icons/tiktok.svg" alt="TikTok" />
        </a>

        <a href="https://youtube.com" target="_blank" aria-label="YouTube">
          <img src="/icons/youtube.svg" alt="YouTube" />
        </a>

        <a
          href="https://maps.google.com?q=ClearFlow+Roof+and+Gutter+Brisbane"
          target="_blank"
          aria-label="Google Business"
        >
          <img src="/icons/google.svg" alt="Google Business" />
        </a>
      </div>
    </div>
  );
}
