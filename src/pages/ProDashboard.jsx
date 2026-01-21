import { useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs
} from "firebase/firestore";
import { db } from "../firebase";

export default function ProDashboard() {
  const [jobs,setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const q = query(
        collection(db,"jobs"),
        where("assignedTo","==",auth.currentUser.uid)
      );

      const snap = await getDocs(q);
      setJobs(snap.docs.map(d=>d.data()));
    };

    fetchJobs();
  }, []);

  return (
    <div className="p-6">
      <h2>My Assigned Jobs</h2>

      {jobs.map((job,i)=>(
        <div key={i} className="job-card">
          <p>Client: {job.client}</p>
          <p>Date: {job.date}</p>
          <p>Status: {job.status}</p>
        </div>
      ))}
    </div>
  );
}
