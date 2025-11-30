import { useState } from "react";
import "../css/Services.css";

export default function Services() {
  const items = [
    {
      title: "Gutter Cleaning",
      icon: "💧",
      badge: "Core Service",
      short: "Full gutter & downpipe clean to stop overflow.",
      features: ["Leaf & sludge removal", "Downpipe flushing", "Debris clearing"],
      long:
        "Our gutter cleaning removes leaves, sludge and hidden blockages. Prevents overflow, leaks, mould, foundation issues — and includes a free roof check.",
    },
    {
      title: "Roof Debris Removal",
      icon: "🌿",
      badge: "Damage Prevention",
      short: "Clears leaves & branches from roof surfaces.",
      features: ["Safe roof access", "Valley & ridge cleaning", "Moss removal"],
      long:
        "Leaves and branches trap moisture and block drainage. We safely clear roof valleys and ridges to prevent leaks and structural damage.",
    },
    {
      title: "Gutter Guard Installation",
      icon: "🛡️",
      badge: "Maintenance Saver",
      short: "Quality guards to keep gutters clear longer.",
      features: ["Aluminium & poly mesh", "Bushfire-rated options", "Custom fitted"],
      long:
        "Premium gutter guards reduce blockages, extend gutter life and greatly reduce how often gutters need cleaning.",
    },
    {
      title: "Free Roof Check",
      icon: "🔍",
      badge: "Included",
      short: "Quick roof health check while we’re there.",
      features: ["Tiles checked", "Flashing inspection", "Photo explanation"],
      long:
        "We check for early signs of leaks, cracked tiles, loose flashing and rust issues and send you basic photos if needed.",
    },
    {
      title: "Pressure Washing",
      icon: "🧽",
      badge: "Add-On",
      short: "Make surfaces look almost new again.",
      features: ["Driveways", "Paths", "Patios & decks"],
      long:
        "High-pressure cleaning removes deep grime, mould and stains from concrete, pavers, decks and fences.",
    },
    {
      title: "Carpet Deep Cleaning",
      icon: "🏠",
      badge: "Interior Care",
      short: "Deep steam clean & stain removal.",
      features: ["Pet stain removal", "Hot water extraction", "Odour treatment"],
      long:
        "Deep steam cleaning kills bacteria, removes stains and refreshes carpets — great for families and pet owners.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="services" className="services-section">

      <div className="services-header">
        <h2 className="services-title">Our Services</h2>
        <p className="services-subtitle">
          Everything we do protects your home <span>before damage becomes expensive.</span>
        </p>
      </div>

      <div className="services-grid">
        {items.map((item, i) => (
          <div key={i} className={`svc-card ${openIndex === i ? "open" : ""}`}>
            
            {/* TOP SECTION (always visible) */}
            <div className="svc-top" onClick={() => toggle(i)}>
              <div className="svc-icon">{item.icon}</div>

              <div className="svc-header">
                <h3>{item.title}</h3>
                <span className="svc-badge">{item.badge}</span>
              </div>

              <p className="svc-short">{item.short}</p>

              <ul className="svc-features">
                {item.features.map((f, idx) => (
                  <li key={idx}>{f}</li>
                ))}
              </ul>

              <span className="svc-toggle">
                {openIndex === i ? "Tap to close ▲" : "Tap to learn more ▼"}
              </span>
            </div>

            {/* EXPANDING BACK PANEL */}
            <div className="svc-bottom">
              <p className="svc-long">{item.long}</p>

              <a href="#book" className="svc-btn">
                Get a Quote
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
