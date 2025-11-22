import { useState } from "react";
import emailjs from "emailjs-com";

export default function Book() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_6jg51nv",    // Your Service ID
        "template_f2j5hzg",   // Your Template ID
        {
          name: form.name,
          phone: form.phone,
          address: form.address,
          message: form.message,
        },
        "t8dz5ZRkrVDoFKGn0"    // Your Public Key
      )
      .then(
        () => {
          alert("Quote request sent! We'll contact you soon.");
          setOpen(false);
          setForm({ name: "", phone: "", address: "", message: "" });
        },
        () => {
          alert("Something went wrong. Try again later.");
        }
      );
  };

  return (
    <section
      id="book"
      className="py-24 px-6 bg-gradient-to-br from-blue-50 to-blue-100 text-center"
    >
      <h2 className="text-4xl font-bold text-gray-800">Book / Quote</h2>
      <p className="text-gray-600 mt-3 text-lg">
        Fast, friendly and reliable gutter & roof cleaning across Brisbane.
      </p>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-10 flex-wrap">

        {/* CALL NOW BUTTON */}
        <a
          href="tel:0400000000"
          className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition text-lg"
        >
          📞 Call Now
        </a>

        {/* GET QUOTE BUTTON */}
        <button
          onClick={() => setOpen(true)}
          className="px-10 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition text-lg"
        >
          📝 Get a Quote
        </button>
      </div>

      {/* QUOTE FORM MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl relative animate-fadeIn">

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Request a Free Quote
            </h3>

            <form onSubmit={sendEmail} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                value={form.name}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                value={form.phone}
              />

              <input
                type="text"
                placeholder="Address / Suburb"
                required
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                value={form.address}
              />

              <textarea
                placeholder="Details (optional)"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                value={form.message}
              />

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
              >
                Submit Quote Request
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
