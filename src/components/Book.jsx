import { useState } from "react";
import emailjs from "@emailjs/browser";

/* FIREBASE */
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

import "../css/Book.css";

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
      // SAVE TO FIREBASE
      await addDoc(collection(db, "jobs"), {
        name: form.name,
        phone: form.phone,
        address: form.address,
        message: form.message,
        status: "not_assigned",
        createdAt: new Date(),
      });

      // SEND EMAIL
      await emailjs.send(
        "service_a1e0bjo",
        "template_f2vhsfn",
        form
      );

      showToast("success", "Quote request sent! We'll contact you soon.");

      // RESET
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
      {/* MAIN SECTION */}
      <section id="book" className="book-section">
        <h2 className="book-title">Book / Quote</h2>

        <p className="book-subtitle">
          Fast, friendly and reliable gutter & roof cleaning across Brisbane.
        </p>

        <div className="book-actions">
          <button
            onClick={handleCallNow}
            className="btn btn-call"
          >
            📞 Call Now
          </button>

          <button
            onClick={openQuoteModal}
            className="btn btn-quote"
          >
            📝 Get a Quote
          </button>
        </div>
      </section>

      {/* FLOATING BUTTON */}
      <button
        type="button"
        onClick={openQuoteModal}
        className="floating-btn"
      >
        ⚡ Express Booking
      </button>

      {/* MODAL */}
      {open && (
        <div className="modal-bg">
          <div className="modal-box">

            <button
              onClick={() => setOpen(false)}
              className="modal-close"
            >
              ×
            </button>

            <h3 className="modal-title">
              Request a Free Quote
            </h3>

            <form onSubmit={sendEmail}>

              <input
                type="text"
                placeholder="Full Name"
                required
                className="form-input"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="tel"
                placeholder="Phone Number"
                required
                className="form-input"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Address / Suburb"
                required
                className="form-input"
                value={form.address}
                onChange={(e) =>
                  setForm({ ...form, address: e.target.value })
                }
              />

              <textarea
                placeholder="Details (optional)"
                className="form-textarea"
                rows="4"
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <div className="form-actions">

                <button
                  type="submit"
                  disabled={loading}
                  className={
                    loading
                      ? "btn-submit btn-disabled"
                      : "btn-submit"
                  }
                >
                  {loading ? "Sending…" : "Submit Quote Request"}
                </button>

                <p className="or-text">or</p>

                <button
                  type="button"
                  onClick={handleCallNow}
                  className="btn-alt"
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
        <div className="toast-wrapper">
          <div className={`toast ${toast.type}`}>

            <div className="toast-icon">
              {toast.type === "success" ? "✓" : "!"}
            </div>

            <p className="toast-msg">
              {toast.message}
            </p>

            <button
              onClick={() => setToast(null)}
              className="toast-close"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </>
  );
}
