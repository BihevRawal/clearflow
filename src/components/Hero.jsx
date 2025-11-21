export default function Hero() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Professional Gutter Cleaning Services
        </h1>
        <p className="mt-6 text-lg opacity-90">
          Keep your home safe with reliable, affordable, and fast gutter cleaning.
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
