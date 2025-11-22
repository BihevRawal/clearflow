export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">

        {/* LOGO */}
<img 
  src="/logo-clear.png" 
  alt="ClearFlow Logo"
  className="h-56 w-auto mb-1"
  style={{ minHeight: "224px" }}
/>


        <h3 className="text-xl font-semibold text-white">
          ClearFlow Roof & Gutter
        </h3>

        <p className="mt-4 opacity-70">
          Local Brisbane small business • Friendly service • Honest pricing
        </p>

        <p className="mt-1 opacity-70">
          Servicing Brisbane South, Logan, Ipswich & nearby suburbs
        </p>

        <p className="mt-6 text-sm opacity-50">
          © {new Date().getFullYear()} ClearFlow. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
