import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
export default function About() {
  return (
    <>
      <PageHeader
        title="Our Story"
        subtitle="Food made with care, shared with joy."
      />
      <section className="container section about-grid">
        <img
          src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/banners/hero.svg";
          }}
          alt="Fresh food"
        />
        <div>
          <span className="eyebrow">WHO WE ARE</span>
          <h2>Simple food. Beautiful moments.</h2>
          <p>
            At FoodHub, we believe great food should feel fresh, accessible, and
            welcoming. Explore a menu inspired by everyday favorites, made for
            the moments that matter.
          </p>
          <h4>Our Mission</h4>
          <p>Make browsing and ordering food simple and delightful.</p>
          <h4>Our Vision</h4>
          <p>Bring a clean, thoughtful digital experience to every meal.</p>
          <Link to="/menu" className="btn btn-primary">
            Explore Our Menu
          </Link>
        </div>
      </section>
      <section className="section soft-section">
        <div className="container features-grid">
          {[
            ["Quality First", "Carefully prepared food ideas."],
            ["Fresh Choices", "A balanced variety of tasty options."],
            ["Made for You", "Customize every order your way."],
          ].map(([a, b]) => (
            <div className="feature-card" key={a}>
              <h3>{a}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
