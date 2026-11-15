import React from "react";
import { Link } from "react-router-dom";
export default function EmptyState({
  title = "Nothing here yet",
  description = "Try another option.",
  link = "/menu",
  label = "Browse Menu",
}) {
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      <p>{description}</p>
      <Link className="btn btn-primary" to={link}>
        {label}
      </Link>
    </div>
  );
}
