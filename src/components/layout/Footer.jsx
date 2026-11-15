import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../data/siteConfig";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>
            Food<span>Hub.</span>
          </h3>
          <p>Fresh food, good mood. Discover something delicious every day.</p>
        </div>
        <div>
          <h5>Explore</h5>
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/about">About</Link>
        </div>
        <div>
          <h5>Support</h5>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Your Cart</Link>
        </div>
        <div>
          <h5>Get in touch</h5>
          <p>{siteConfig.email}</p>
          <p>{siteConfig.phone}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        © {new Date().getFullYear()} FoodHub · All rights reserved.
      </div>
    </footer>
  );
}
