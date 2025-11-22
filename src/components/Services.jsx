import { useState } from "react";
import "../css/Services.css";

export default function Services() {
  const items = [
    {
      title: "Gutter Cleaning",
      short: "Full gutter & downpipe cleaning.",
      features: ["Leaf removal", "Downpipe flushing", "Debris clearing"],
      long:
        "Our gutter cleaning service removes leaves, sludge, and blockages from your gutters and downpipes. Prevent overflow, water damage, mould, and foundation issues. Includes free roof inspection.",
    },
    {
      title: "Roof Debris Removal",
      short: "Remove leaves & branches from roof.",
      features: ["Safe roof access", "Valley cleaning", "Moss & debris removal"],
      long:
        "Leaves and branches on your roof block water flow and cause long-term structural damage. We clear all roof valleys, ridges, and drainage pathways using safe ladder techniques.",
    },
    {
      title: "Gutter Guard Installation",
      short: "Reduce cleaning frequency.",
      features: ["Mesh guards", "Bushfire-rated guards", "Custom fit"],
      long:
        "We install premium-quality gutter guards designed for Australian roofs. Prevent blockages, extend gutter life, and reduce maintenance costs. Available in aluminium & poly mesh.",
    },
    {
      title: "Free Roof Check",
      short: "Check tiles, cracks, flashing.",
      features: ["Tile inspection", "Drainage check", "Photo report"],
      long:
        "Every job includes a free roof inspection where we check for broken tiles, loose flashing, clogged drains, and signs of water entry. We provide a simple explanation + recommendations.",
    },
    {
      title: "Pressure Washing",
      short: "Make surfaces look brand new.",
      features: ["Driveways", "Paths", "Patios", "Decks"],
      long:
        "High-pressure cleaning removes dirt, mould, oil stains, and built-up grime from your outdoor surfaces. We clean concrete, pavers, patios, retaining walls, fences, and decks.",
    },
    {
      title: "Carpet Deep Cleaning",
      short: "Steam clean + stain removal.",
      features: ["Pet stain removal", "Deep steam clean", "Odour treatment"],
      long:
        "We use hot water extraction to deep-clean carpets, remove stains, kill bacteria, and refresh your home. Safe for pets & kids. Fast-drying solutions available.",
    },
  ];

  const [flipped, setFlipped] = useState(null);

  return (
    <section id="services" className="services-section">
      <h2 className="services-title">Our Services</h2>

      <div className="services-grid">
        {items.map((s, i) => (
          <div
            key={i}
            className={`service-card ${flipped === i ? "flipped" : ""}`}
            onClick={() => setFlipped(flipped === i ? null : i)}
          >
            {/* FRONT */}
            <div className="card-face card-front">
              <h3 className="card-title">{s.title}</h3>
              <p className="card-short">{s.short}</p>

              <ul className="card-features">
                {s.features.map((f, index) => (
                  <li key={index}>• {f}</li>
                ))}
              </ul>

              <span className="click-hint">Tap to learn more ⤵</span>
            </div>

            {/* BACK */}
            <div className="card-face card-back">
              <h3 className="card-title">{s.title}</h3>

              <p className="card-long">{s.long}</p>

              <a href="#book" className="card-btn">
                Get a Quote
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
