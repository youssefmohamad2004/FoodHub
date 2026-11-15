import React from "react";
export const statuses = [
  "Order Received",
  "Preparing",
  "On the Way",
  "Delivered",
];
export default function OrderStatus({ status }) {
  return (
    <div className="status-list">
      {statuses.map((s, i) => (
        <div key={s} className={"status-step " + (i <= status ? "active" : "")}>
          <span>{i < status ? "✓" : i + 1}</span>
          <strong>{s}</strong>
        </div>
      ))}
    </div>
  );
}
