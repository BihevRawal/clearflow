import { useState } from "react";
import "../css/Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">

        {/* LOGO */}
        <div className="header-left">
          <a href="#top">     {/* <-- Added wrapper */}
            <img src="/logo-clear.png" alt="clearflow Logo" className="header-logo" />
          </a>
        </div>

        {/* MOBILE CENTER BOOK BUTTON */}
        <div className="mobile-book-center mobile-only">
          <a href="#book" className="mobile-only-bookbtn">Book Now</a>
        </div>

        {/* DESKTOP NAV */}
        <nav className="nav-desktop">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
          <a href="#reviews" className="nav-highlight">Claim Discount</a>
        </nav>

        {/* DESKTOP BOOK NOW */}
        <a href="#book" className="book-btn desktop-only">
          Book Now
        </a>

        {/* HAMBURGER */}
        <button
          className="hamburger mobile-only"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mobile-menu">
          <a href="#about" onClick={() => setOpen(false)}>About</a>
          <a href="#services" onClick={() => setOpen(false)}>Services</a>
          <a href="#gallery" onClick={() => setOpen(false)}>Gallery</a>
          <a href="#reviews" onClick={() => setOpen(false)}>Reviews</a>
          <a
            href="#reviews"
            className="mobile-highlight"
            onClick={() => setOpen(false)}
          >
            Claim Discount
          </a>
          <a
            href="#book"
            className="mobile-book-btn"
            onClick={() => setOpen(false)}
          >
            Book Now
          </a>
        </div>
      )}
    </header>
  );
}
