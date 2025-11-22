import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full h-20 bg-white/80 backdrop-blur-md shadow-sm fixed top-0 z-50 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">

        {/* LOGO + TITLE */}
        <div className="relative flex items-center">

          {/* BIG FLOATING LOGO (slightly higher now) */}
          <img
            src="/logo-clear.png"
            alt="ClearFlow Logo"
            className="h-40 w-auto absolute -top-16 left-0"
          />

          {/* Spacing so text doesn't overlap the logo */}
          <div className="pl-44">
            <h1 className="text-xl md:text-2xl font-bold text-blue-700 leading-tight">
              ClearFlow
              <span className="text-gray-700"> Roof & Gutter</span>
            </h1>
          </div>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#services" className="hover:text-blue-600">Services</a>
          <a href="#gallery" className="hover:text-blue-600">Gallery</a>
        </nav>

        {/* DESKTOP BUTTON */}
        <a
          href="#book"
          className="hidden md:block px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Book Now
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white shadow-sm mt-2">
          <nav className="flex flex-col text-gray-800 font-medium px-6 pb-4">
            <a href="#about" className="py-2" onClick={() => setOpen(false)}>About</a>
            <a href="#services" className="py-2" onClick={() => setOpen(false)}>Services</a>
            <a href="#gallery" className="py-2" onClick={() => setOpen(false)}>Gallery</a>
            <a
              href="#book"
              className="mt-3 px-5 py-2 bg-blue-600 text-white rounded-lg text-center"
              onClick={() => setOpen(false)}
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
