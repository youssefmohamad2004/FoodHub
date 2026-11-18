
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Leaf, Heart } from "lucide-react";
import { foods } from "../data/foods";
import { categories } from "../data/categories";
import FoodCard from "../components/food/FoodCard";

const categoryPhotos = {
  Burgers:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80",
  Pizza:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80",
  Pasta:
    "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=500&q=80",
  Salads:
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=500&q=80",
  Drinks:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=500&q=80",
  Desserts:
    "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80",
};

export default function Home() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">FRESH • HEALTHY • DELICIOUS</span>
            <h1>
              Good food.
              <br />
              <em>Great mood.</em>
            </h1>
            <p>
              Discover chef-crafted favorites, made fresh and delivered with
              care. Your next delicious moment starts here.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/menu">
                Explore Menu <ArrowRight size={18} />
              </Link>
              <Link className="btn btn-outline-primary btn-lg" to="/about">
                Our Story
              </Link>
            </div>
            <div className="hero-stats">
              <strong>
                24+ <small>Dishes</small>
              </strong>
              <strong>
                6 <small>Categories</small>
              </strong>
              <strong>
                Fresh <small>Every Day</small>
              </strong>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=85"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "/images/banners/hero.svg";
            }}
            alt="Fresh salad bowl"
          />
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <span className="eyebrow">EXPLORE</span>
          <h2>Browse by category</h2>
          <p>Choose your favorite category and discover delicious meals.</p>
        </div>
        <div className="category-grid">
          {categories
            .filter((x) => x !== "All")
            .map((x) => (
              <Link
                className="category-card"
                key={x}
                to={"/menu?category=" + x}
              >
                <img
                  src={
                    categoryPhotos[x] ||
                    "/images/categories/" + x.toLowerCase() + ".svg"
                  }
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "/images/categories/" + x.toLowerCase() + ".svg";
                  }}
                  alt={x}
                />
                <strong>{x}</strong>
              </Link>
            ))}
        </div>
      </section>

      <section className="section soft-section">
        <div className="container">
          <div className="section-title">
            <span className="eyebrow">CUSTOMER FAVORITES</span>
            <h2>Most loved dishes</h2>
            <p>
              Explore our most popular meals, carefully selected
              for a delicious experience.
            </p>
          </div>
          <div className="food-grid">
            {foods
              .filter((x) => x.isPopular)
              .slice(0, 6)
              .map((x) => (
                <FoodCard key={x.id} food={x} />
              ))}
          </div>
          <div className="center mt-4">
            <Link to="/menu" className="btn btn-outline-primary">
              View Full Menu <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <span className="eyebrow">WHY FOODHUB</span>
          <h2>Made with care</h2>
        </div>
        <div className="features-grid">
          {[
            [
              Leaf,
              "Fresh Ingredients",
              "Thoughtfully selected ingredients in every dish.",
            ],
            [
              Truck,
              "Easy Ordering",
              "Browse, customize, and checkout in moments.",
            ],
            [
              Heart,
              "Made with Love",
              "Delicious recipes inspired by real comfort food.",
            ],
          ].map(([Icon, title, desc]) => (
            <div className="feature-card" key={title}>
              <Icon size={30} />
              <h4>{title}</h4>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="offer-banner">
          <div>
            <span className="eyebrow">SPECIAL OFFER</span>
            <h2>10% off your next order</h2>
            <p>
              Use promo code <strong>FOOD10</strong> at checkout.
            </p>
            <Link to="/menu" className="btn btn-light">
              Order Now
            </Link>
          </div>
          <span className="offer-emoji">🥗</span>
        </div>
      </section>

      <section className="section container">
        <div className="section-title">
          <span className="eyebrow">KIND WORDS</span>
          <h2>What makes FoodHub special</h2>
        </div>
        <div className="features-grid">
          {[
            ["Easy to Explore", "Find your favorites in a few clicks."],
            ["Made Your Way", "Choose extras and customize your meal."],
            ["Simple Checkout", "A clear and comfortable ordering experience."],
          ].map(([title, text]) => (
            <div className="feature-card" key={title}>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section soft-section">
        <div className="container newsletter">
          <div>
            <span className="eyebrow">STAY INSPIRED</span>
            <h2>Fresh updates, straight to you</h2>
            <p>Explore fresh ideas, offers, and more.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <input
              type="email"
              required
              className="form-control"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSent(false);
              }}
              placeholder="Your email address"
            />
            <button className="btn btn-primary">Subscribe</button>
            {sent && (
              <small>
                Thanks for your interest! Newsletter delivery is not yet
                available.
              </small>
            )}
          </form>
        </div>
      </section>
    </>
  );
}
