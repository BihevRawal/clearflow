import "../css/Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Background Layers */}
      <div className="hero-bg"></div>
      <div className="hero-parallax"></div>
      <div className="hero-clouds"></div>
      <div className="hero-rays"></div>
      <div className="hero-vignette"></div>

      {/* Mascot (hidden on mobile) */}
      <img
        src="/logo_clear.png"
        className="hero-watermark"
        alt="ClearFlow Mascot"
      />

      <div className="hero-content">
        <p className="hero-kicker">Local Brisbane roof & gutter specialists</p>

        <h1 className="hero-title">
          Brisbane’s Trusted Roof &amp; Gutter Cleaning Experts
        </h1>

        <p className="hero-subtitle">
          Affordable, fast, and reliable gutter cleaning for every home.
          <br />
          Servicing Brisbane South, Logan, Ipswich &amp; nearby suburbs.
        </p>

        <div className="hero-ctas">
          <a href="#book" className="hero-cta">Book Now</a>
          <a href="tel:0451234567" className="hero-call-btn">Call Now</a>
        </div>
      </div>
    </section>
  );
}
