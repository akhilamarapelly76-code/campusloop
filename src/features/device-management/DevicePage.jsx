import React, { useState } from "react";
import AddDeviceForm from "./AddDeviceForm";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import Popup from "./Popup";

export default function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [popup, setPopup] = useState("");

  const addDevice = (device) => {
    setDevices([...devices, device]);
    setPopup("Device Added Successfully!");
  };

  const requestDevice = (device) => {
    setPopup(`Request Sent for ${device.name}`);
  };

  const filteredDevices = devices.filter((d) => {
    return (
      d.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || d.category === category)
    );
  });

  return (
    <div style={{ padding: "20px" }}>
      <h2>CampusLoop Device Management</h2>

      <SearchBar value={search} onChange={setSearch} />
      <CategoryFilter value={category} onChange={setCategory} />

      <AddDeviceForm onAdd={addDevice} />

      {filteredDevices.map((device) => (
        <div
          key={device.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{device.name}</h4>
          <p>{device.category}</p>

          <button onClick={() => requestDevice(device)}>
            Request Device
          </button>
        </div>
      ))}

      {popup && (
        <Popup message={popup} onClose={() => setPopup("")} />
      )}
    </div>
  );
}