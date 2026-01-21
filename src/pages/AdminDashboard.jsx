import { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import bcrypt from "bcryptjs";

import { db, auth } from "../firebase";
import "../css/AdminDashboard.css";

export default function AdminDashboard() {
  const [tab, setTab] = useState("unassigned"); // unassigned | assigned
  const [loading, setLoading] = useState(true);

  const [jobs, setJobs] = useState([]);
  const [members, setMembers] = useState([]);

  // Members UI
  const [membersOpen, setMembersOpen] = useState(false);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Add/Edit member form
  const [mForm, setMForm] = useState({
    name: "",
    username: "",
    email: "",
    profession: "Gutter Pro",
    secretKey: "",
  });

  // ---- LOAD DATA ----
  const reloadAll = async () => {
    const [jobsSnap, membersSnap] = await Promise.all([
      getDocs(collection(db, "jobs")),
      getDocs(collection(db, "professionals")),
    ]);

    setJobs(jobsSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setMembers(membersSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    const boot = async () => {
      setLoading(true);
      await reloadAll();
      setLoading(false);
    };
    boot();
  }, []);

  // ---- DERIVED LISTS ----
  const unassignedJobs = useMemo(
    () => jobs.filter((j) => !j.assignedToEmail && j.status !== "declined"),
    [jobs]
  );

  const assignedJobs = useMemo(
    () => jobs.filter((j) => !!j.assignedToEmail && j.status !== "declined"),
    [jobs]
  );

  // ---- LOGOUT ----
  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // ---- JOB ACTIONS ----
  const deleteJob = async (jobId) => {
    if (!window.confirm("Delete this quote/job?")) return;
    await deleteDoc(doc(db, "jobs", jobId));
    await reloadAll();
  };

  const assignJob = async (jobId, memberId) => {
    if (!memberId) return;

    const m = members.find((x) => x.id === memberId);
    if (!m) return;

    await updateDoc(doc(db, "jobs", jobId), {
      assignedToId: m.id,
      assignedToEmail: m.email,
      assignedToName: m.name || m.username || m.email,
      assignedToProfession: m.profession || "",
      status: "assigned",
      assignedAt: serverTimestamp(),
    });

    await reloadAll();
  };

  const saveJobNote = async (jobId, noteValue) => {
    await updateDoc(doc(db, "jobs", jobId), {
      adminNote: noteValue || "",
      noteUpdatedAt: serverTimestamp(),
    });
    // update local for instant UI
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, adminNote: noteValue } : j))
    );
  };

  // ---- MEMBER ACTIONS ----
  const openAddMember = () => {
    setEditingMember(null);
    setMForm({
      name: "",
      username: "",
      email: "",
      profession: "Gutter Pro",
      secretKey: "",
    });
    setMemberModalOpen(true);
  };

  const openEditMember = (m) => {
    setEditingMember(m);
    setMForm({
      name: m.name || "",
      username: m.username || "",
      email: m.email || "",
      profession: m.profession || "Gutter Pro",
      secretKey: "", // must re-enter to change
    });
    setMemberModalOpen(true);
  };

  const upsertMember = async (e) => {
    e.preventDefault();

    if (!mForm.email) return alert("Email is required");
    if (!mForm.username) return alert("Username is required");

    // When adding member, secretKey required. When editing, optional.
    if (!editingMember && !mForm.secretKey) {
      return alert("Secret Key is required for new members.");
    }

    const payload = {
      name: mForm.name.trim(),
      username: mForm.username.trim(),
      email: mForm.email.trim().toLowerCase(),
      profession: mForm.profession,
      role: "pro",
    };

    if (mForm.secretKey) {
      const hashed = await bcrypt.hash(mForm.secretKey, 10);
      payload.secretKey = hashed;
    }

    if (editingMember) {
      await updateDoc(doc(db, "professionals", editingMember.id), payload);
    } else {
      await addDoc(collection(db, "professionals"), {
        ...payload,
        createdAt: serverTimestamp(),
      });
    }

    setMemberModalOpen(false);
    setEditingMember(null);
    await reloadAll();
  };

  const deleteMember = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    await deleteDoc(doc(db, "professionals", id));
    await reloadAll();
  };

  // ---- UI ----
  if (loading) {
    return (
      <div className="ad-shell">
        <div className="ad-topbar">
          <div className="ad-titleBlock">
            <h1>Admin Dashboard</h1>
            <p>Loading…</p>
          </div>
        </div>
        <div className="ad-loadingCard">Fetching jobs & members…</div>
      </div>
    );
  }

  return (
    <div className="ad-shell">
      {/* TOP BAR */}
      <div className="ad-topbar">
        <div className="ad-titleBlock">
          <h1>Admin Dashboard</h1>
          <p>Quotes → Assign → Track (notes + members)</p>
        </div>

        <div className="ad-actions">
          <button className="btn btnPrimary" onClick={openAddMember}>
            + Add Member
          </button>

          <button className="btn btnSoft" onClick={() => setMembersOpen(true)}>
            See All Members
          </button>

          <button className="btn btnDanger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {/* TABS */}
      <div className="ad-tabs">
        <button
          className={`tab ${tab === "unassigned" ? "active" : ""}`}
          onClick={() => setTab("unassigned")}
        >
          Not Assigned <span className="pill">{unassignedJobs.length}</span>
        </button>

        <button
          className={`tab ${tab === "assigned" ? "active" : ""}`}
          onClick={() => setTab("assigned")}
        >
          Assigned <span className="pill">{assignedJobs.length}</span>
        </button>
      </div>

      {/* JOB LIST */}
      <div className="ad-grid">
        {(tab === "unassigned" ? unassignedJobs : assignedJobs).map((j) => (
          <JobCard
            key={j.id}
            job={j}
            tab={tab}
            members={members}
            onDelete={() => deleteJob(j.id)}
            onAssign={(memberId) => assignJob(j.id, memberId)}
            onSaveNote={(note) => saveJobNote(j.id, note)}
          />
        ))}

        {(tab === "unassigned" ? unassignedJobs : assignedJobs).length === 0 && (
          <div className="ad-empty">
            No jobs in this tab right now.
          </div>
        )}
      </div>

      {/* MEMBERS SLIDER */}
      {membersOpen && (
        <div className="sliderWrap" onClick={() => setMembersOpen(false)}>
          <aside className="slider" onClick={(e) => e.stopPropagation()}>
            <div className="sliderHead">
              <div>
                <h3>Members</h3>
                <p>Edit details, update secret key, delete users</p>
              </div>
              <button className="iconBtn" onClick={() => setMembersOpen(false)}>
                ✕
              </button>
            </div>

            <div className="memberList">
              {members.map((m) => (
                <div className="memberRow" key={m.id}>
                  <div className="memberInfo">
                    <div className="memberName">
                      {m.name || m.username || "Unnamed"}
                    </div>
                    <div className="memberMeta">
                      <span>{m.profession || "—"}</span>
                      <span>•</span>
                      <span>{m.email}</span>
                    </div>
                    <div className="memberMeta small">
                      Username: <b>{m.username || "—"}</b>
                    </div>
                  </div>

                  <div className="memberBtns">
                    <button className="btnMini" onClick={() => openEditMember(m)}>
                      Edit
                    </button>
                    <button className="btnMini danger" onClick={() => deleteMember(m.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {members.length === 0 && (
                <div className="ad-empty" style={{ marginTop: 10 }}>
                  No members yet. Click “Add Member”.
                </div>
              )}
            </div>
          </aside>
        </div>
      )}

      {/* ADD/EDIT MEMBER MODAL */}
      {memberModalOpen && (
        <div className="modalWrap" onClick={() => setMemberModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHead">
              <h3>{editingMember ? "Edit Member" : "Add Member"}</h3>
              <button className="iconBtn" onClick={() => setMemberModalOpen(false)}>
                ✕
              </button>
            </div>

            <form className="form" onSubmit={upsertMember}>
              <div className="row2">
                <div>
                  <label>Name</label>
                  <input
                    value={mForm.name}
                    onChange={(e) => setMForm((p) => ({ ...p, name: e.target.value }))}
                    placeholder="e.g. John"
                  />
                </div>

                <div>
                  <label>Username</label>
                  <input
                    value={mForm.username}
                    onChange={(e) => setMForm((p) => ({ ...p, username: e.target.value }))}
                    placeholder="e.g. john.gutter"
                    required
                  />
                </div>
              </div>

              <div>
                <label>Email</label>
                <input
                  value={mForm.email}
                  onChange={(e) => setMForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="e.g. john@email.com"
                  required
                />
              </div>

              <div className="row2">
                <div>
                  <label>Profession</label>
                  <select
                    value={mForm.profession}
                    onChange={(e) => setMForm((p) => ({ ...p, profession: e.target.value }))}
                  >
                    <option>Gutter Pro</option>
                    <option>Carpet Pro</option>
                    <option>Pest Pro</option>
                  </select>
                </div>

                <div>
                  <label>
                    Secret Key {editingMember ? "(leave blank to keep)" : ""}
                  </label>
                  <input
                    type="password"
                    value={mForm.secretKey}
                    onChange={(e) => setMForm((p) => ({ ...p, secretKey: e.target.value }))}
                    placeholder={editingMember ? "••••••••" : "Set a secret key"}
                    required={!editingMember}
                  />
                </div>
              </div>

              <div className="modalBtns">
                <button className="btn btnPrimary" type="submit">
                  {editingMember ? "Save Changes" : "Create Member"}
                </button>

                <button
                  className="btn btnSoft"
                  type="button"
                  onClick={() => setMemberModalOpen(false)}
                >
                  Cancel
                </button>
              </div>

              <div className="hint">
                Members login via <b>/login → Professional</b> using <b>Email + Secret Key</b>.
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function JobCard({ job, tab, members, onDelete, onAssign, onSaveNote }) {
  const [note, setNote] = useState(job.adminNote || "");
  const [saving, setSaving] = useState(false);

  const displayName = job.name || "—";
  const displayPhone = job.phone || "—";
  const displayAddress = job.address || "—";
  const displayMessage = job.message || job.details || "";

  const assignedLabel =
    job.assignedToName || job.assignedToEmail
      ? `${job.assignedToName || ""}${job.assignedToEmail ? ` (${job.assignedToEmail})` : ""}`
      : "Not assigned";

  const save = async () => {
    setSaving(true);
    await onSaveNote(note);
    setSaving(false);
  };

  return (
    <div className="jobCard">
      <div className="jobTop">
        <div className="jobTitle">
          <div className="jobName">{displayName}</div>
          <div className="jobMeta">
            <span>{displayPhone}</span>
            <span>•</span>
            <span>{displayAddress}</span>
          </div>
        </div>

        <button className="iconBtn danger" onClick={onDelete} title="Delete job">
          🗑
        </button>
      </div>

      {displayMessage && <div className="jobMsg">{displayMessage}</div>}

      <div className="jobRow">
        <div className="badge">
          {tab === "assigned" ? "Assigned" : "Not assigned"}
        </div>

        {tab === "assigned" && (
          <div className="assignedTo">
            Assigned to: <b>{assignedLabel}</b>
          </div>
        )}
      </div>

      {tab === "unassigned" && (
        <div className="assignRow">
          <label>Assign to</label>
          <select
            defaultValue=""
            onChange={(e) => onAssign(e.target.value)}
          >
            <option value="">Select member…</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {(m.name || m.username || m.email) + " • " + (m.profession || "")}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="noteBox">
        <div className="noteHead">
          <label>Admin Note</label>
          <button className="btnMini" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </button>
        </div>

        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Add note like: customer confirmed 3pm, bring ladder, dog in yard…"
        />
      </div>
    </div>
  );
}
