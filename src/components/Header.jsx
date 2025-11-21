export default function Header() {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md shadow-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">ClearFlow</h1>

        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#about" className="hover:text-blue-600">About Us</a>
          <a href="#gallery" className="hover:text-blue-600">Gallery</a>
          <a href="#services" className="hover:text-blue-600">Services</a>
        </nav>

        <a
          href="#book"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Book Now
        </a>
      </div>
    </header>
  );
}
