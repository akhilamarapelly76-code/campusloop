import { useState } from "react";

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
    <div className="px-6 py-10 text-white">

      {/* POPUP */}
      {popup && (
        <div className="mb-4 p-3 bg-green-600 rounded-lg">
          {popup}
        </div>
      )}

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-2">
      Add a New Device
      </h2>

    <p className="text-gray-400 mb-6">
    List your laptop, camera, or gaming device for rent
    </p>

      {/* ADD DEVICE FORM */}
     <div className="bg-[#18181b] p-6 rounded-2xl border border-[#3f3f46] mb-6">
  <div className="grid gap-4">

    <input
      className="p-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-white focus:outline-none focus:border-purple-500"
      placeholder="Device Name"
      value={form.name}
      onChange={(e) =>
        setForm({ ...form, name: e.target.value })
      }
    />

    <input
      className="p-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-white focus:outline-none focus:border-purple-500"
      placeholder="Category (Laptop, Camera...)"
      value={form.category}
      onChange={(e) =>
        setForm({ ...form, category: e.target.value })
      }
    />

    <input
      className="p-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-white focus:outline-none focus:border-purple-500"
      placeholder="Location"
      value={form.location}
      onChange={(e) =>
        setForm({ ...form, location: e.target.value })
      }
    />

    <input
      className="p-3 rounded-lg bg-[#27272a] border border-[#3f3f46] text-white focus:outline-none focus:border-purple-500"
      placeholder="Price per day"
      value={form.price}
      onChange={(e) =>
        setForm({ ...form, price: e.target.value })
      }
    />

    <button
      onClick={addDevice}
      className="mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 p-3 rounded-lg font-medium transition-all"
    >
      + Add Device
    </button>

  </div>
</div>
      {/* SEARCH + FILTER */}
      <div className="flex gap-3 mb-6">
        <input
          className="p-2 rounded bg-gray-800 flex-1"
          placeholder="Search device..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-2 rounded bg-gray-800"
          value={filter}
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
              className="p-4 bg-gray-900 rounded"
            >
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
                className="mt-2 bg-green-600 px-3 py-1 rounded"
              >
                Request Device
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}