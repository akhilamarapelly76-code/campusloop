import React, { useEffect } from "react";

export default function Popup({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        backgroundColor: "green",
        color: "white",
        padding: "10px 15px",
        borderRadius: "6px",
      }}
    >
      {message}
    </div>
  );
}