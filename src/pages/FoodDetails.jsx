import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Star, Clock } from "lucide-react";
import { foods } from "../data/foods";
import { money } from "../utils/pricing";
import { useCart } from "../context/CartContext";
import FoodCard from "../components/food/FoodCard";
import QuantitySelector from "../components/common/QuantitySelector";
import EmptyState from "../components/common/EmptyState";
export default function FoodDetails() {
  const { id } = useParams(),
    food = foods.find((x) => x.id === Number(id));
  if (!food) return <EmptyState title="Product not found" />;
  return <Details key={id} food={food} />;
}
function Details({ food }) {
  const [qty, setQty] = useState(1),
    [extras, setExtras] = useState([]),
    [note, setNote] = useState(""),
    { add } = useCart(),
    navigate = useNavigate();
  const selected = food.extras.filter((e) => extras.includes(e.id));
  const unit = food.price + selected.reduce((s, x) => s + x.price, 0);
  return (
    <section className="container section">
      <Link to="/menu" className="back-link">
        ← Back to Menu
      </Link>
      <div className="detail-grid">
        <img
          className="detail-image"
          src={food.image}
          alt={food.name}
          loading="lazy"
          onError={(e) => {
            if (
              food.fallbackImage &&
              e.currentTarget.src !==
                new URL(food.fallbackImage, window.location.origin).href
            )
              e.currentTarget.src = food.fallbackImage;
          }}
        />
        <div>
          <span className="eyebrow">{food.category}</span>
          <h1>{food.name}</h1>
          <div className="detail-rating">
            <Star size={17} fill="currentColor" /> {food.rating} (
            {food.reviewCount} reviews) · <Clock size={17} /> {food.prepTime}{" "}
            min
          </div>
          <h2 className="price">{money(food.price)}</h2>
          <p>{food.description}</p>
          <h5>Ingredients</h5>
          <p>{food.ingredients.join(" · ")}</p>
          {food.extras.length > 0 && (
            <>
              <h5>Make it yours</h5>
              {food.extras.map((e) => (
                <label className="extra-option" key={e.id}>
                  <input
                    type="checkbox"
                    checked={extras.includes(e.id)}
                    onChange={(ev) =>
                      setExtras((a) =>
                        ev.target.checked
                          ? [...a, e.id]
                          : a.filter((x) => x !== e.id),
                      )
                    }
                  />
                  {e.name} <strong>+{money(e.price)}</strong>
                </label>
              ))}
            </>
          )}
          <label className="form-label mt-3" htmlFor="special-notes">
            Special instructions (optional)
          </label>
          <textarea
            id="special-notes"
            maxLength="250"
            className="form-control"
            rows="2"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Any special requests?"
          />
          <div className="detail-actions">
            <QuantitySelector value={qty} onChange={setQty} />
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                add(food, qty, selected, note);
                navigate("/cart");
              }}
            >
              Add to Cart · {money(unit * qty)}
            </button>
          </div>
        </div>
      </div>
      <div className="section-title mt-5">
        <h2>You may also like</h2>
      </div>
      <div className="food-grid">
        {foods
          .filter((x) => x.category === food.category && x.id !== food.id)
          .slice(0, 3)
          .map((x) => (
            <FoodCard key={x.id} food={x} />
          ))}
      </div>
    </section>
  );
}
