import "../css/About.css";

const riskSlides = [
  {
    title: "Overflowing gutters = water inside your home",
    description:
      "Blocked gutters force water back under your roofline, soaking ceilings, walls and insulation. One storm can turn a small blockage into a very expensive leak.",
    image: "/gallery/about gallery/risk-overflowing-gutter.jpg",
    alt:"Overflowing gutter during heavy rain on a brisbane home"
  },
  {
    title: "Rotten fascia & sagging gutters",
    description:
      "Constantly full gutters stay wet, slowly rotting the timber behind them. Sagging, rusty gutters eventually snap and fall — often needing full replacement.",
    image: "/gallery/about gallery/risk-rotten-fascia.jpg",
    alt: "risk of rotten fascia in brisbane home"
  },
  {
    title: "Mould, damp & pests",
    description:
      "Hidden moisture from roof leaks creates the perfect home for mould, cockroaches and mosquitoes. You don’t see it straight away — you feel it later in your health.",
    image: "/gallery/about gallery/risk-mould-inside.jpg",
    alt: "risk of mould inside Brisbane home"
  },
  {
    title: "Water around foundations & driveways",
    description:
      "When gutters overflow for months, water pools around the base of your home, cracking concrete, shifting soil and damaging paths, driveways and foundations.",
    image: "/gallery/about gallery/risk-foundation-water.jpg",
    alt:"risk of gathering water on foundation and driveway in Brisbane home"
  },
  {
    title: "Dry leaf build-up increases fire risk",
    description:
      "Dry leaves sitting in gutters and on roofs can ignite quickly in the wrong conditions. A simple clean can dramatically reduce that risk.",
    image: "/gallery/about gallery/risk-bushfire-gutter.jpg",
    alt: "risk of bushfire because of dry leaves gathered on roof of brisbane home"
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-900 text-center">
          About ClearFlow
        </h2>

        <p className="mt-6 text-gray-600 leading-relaxed text-lg text-center">
          ClearFlow started because we kept seeing the same thing across
          Brisbane — gutters left “for later” causing thousands of dollars in
          hidden damage. Small blockages slowly turned into roof leaks, rotten
          timber, mould and stress for families.
        </p>

        <p className="mt-4 text-gray-600 leading-relaxed text-lg text-center">
          We built ClearFlow to be a friendly, local team that focuses on{" "}
          <span className="font-semibold text-gray-800">
            prevention instead of emergency repairs
          </span>
          . That’s why we don’t just clean gutters — we also help with roof
          checks, downpipes, minor debris removal and other services designed to
          protect your home and save you money in the long run.
        </p>

        {/* RISK SLIDER */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            What happens if you ignore your gutters?
          </h3>
          <p className="mt-3 text-gray-600 text-center max-w-3xl mx-auto">
            Most damage starts quietly. These are some of the real risks we see
            every year in Brisbane homes when gutters and roofs aren’t serviced
            on time.
          </p>

          <div className="risk-slider-wrapper">
            <div className="risk-slider">
              {riskSlides.map((slide, index) => (
                <article
                  key={index}
                  className="risk-slide"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                >
                  <div className="risk-slide-overlay" />
                  <div className="risk-slide-content">
                    <h4 className="risk-slide-title">{slide.title}</h4>
                    <p className="risk-slide-text">{slide.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <p className="mt-8 text-gray-700 text-center text-base md:text-lg">
            A regular ClearFlow service costs far less than fixing leaks,
            replacing gutters or repairing damaged interiors.{" "}
            <span className="font-semibold">
              Look after your gutters now, so they can look after your home
              later.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
