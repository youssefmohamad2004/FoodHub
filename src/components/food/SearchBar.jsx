import React from "react";
export default function SearchBar({ value, onChange }) {
  return (
    <input
      className="form-control"
      aria-label="Search dishes"
      placeholder="Search your favorite dish..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
