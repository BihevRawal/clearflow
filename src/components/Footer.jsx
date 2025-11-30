import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LOGO */}
        <div className="footer-logo-wrapper">
          <img 
            src="/logo-clear.png"
            alt="ClearFlow Logo"
            className="footer-logo"
          />
        </div>

        <h3 className="footer-title">ClearFlow Roof & Gutter</h3>

        <p className="footer-subtext">
          Local Brisbane small business • Friendly service • Honest pricing
        </p>
        <p className="footer-subtext">
          Servicing Brisbane South, Logan, Ipswich & nearby suburbs
        </p>

        {/* SOCIAL MEDIA ICONS */}
        <div className="footer-socials">

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

          <a href="mailto:clearflow@gmail.com" aria-label="Email">
            <img src="/icons/email.svg" alt="Email" />
          </a>

          <a href="tel:+61400000000" aria-label="Phone">
            <img src="/icons/phone.svg" alt="Phone" />
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} ClearFlow. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
