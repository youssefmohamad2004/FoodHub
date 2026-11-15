import React from "react";
import { categories } from "../../data/categories";
export default function CategoryFilter({ value, onChange }) {
  return (
    <div className="category-pills">
      {categories.map((x) => (
        <button
          key={x}
          className={"pill " + (x === value ? "selected" : "")}
          onClick={() => onChange(x)}
        >
          {x}
        </button>
      ))}
    </div>
  );
}
