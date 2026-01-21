import { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../css/WorkPortal.css";

export default function WorkPortal() {
  const navigate = useNavigate();
  const pro = JSON.parse(localStorage.getItem("proUser"));
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (!pro) {
      navigate("/login");
      return;
    }

    // ✅ fetch inside effect
    const fetchJobs = async () => {
      const q = query(
        collection(db, "jobs"),
        where("assignedTo", "==", pro.name)
      );

      const snap = await getDocs(q);
      setJobs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };

    fetchJobs();
  }, []);

  const updateStatus = async (id, status) => {
    await updateDoc(doc(db, "jobs", id), { status });

    // reload jobs
    const q = query(
      collection(db, "jobs"),
      where("assignedTo", "==", pro.name)
    );

    const snap = await getDocs(q);
    setJobs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  };

  const logout = () => {
    localStorage.removeItem("proUser");
    navigate("/login");
  };

  return (
    <div className="portal">
      <div className="top">
        <h2>Welcome {pro?.name}</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {jobs.length === 0 && (
        <p style={{ marginTop: "20px" }}>
          No jobs assigned yet.
        </p>
      )}

      {jobs.map(j => (
        <div key={j.id} className="job">
          <p><b>Client:</b> {j.name}</p>
          <p><b>Address:</b> {j.address}</p>
          <p><b>Status:</b> {j.status}</p>

          <div className="actions">
            <button
              onClick={() => updateStatus(j.id, "completed")}
              className="green"
            >
              Completed
            </button>

            <button
              onClick={() => updateStatus(j.id, "aborted")}
              className="red"
            >
              Abort
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
