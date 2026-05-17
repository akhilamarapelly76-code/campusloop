import React from "react";

export default function CategoryFilter({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ padding: "10px", marginBottom: "10px" }}
    >
      <option value="all">All</option>
      <option value="laptop">Laptop</option>
      <option value="projector">Projector</option>
      <option value="lab">Lab Equipment</option>
    </select>
  );
}