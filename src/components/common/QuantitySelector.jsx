import React from "react";
export default function QuantitySelector({ value, onChange }) {
  return (
    <div className="quantity">
      <button
        aria-label="Decrease quantity"
        disabled={value <= 1}
        onClick={() => onChange(Math.max(1, value - 1))}
      >
        −
      </button>
      <span>{value}</span>
      <button
        aria-label="Increase quantity"
        disabled={value >= 20}
        onClick={() => onChange(Math.min(20, value + 1))}
      >
        +
      </button>
    </div>
  );
}
