
import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";

export default function About() {
  return (
    <>
      <PageHeader
        title="Our Story"
        subtitle="Fresh ideas, delicious meals, and simple ordering."
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
            At FoodHub, we believe that enjoying good food should be simple
            and convenient. Our website helps customers explore different
            meals, discover their favorites, and order food in just a few
            easy steps.
          </p>

          <p>
            From tasty burgers to fresh salads and delicious desserts,
            FoodHub brings a variety of food choices together in one place.
          </p>

          <h4>Our Mission</h4>
          <p>
            Make browsing, choosing, and ordering food easy and enjoyable
            for everyone.
          </p>

          <h4>Our Vision</h4>
          <p>
            Create a modern and user-friendly food ordering experience
            that works smoothly on computers and mobile devices.
          </p>

          <Link to="/menu" className="btn btn-primary">
            Explore Our Menu
          </Link>
        </div>
      </section>

      <section className="section soft-section">
        <div className="container features-grid">
          {[
            [
              "Quality First",
              "Explore carefully selected meals with clear details and prices.",
            ],
            [
              "Fresh Choices",
              "Discover a wide variety of burgers, pizza, pasta, salads, and more.",
            ],
            [
              "Made for You",
              "Choose your favorite meals and customize your order easily.",
            ],
          ].map(([title, description]) => (
            <div className="feature-card" key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
