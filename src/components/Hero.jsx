import "../css/Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* MAIN BLURRED BACKGROUND */}
      <div className="hero-bg"></div>

      {/* PARALLAX LAYER */}
      <div className="hero-parallax"></div>

      {/* MOVING CLOUDS (optional – style via CSS if you want) */}
      <div className="hero-clouds"></div>

      {/* LIGHT RAYS (optional) */}
      <div className="hero-rays"></div>

      {/* VIGNETTE EDGES */}
      <div className="hero-vignette"></div>

      {/* WATERMARK MASCOT */}
      <img
        src="/brisbane-mascot.png"
        className="hero-watermark"
        alt="Brisbane Watermark"
      />

      {/* CONTENT */}
      <div className="hero-content">
        <h1 className="hero-title">For Brisbane Homes</h1>

        <p className="hero-subtitle">
          Friendly Brisbane-owned small business servicing Brisbane South,
          Logan, Ipswich & nearby suburbs.
        </p>

        <a href="#book" className="hero-cta">
          Get a Free Quote
        </a>
      </div>
    </section>
  );
}
