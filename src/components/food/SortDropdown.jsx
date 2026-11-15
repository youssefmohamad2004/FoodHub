import React from "react";
export default function SortDropdown({ value, onChange }) {
  return (
    <select
      className="form-select"
      aria-label="Sort dishes"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="default">Default</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
      <option value="popular">Most Popular</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
}
