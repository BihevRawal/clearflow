export default function Services() {
  const services = [
    { title: "Gutter Cleaning", desc: "Full gutter and downpipe cleaning to prevent water damage." },
    { title: "Roof Debris Removal", desc: "Safe removal of leaves, dirt, branches, and rooftop waste." },
    { title: "Gutter Guard Installation", desc: "Protective mesh installation to reduce future maintenance." },
    { title: "Roof Inspection", desc: "Check for leaks, weak spots, and potential issues." }
  ];

  return (
    <section id="services" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
          {services.map((s, i) => (
            <div key={i} className="p-8 bg-gray-100 rounded-xl shadow-sm hover:shadow-md transition">
              <h3 className="text-2xl font-semibold text-blue-700">{s.title}</h3>
              <p className="mt-3 text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
