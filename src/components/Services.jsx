export default function Services() {
  const items = [
    { title: "Gutter Cleaning", desc: "Thorough gutter and downpipe cleaning to prevent floods and water damage." },
    { title: "Roof Debris Removal", desc: "Safe clearing of leaves and branches from all roof types." },
    { title: "Gutter Guard Install", desc: "Quality gutter guard options to reduce cleaning frequency." },
    { title: "Free Roof Check", desc: "Quick inspection for cracks, tile issues, and blocked drains." }
  ];

  return (
    <section id="services" className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12 px-4">
          {items.map((s, i) => (
            <div key={i} className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-2xl font-semibold text-blue-700">{s.title}</h3>
              <p className="mt-3 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
