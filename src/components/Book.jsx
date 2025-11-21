export default function Book() {
  return (
    <section id="book" className="py-20 px-6 bg-blue-600 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold">Book Your Service</h2>
        <p className="mt-4 opacity-90">
          Call or message us to schedule your gutter & roofing service.
        </p>

        <a
          href="tel:0400000000"
          className="inline-block mt-8 px-10 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100"
        >
          Call Now
        </a>
      </div>
    </section>
  );
}
