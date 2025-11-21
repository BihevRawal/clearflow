export default function Hero() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Professional Gutter & Roofing Cleaning
        </h1>
        <p className="mt-6 text-lg opacity-90">
          Fast, reliable and affordable services to protect your home from leaks,
          pests, and water damage.
        </p>

        <a
          href="#book"
          className="inline-block mt-8 px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}
