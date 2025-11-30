import "../css/Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-bg"></div>
      <div className="hero-parallax"></div>
      <div className="hero-clouds"></div>
      <div className="hero-rays"></div>
      <div className="hero-vignette"></div>

      <img
        src="/logo_clear.png"
        className="hero-watermark"
        alt="Clearflow Watermark"
      />

      <div className="hero-content">
        <h1 className="hero-title">
          Brisbane’s Trusted Roof &amp; Gutter Cleaning Experts
        </h1>

        <p className="hero-subtitle">
          Affordable, fast, and reliable gutter cleaning for every home.
          <br />
          Servicing Brisbane South, Logan, Ipswich &amp; nearby suburbs.
        </p>

        <div className="hero-ctas">
          <a href="#book" className="hero-cta">
            Book Now
          </a>

          <a href="tel:0451234567" className="hero-call-btn">
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
