import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search devices..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
    />
  );
}