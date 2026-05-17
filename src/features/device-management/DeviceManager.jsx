import { useState } from "react";
import { Laptop, MapPin, IndianRupee, Layers } from "lucide-react";
export default function DeviceManager() {
  // =========================
  // STATE
  // =========================
  const [devices, setDevices] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    price: "",
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [popup, setPopup] = useState("");

  // =========================
  // ADD DEVICE FUNCTION
  // =========================
  const addDevice = () => {
    if (!form.name || !form.category) {
      setPopup("⚠️ Please fill required fields");
      return;
    }

    const newDevice = {
      id: Date.now(),
      ...form,
    };

    setDevices([...devices, newDevice]);

    setForm({ name: "", category: "", location: "", price: "" });

    setPopup("✅ Device Added Successfully");
  };

  // =========================
  // REQUEST BUTTON ACTION
  // =========================
  const handleRequest = (deviceName) => {
    setPopup(`📩 Request Sent for ${deviceName}`);
  };

  // =========================
  // FILTERED DEVICES
  // =========================
  const filteredDevices = devices.filter((d) => {
    const matchSearch = d.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || d.category === filter;

    return matchSearch && matchFilter;
  });

  // =========================
  // UI
  // =========================
  return (
<div className="min-h-screen max-w-7xl mx-auto px-6 py-14 text-white bg-gradient-to-br from-[#140b2d] via-[#1b1147] to-[#0f172a]">
      {/* POPUP */}
      {popup && (
  <div className="mb-6 p-4 rounded-2xl bg-green-500/20 border border-green-500/30 text-green-300 backdrop-blur-lg">
    {popup}
  </div>
)}

      {/* TITLE */}
      <div className="mb-8">
  <span className="px-4 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm">
    CampusLoop Marketplace
  </span>

  <h2 className="text-5xl font-bold mt-5 mb-3">
    Share Your Devices
  </h2>

  <div className="text-center border border-dashed border-purple-500/30 rounded-3xl p-12 bg-white/5">
  <div className="text-6xl mb-4">📦</div>
  <h3 className="text-2xl font-semibold mb-3">
    No Devices Added Yet
  </h3>

  <p className="text-gray-400">
    Added devices will appear here beautifully.
  </p>
</div>
</div>

      {/* ADD DEVICE FORM */}
     <div className="backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl mb-8">
  <div className="grid gap-4">

    <input
className="w-full p-4 rounded-2xl bg-[#111827]/80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10"      placeholder="Device Name"
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

    <input
className="w-full p-4 rounded-2xl bg-[#111827]/80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10"      placeholder="Category (Laptop, Camera...)"
      value={form.category}
      onChange={(e) =>
        setForm({ ...form, category: e.target.value })
      }
    />

    <input
className="w-full p-4 rounded-2xl bg-[#111827]/80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10"      placeholder="Location"
      value={form.location}
      onChange={(e) =>
        setForm({ ...form, location: e.target.value })
      }
    />

    <input
className="w-full p-4 rounded-2xl bg-[#111827]/80 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10"      placeholder="Price per day"
      value={form.price}
      onChange={(e) =>
        setForm({ ...form, price: e.target.value })
      }
    />

    <button
      onClick={addDevice}
className="mt-4 w-full bg-gradient-to-r from-fuchsia-600 via-purple-600 to-blue-600 hover:scale-[1.02] active:scale-95 hover:shadow-purple-500/30 shadow-lg p-4 rounded-2xl font-semibold text-lg transition-all duration-300"    >
      + Add Device
    </button>

  </div>
</div>
      {/* SEARCH + FILTER */}
      <h3 className="text-xl font-semibold mb-4">
  Browse Added Devices
</h3>
    <p className="text-gray-400 mb-6">
  {filteredDevices.length} devices available
</p>
      <div className="flex gap-3 mb-6">
        <input
className="p-4 rounded-2xl bg-[#111827]/80 border border-gray-700 flex-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/10"          placeholder="Search device..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
className="p-4 rounded-2xl bg-[#111827]/80 border border-gray-700 text-white focus:outline-none"          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Laptop</option>
          <option>Camera</option>
          <option>Gaming</option>
        </select>
      </div>

      {/* DEVICE LIST */}
      <div className="grid gap-4">
        {filteredDevices.length === 0 ? (
          <p className="text-gray-400">
            No devices added yet
          </p>
        ) : (
          filteredDevices.map((device) => (
            <div
              key={device.id}
              className="p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:-translate-y-2 transition-all duration-300 shadow-xl hover:border-purple-500/30 animate-fadeIn"            >

            
              <h3 className="font-bold">
                {device.name}
              </h3>
              <p>{device.category}</p>
              <p>{device.location}</p>
              <p>₹{device.price}/day</p>

              <button
                onClick={() =>
                  handleRequest(device.name)
                }
className="mt-4 bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2 rounded-xl font-medium hover:scale-105 transition-all"              >
                Request Device
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}