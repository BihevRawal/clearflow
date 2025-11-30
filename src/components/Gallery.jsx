import { useState } from "react";
import "../css/Gallery.css";

export default function Gallery() {
  // Auto-load /public/gallery images
  const importImages = () => {
    const images = import.meta.glob("/public/gallery/*.{jpg,jpeg,png,webp}", {
      eager: true,
    });
    return Object.values(images).map((img) => img.default);
  };

  const allPhotos = importImages();
  const total = allPhotos.length;

  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  if (!total) {
    return (
      <section id="gallery" className="gallery-section">
        <div className="gallery-inner">
          <h2 className="gallery-title">Gallery</h2>
          <p className="gallery-subtitle">Photos coming soon.</p>
        </div>
      </section>
    );
  }

  const currentImage = allPhotos[index];

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  return (
    <section id="gallery" className="gallery-section">
      <div className="gallery-inner">
        <h2 className="gallery-title">Gallery</h2>
        <p className="gallery-subtitle">
          Real before &amp; after results from Brisbane homes.
        </p>

        {/* IMAGE + ARROWS */}
        <div className="gallery-frame">

          {/* PREV BUTTON LEFT */}
          <button className="gallery-arrow left" onClick={prev}>
            ←
          </button>

          {/* IMAGE */}
          <div className="gallery-main" onClick={() => setLightbox(currentImage)}>
            <img src={currentImage} className="gallery-main-image" alt="Gallery" />
          </div>

          {/* NEXT BUTTON RIGHT */}
          <button className="gallery-arrow right" onClick={next}>
            →
          </button>
        </div>

        <p className="gallery-page">
          Image {index + 1} of {total}
        </p>
      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <img src={lightbox} className="gallery-lightbox-img" />
        </div>
      )}
    </section>
  );
}
