import { useState, useRef } from "react";

export default function Gallery() {

  // --- LIGHTBOX STATE (correct one) ---
  const [selectedImg, setSelectedImg] = useState(null);

  // Auto-load all images from /public/gallery
  const importImages = () => {
    const images = import.meta.glob("/public/gallery/*.{jpg,jpeg,png,webp}", {
      eager: true,
    });
    return Object.values(images).map((img) => img.default);
  };

  const allPhotos = importImages();

  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(allPhotos.length / ITEMS_PER_PAGE);

  const [page, setPage] = useState(0);

  const start = page * ITEMS_PER_PAGE;
  const currentImages = allPhotos.slice(start, start + ITEMS_PER_PAGE);

  // --- INFINITE LOOPING NEXT PAGE ---
  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  // --- INFINITE LOOPING PREVIOUS PAGE ---
  const prevPage = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // --- SWIPE SUPPORT ---
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) < 50) return;

    if (swipeDistance > 50) {
      nextPage(); // swipe left
    } else {
      prevPage(); // swipe right
    }
  };

  return (
    <section
      id="gallery"
      className="py-20 px-6 bg-gray-50"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Gallery</h2>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-10">
          {currentImages.map((src, i) => (
            <div
              key={i}
              onClick={() => setSelectedImg(src)}
              className="w-full h-44 bg-gray-300 rounded-lg shadow cursor-pointer overflow-hidden hover:opacity-90 transition"
            >
              <img
                src={src}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevPage}
            className="px-5 py-2 bg-white rounded-md shadow hover:bg-gray-100 transition"
          >
            ← Previous
          </button>

          <button
            onClick={nextPage}
            className="px-5 py-2 bg-white rounded-md shadow hover:bg-gray-100 transition"
          >
            Next →
          </button>
        </div>

        {/* PAGE INDICATOR */}
        <p className="mt-6 text-gray-500 text-sm">
          Page {page + 1} of {totalPages}
        </p>
      </div>

      {/* LIGHTBOX */}
      {selectedImg && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 cursor-pointer"
          onClick={() => setSelectedImg(null)}
        >
          <img
            src={selectedImg}
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </section>
  );
}
