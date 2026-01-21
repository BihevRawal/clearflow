import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { generateInvoice } from "../utils/generateInvoice";

export default function ClientConfirm() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const ref = doc(db, "jobs", id);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setJob(snap.data());
        }
      } catch (err) {
        console.error("Error fetching job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const confirmJob = async () => {
    try {
      await updateDoc(doc(db, "jobs", id), {
        clientConfirmed: true,
      });

      // 🔥 Generate invoice automatically
      generateInvoice(job);

      setDone(true);
    } catch (err) {
      console.error("Error confirming job:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid job link
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-3">
          Confirm Job Completion
        </h2>

        <p className="text-gray-600 mb-4">
          Hi <b>{job.name}</b>,  
          please confirm if your gutter cleaning job is completed.
        </p>

        {!done ? (
          <button
            onClick={confirmJob}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            ✅ Yes, Job Completed
          </button>
        ) : (
          <div>
            <p className="text-green-600 font-semibold mb-2">
              Thank you! Your invoice has been generated.
            </p>

            <p className="text-sm text-gray-500">
              You can download it from your device.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
