import React from "react";
export default function PageHeader({ title, subtitle }) {
  return (
    <section className="page-heading container">
      <span className="eyebrow">FOODHUB RESTAURANT</span>
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
}
