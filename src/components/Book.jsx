import { useState } from "react";
import emailjs from "@emailjs/browser";

emailjs.init("t8dz5ZRkrVDoFKGn0");

export default function Book() {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  // toast = { type, message }
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });

    // Auto hide after 5 seconds
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // ------------------------
  // CALL NOW WITH TOAST
  // ------------------------
  const handleCallNow = () => {
    showToast("success", "Calling ClearFlow…");

    // Delay so toast is visible before dialer opens
    setTimeout(() => {
      window.location.href = "tel:0404057541";
    }, 400);
  };

  // ------------------------
  // SEND EMAIL QUOTE
  // ------------------------
  const sendEmail = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const templateParams = {
      name: form.name,
      phone: form.phone,
      address: form.address,
      message: form.message,
    };

    // Immediately close modal + clear form
    setOpen(false);
    setForm({
      name: "",
      phone: "",
      address: "",
      message: "",
    });

    try {
      await emailjs.send("service_a1e0bjo", "template_f2vhsfn", templateParams);
      showToast("success", "Quote request sent! We'll contact you soon.");
    } catch (error) {
      console.log("EMAILJS ERROR DETAILS:", error);
      showToast(
        "error",
        "Something went wrong sending your quote. Please try again shortly."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="book"
      className="py-24 px-6 bg-gradient-to-br from-blue-50 to-blue-100 text-center relative"
    >
      <h2 className="text-4xl font-bold text-gray-800">Book / Quote</h2>
      <p className="text-gray-600 mt-3 text-lg">
        Fast, friendly and reliable gutter & roof cleaning across Brisbane.
      </p>

      <div className="flex justify-center gap-6 mt-10 flex-wrap">
        <button
          onClick={handleCallNow}
          className="px-10 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition text-lg"
        >
          📞 Call Now
        </button>

        <button
          onClick={() => setOpen(true)}
          className="px-10 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition text-lg"
        >
          📝 Get a Quote
        </button>
      </div>

      {/* Quote Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl relative animate-fadeIn">
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
                className="w-full p-3 border rounded-lg"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full p-3 border rounded-lg"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />

              <input
                type="text"
                placeholder="Address / Suburb"
                required
                className="w-full p-3 border rounded-lg"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />

              <textarea
                placeholder="Details (optional)"
                className="w-full p-3 border rounded-lg"
                rows="4"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 text-white font-semibold rounded-lg shadow transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Sending…" : "Submit Quote Request"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Premium Toast UI */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4">
          <div
            className={`max-w-md mx-auto rounded-2xl border shadow-xl backdrop-blur bg-white/90 flex items-start gap-3 px-4 py-3 ${
              toast.type === "success"
                ? "border-emerald-200"
                : "border-red-200"
            }`}
          >
            <div
              className={`mt-0.5 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold ${
                toast.type === "success"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {toast.type === "success" ? "✓" : "!"}
            </div>
            <p className="text-sm text-gray-800 text-left">{toast.message}</p>

            <button
              onClick={() => setToast(null)}
              className="ml-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
