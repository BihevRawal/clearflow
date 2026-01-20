import { useState } from "react";
import emailjs from "@emailjs/browser";

/* 🔥 FIREBASE */
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase"; // adjust path if needed

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
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 5000);
  };

  const handleCallNow = () => {
    showToast("success", "Calling GutterFlow…");
    setTimeout(() => {
      window.location.href = "tel:0404057541";
    }, 400);
  };

  const openQuoteModal = () => setOpen(true);

  /* ---------------------------
     SAVE JOB + SEND EMAIL
  --------------------------- */
  const sendEmail = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      /* SAVE JOB TO FIREBASE */
      await addDoc(collection(db, "jobs"), {
        name: form.name,
        phone: form.phone,
        address: form.address,
        message: form.message,
        status: "assigned",
        createdAt: new Date(),
      });

      /* SEND EMAIL */
      await emailjs.send(
        "service_a1e0bjo",
        "template_f2vhsfn",
        form
      );

      showToast("success", "Quote request sent! We'll contact you soon.");

      /* RESET */
      setOpen(false);
      setForm({
        name: "",
        phone: "",
        address: "",
        message: "",
      });

    } catch (error) {
      console.log("ERROR:", error);
      showToast("error", "Something went wrong. Please try again shortly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            onClick={openQuoteModal}
            className="px-10 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition text-lg"
          >
            📝 Get a Quote
          </button>
        </div>
      </section>

      {/* Floating Button */}
      <button
        type="button"
        onClick={openQuoteModal}
        className="
          fixed z-40
          flex items-center gap-2
          rounded-full
          px-4 py-3
          md:px-5 md:py-3
          bg-emerald-600 text-white text-sm md:text-base font-semibold
          shadow-xl hover:bg-emerald-700 transition

          bottom-0 mb-3 left-1/2 -translate-x-1/2

          max-[639px]:left-3 
          max-[639px]:-translate-x-0
          max-[639px]:right-auto
          max-[639px]:bottom-3
        "
      >
        <span className="text-lg">⚡</span>
        <span className="hidden sm:inline">Express Booking / Enquiry</span>
        <span className="sm:hidden">Enquiry</span>
      </button>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-start justify-center p-4 pt-20 z-[99999]">
          <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl relative mt-6 z-[100000]">

            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700 z-[100001]"
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
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="w-full p-3 border rounded-lg"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
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

              <div className="pt-2 space-y-2">

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

                <p className="text-xs text-gray-400 text-center">or</p>

                <button
                  type="button"
                  onClick={handleCallNow}
                  className="w-full py-3 text-white font-semibold rounded-lg shadow bg-emerald-600 hover:bg-emerald-700 transition"
                >
                  📞 Call Now
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100002] px-4">
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

            <p className="text-sm text-gray-800 text-left">
              {toast.message}
            </p>

            <button
              onClick={() => setToast(null)}
              className="ml-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
