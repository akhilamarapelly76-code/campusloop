import { addDevice } from "../firebase/dbServices";
import React, { useState } from "react";

export default function AddDeviceForm({ onAdd }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !category) return;

    await addDevice({
     name,
     category,
     status: "available",
     createdAt: new Date().toISOString()
    });

    setName("");
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        placeholder="Device Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: "10px", marginRight: "10px" }}
      />

      <button style={{ padding: "10px" }}>Add Device</button>
    </form>
  );
}