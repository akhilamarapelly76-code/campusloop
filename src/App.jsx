 import { useState } from "react";

const CATEGORIES = ["All", "Laptop", "Monitor", "Keyboard", "Mouse", "Headset", "Tablet", "Other"];

const SAMPLE_DEVICES = [
  { id: 1, name: "Dell XPS 15", category: "Laptop", status: "Available", assignedTo: "" },
  { id: 2, name: 'LG UltraWide 34"', category: "Monitor", status: "In Use", assignedTo: "Rahul S." },
  { id: 3, name: "Logitech MX Keys", category: "Keyboard", status: "Available", assignedTo: "" },
  { id: 4, name: "MX Master 3", category: "Mouse", status: "Available", assignedTo: "" },
  { id: 5, name: "Sony WH-1000XM5", category: "Headset", status: "In Use", assignedTo: "Priya K." },
  { id: 6, name: 'iPad Pro 12.9"', category: "Tablet", status: "Available", assignedTo: "" },
];

const STATUS_COLORS = {
  Available: { bg: "#d1fae5", text: "#065f46" },
  "In Use": { bg: "#fee2e2", text: "#991b1b" },
  Requested: { bg: "#fef3c7", text: "#92400e" },
};

const ICONS = { Laptop: "💻", Monitor: "🖥️", Keyboard: "⌨️", Mouse: "🖱️", Headset: "🎧", Tablet: "📱", Other: "📦" };

const inputStyle = {
  width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid #e2e8f0",
  fontSize: 15, fontFamily: "inherit", color: "#0f172a", outline: "none",
  background: "#f8fafc", boxSizing: "border-box",
};

function Toast({ toasts, remove }) {
  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
      {toasts.map(t => (
        <div key={t.id} onClick={() => remove(t.id)} style={{
          background: t.type === "success" ? "#0f172a" : "#1e293b",
          color: "#f8fafc", padding: "14px 20px", borderRadius: 12, fontSize: 14,
          fontWeight: 500, display: "flex", alignItems: "center", gap: 10,
          boxShadow: "0 8px 32px rgba(0,0,0,0.25)", cursor: "pointer", minWidth: 260,
          borderLeft: `4px solid ${t.type === "success" ? "#34d399" : t.type === "info" ? "#60a5fa" : "#f87171"}`,
        }}>
          <span>{t.type === "success" ? "✅" : t.type === "info" ? "ℹ️" : "❌"}</span>
          {t.message}
        </div>
      ))}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 480,
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)", fontFamily: "inherit",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0f172a" }}>{title}</h2>
          <button onClick={onClose} style={{ border: "none", background: "#f1f5f9", cursor: "pointer", borderRadius: 8, width: 32, height: 32, fontSize: 16 }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {children}
    </div>
  );
}

function DeviceCard({ device, onRequest, onDelete }) {
  const sc = STATUS_COLORS[device.status] || STATUS_COLORS["Available"];
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "20px 22px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1.5px solid #f1f5f9",
      display: "flex", flexDirection: "column", gap: 12,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 26 }}>{ICONS[device.category] || "📦"}</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{device.name}</div>
            <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{device.category}</div>
          </div>
        </div>
        <span style={{ background: sc.bg, color: sc.text, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99 }}>{device.status}</span>
      </div>
      {device.assignedTo && <div style={{ fontSize: 13, color: "#64748b" }}>👤 Assigned to <strong>{device.assignedTo}</strong></div>}
      <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
        <button
          onClick={() => onRequest(device)}
          disabled={device.status !== "Available"}
          style={{
            flex: 1, padding: "9px 0", borderRadius: 10, border: "none",
            cursor: device.status === "Available" ? "pointer" : "not-allowed",
            background: device.status === "Available" ? "#0f172a" : "#e2e8f0",
            color: device.status === "Available" ? "#fff" : "#94a3b8",
            fontWeight: 600, fontSize: 13, fontFamily: "inherit",
          }}
        >
          {device.status === "Available" ? "Request" : "Unavailable"}
        </button>
        <button onClick={() => onDelete(device.id)} style={{
          padding: "9px 14px", borderRadius: 10, border: "1.5px solid #fee2e2",
          background: "#fff5f5", color: "#ef4444", cursor: "pointer", fontWeight: 600, fontSize: 13,
        }}>🗑</button>
      </div>
    </div>
  );
}

export default function DeviceManager() {
  const [devices, setDevices] = useState(SAMPLE_DEVICES);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState("dashboard");
  const [toasts, setToasts] = useState([]);
  const [requestModal, setRequestModal] = useState(null);
  const [requestName, setRequestName] = useState("");
  const [requestReason, setRequestReason] = useState("");
  const [form, setForm] = useState({ name: "", category: "Laptop", assignedTo: "" });
  const [formError, setFormError] = useState("");

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const filtered = devices.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || d.category === category;
    return matchSearch && matchCat;
  });

  const handleAddDevice = () => {
    if (!form.name.trim()) { setFormError("Device name is required."); return; }
    setFormError("");
    setDevices(prev => [{ id: Date.now(), name: form.name.trim(), category: form.category, status: form.assignedTo.trim() ? "In Use" : "Available", assignedTo: form.assignedTo.trim() }, ...prev]);
    setForm({ name: "", category: "Laptop", assignedTo: "" });
    addToast("Device added successfully!", "success");
    setPage("dashboard");
  };

  const handleRequest = () => {
    if (!requestName.trim()) return;
    setDevices(prev => prev.map(d => d.id === requestModal.id ? { ...d, status: "Requested", assignedTo: requestName.trim() } : d));
    setRequestModal(null); setRequestName(""); setRequestReason("");
    addToast("Request Sent Successfully! 🎉", "success");
  };

  const handleDelete = id => {
    setDevices(prev => prev.filter(d => d.id !== id));
    addToast("Device removed.", "info");
  };

  const stats = {
    total: devices.length,
    available: devices.filter(d => d.status === "Available").length,
    inUse: devices.filter(d => d.status === "In Use").length,
    requested: devices.filter(d => d.status === "Requested").length,
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
        body { background: #f1f5f9; }
        input:focus, select:focus, textarea:focus { border-color: #6366f1 !important; outline: none; }
      `}</style>

      <Toast toasts={toasts} remove={id => setToasts(prev => prev.filter(t => t.id !== id))} />

      {requestModal && (
        <Modal title={`Request: ${requestModal.name}`} onClose={() => setRequestModal(null)}>
          <Field label="Your Name *">
            <input style={inputStyle} placeholder="e.g. Sanjay Kumar" value={requestName} onChange={e => setRequestName(e.target.value)} />
          </Field>
          <Field label="Reason (optional)">
            <textarea style={{ ...inputStyle, resize: "vertical", minHeight: 80 }} placeholder="Why do you need this device?" value={requestReason} onChange={e => setRequestReason(e.target.value)} />
          </Field>
          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            <button onClick={() => setRequestModal(null)} style={{ flex: 1, padding: "11px 0", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#64748b" }}>Cancel</button>
            <button onClick={handleRequest} disabled={!requestName.trim()} style={{ flex: 2, padding: "11px 0", borderRadius: 10, border: "none", background: !requestName.trim() ? "#e2e8f0" : "#6366f1", color: !requestName.trim() ? "#94a3b8" : "#fff", cursor: !requestName.trim() ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 14 }}>Send Request</button>
          </div>
        </Modal>
      )}

      <div style={{ minHeight: "100vh", background: "#f1f5f9" }}>
        {/* Sidebar */}
        <div style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: 220, background: "#0f172a", padding: "28px 16px", display: "flex", flexDirection: "column", gap: 4, zIndex: 100 }}>
          <div style={{ color: "#f8fafc", fontWeight: 800, fontSize: 18, padding: "0 10px 24px" }}>📋 DeviceHub</div>
          {[{ key: "dashboard", icon: "🏠", label: "Dashboard" }, { key: "add", icon: "➕", label: "Add Device" }].map(item => (
            <button key={item.key} onClick={() => setPage(item.key)} style={{
              display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer",
              background: page === item.key ? "#6366f1" : "transparent",
              color: page === item.key ? "#fff" : "#94a3b8",
              fontWeight: page === item.key ? 700 : 500, fontSize: 14, textAlign: "left",
            }}>{item.icon} {item.label}</button>
          ))}
          <div style={{ marginTop: "auto", padding: "12px 14px", background: "#1e293b", borderRadius: 10 }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>Quick Stats</div>
            <div style={{ color: "#f8fafc", fontSize: 13 }}>Total: <strong>{stats.total}</strong></div>
            <div style={{ color: "#34d399", fontSize: 13 }}>Free: <strong>{stats.available}</strong></div>
            <div style={{ color: "#f87171", fontSize: 13 }}>In Use: <strong>{stats.inUse}</strong></div>
          </div>
        </div>

        {/* Main */}
        <div style={{ marginLeft: 220, padding: "36px 36px 60px" }}>

          {page === "dashboard" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <div>
                  <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>All Devices</h1>
                  <p style={{ color: "#64748b", fontSize: 14, marginTop: 4 }}>{filtered.length} device{filtered.length !== 1 ? "s" : ""} found</p>
                </div>
                <button onClick={() => setPage("add")} style={{ padding: "11px 22px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                  ➕ Add Device
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
                {[
                  { label: "Total Devices", value: stats.total, color: "#6366f1" },
                  { label: "Available", value: stats.available, color: "#059669" },
                  { label: "In Use", value: stats.inUse, color: "#dc2626" },
                  { label: "Requested", value: stats.requested, color: "#d97706" },
                ].map(s => (
                  <div key={s.label} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", borderLeft: `4px solid ${s.color}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                    <div style={{ fontSize: 13, color: "#64748b", marginTop: 4, fontWeight: 600 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                <div style={{ position: "relative", flex: 1 }}>
                  <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }}>🔍</span>
                  <input style={{ ...inputStyle, paddingLeft: 42, fontSize: 14 }} placeholder="Search by name or category..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <select style={{ ...inputStyle, width: 160, cursor: "pointer" }} value={category} onChange={e => setCategory(e.target.value)}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>

              {filtered.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#94a3b8" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🔎</div>
                  <div style={{ fontSize: 16, fontWeight: 600 }}>No devices found</div>
                </div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
                  {filtered.map(d => <DeviceCard key={d.id} device={d} onRequest={setRequestModal} onDelete={handleDelete} />)}
                </div>
              )}
            </div>
          )}

          {page === "add" && (
            <div style={{ maxWidth: 520 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                <button onClick={() => setPage("dashboard")} style={{ border: "1.5px solid #e2e8f0", background: "#fff", borderRadius: 10, padding: "8px 14px", cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#64748b" }}>← Back</button>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a" }}>Add New Device</h1>
              </div>
              <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
                <Field label="Device Name *">
                  <input style={inputStyle} placeholder='e.g. MacBook Pro 14"' value={form.name} onChange={e => { setForm({ ...form, name: e.target.value }); setFormError(""); }} />
                  {formError && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 6 }}>⚠ {formError}</div>}
                </Field>
                <Field label="Category">
                  <select style={{ ...inputStyle, cursor: "pointer" }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {CATEGORIES.filter(c => c !== "All").map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Assigned To (optional)">
                  <input style={inputStyle} placeholder="Leave blank if available" value={form.assignedTo} onChange={e => setForm({ ...form, assignedTo: e.target.value })} />
                </Field>
                <div style={{ background: "#f8fafc", borderRadius: 10, padding: 14, marginBottom: 20, fontSize: 13, color: "#64748b" }}>
                  💡 Status will auto-set to <strong>{form.assignedTo.trim() ? "In Use" : "Available"}</strong>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => { setForm({ name: "", category: "Laptop", assignedTo: "" }); setFormError(""); }} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1.5px solid #e2e8f0", background: "#fff", cursor: "pointer", fontWeight: 600, fontSize: 14, color: "#64748b" }}>Clear</button>
                  <button onClick={handleAddDevice} style={{ flex: 2, padding: "12px 0", borderRadius: 10, border: "none", background: "#6366f1", color: "#fff", cursor: "pointer", fontWeight: 700, fontSize: 15 }}>➕ Add Device</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}