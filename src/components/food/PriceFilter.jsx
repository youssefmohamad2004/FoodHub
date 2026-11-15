import React from "react";
export default function PriceFilter({ value, onChange }) {
  return (
    <label className="form-label d-block">
      Maximum price: ${value}
      <input
        className="form-range"
        type="range"
        min="5"
        max="25"
        step="1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}
