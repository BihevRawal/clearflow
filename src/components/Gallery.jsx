export default function Gallery() {
  return (
    <section id="gallery" className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800">Our Work</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {[1,2,3,4,5,6].map((i) => (
            <div
              key={i}
              className="w-full h-48 bg-gray-200 rounded-lg shadow"
            ></div>
          ))}
        </div>

        <p className="mt-6 text-gray-500">Upload your real photos later.</p>
      </div>
    </section>
  );
}
