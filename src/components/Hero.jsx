export default function Hero() {
  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 text-white px-6
      animate-fadeIn">
      <div className="max-w-3xl text-center mx-auto">

        {/* BIG HERO LOGO */}
        <img
          src="/logo-clear.png"
          alt="ClearFlow Logo"
          className="h-64 w-auto mx-auto mb-3 animate-slideUp 
          drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]"
          style={{ minHeight: "256px" }}
        />

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight animate-slideUpSlow">
          Local Gutter & Roof Cleaning for Brisbane Homes
        </h1>

        <p className="mt-6 text-lg opacity-90 animate-slideUpSlower">
          Friendly Brisbane-owned small business servicing Brisbane South, Logan, 
          Ipswich & nearby suburbs.
        </p>

        <a
          href="#book"
          className="inline-block mt-8 px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition 
          animate-slideUpSlowest"
        >
          Get a Free Quote
        </a>
      </div>
    </section>
  );
}
