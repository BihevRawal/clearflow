export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">

      {/* MAIN BLURRED BACKGROUND */}
      <div
        className="hero-bg"
        style={{
          backgroundImage: "url('/mascot.png')",
        }}
      ></div>

      {/* PARALLAX LAYER */}
      <div
        className="hero-parallax"
        style={{
          backgroundImage: "url('/mascot.png')",
        }}
      ></div>

      {/* MOVING CLOUDS */}
      <div className="hero-clouds"></div>

      {/* LIGHT RAYS */}
      <div className="hero-rays"></div>

      {/* VIGNETTE EDGES */}
      <div className="hero-vignette"></div>

      {/* WATERMARK MASCOT */}
      <img
        src="/brisbane-mascot.png"
        className="hero-watermark"
        alt="Brisbane Watermark"
      />

      {/* OPTIONAL SKYLINE */}
      {/* <img src="/brisbane-skyline.png" className="hero-skyline" /> */}

      {/* CONTENT */}
      <div className="relative max-w-3xl text-center mx-auto pt-[450px]">

        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#0a2540] drop-shadow-lg">
          For Brisbane Homes
        </h1>

        <p className="mt-6 text-lg opacity-90 text-[#1a1a1a] drop-shadow-lg">
          Friendly Brisbane-owned small business servicing Brisbane South,
          Logan, Ipswich & nearby suburbs.
        </p>

        <a
  href="#book"
  className="inline-block mt-2 px-8 py-3 bg-[#1a3f8b] text-white font-semibold rounded-lg shadow hover:bg-[#16356f] transition"
>
  Get a Free Quote
</a>

      </div>
    </section>
  );
}
