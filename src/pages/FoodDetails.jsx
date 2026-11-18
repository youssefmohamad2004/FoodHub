
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
  const { id } = useParams();

  const food = foods.find((item) => item.id === Number(id));

  if (!food) {
    return <EmptyState title="Product not found" />;
  }

  return <Details key={id} food={food} />;
}

function Details({ food }) {
  const [qty, setQty] = useState(1);
  const [extras, setExtras] = useState([]);
  const [note, setNote] = useState("");

  const { add } = useCart();
  const navigate = useNavigate();

  // Find the extras selected by the customer
  const selected = food.extras.filter((extra) =>
    extras.includes(extra.id)
  );

  // Calculate the price for one item including extras
  const unit =
    food.price +
    selected.reduce((total, extra) => total + extra.price, 0);

  // Calculate the final price based on quantity
  const totalPrice = unit * qty;

  // Find similar dishes from the same category
  const relatedFoods = foods
    .filter(
      (item) =>
        item.category === food.category &&
        item.id !== food.id
    )
    .slice(0, 3);

  const handleAddToCart = () => {
    add(food, qty, selected, note);
    navigate("/cart");
  };

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
            ) {
              e.currentTarget.src = food.fallbackImage;
            }
          }}
        />

        <div>
          <span className="eyebrow">{food.category}</span>

          <h1>{food.name}</h1>

          <div className="detail-rating">
            <Star size={17} fill="currentColor" />{" "}
            {food.rating} ({food.reviewCount} reviews)
            {" · "}
            <Clock size={17} /> {food.prepTime} min
          </div>

          <h2 className="price">{money(food.price)}</h2>

          <p>{food.description}</p>

          <h5>Ingredients</h5>
          <p>{food.ingredients.join(" · ")}</p>

          {food.extras.length > 0 && (
            <>
              <h5>Make it yours</h5>

              <p className="text-muted">
                Choose your favorite extras. Extra prices
                apply to each item.
              </p>

              {food.extras.map((extra) => (
                <label
                  className="extra-option"
                  key={extra.id}
                >
                  <input
                    type="checkbox"
                    checked={extras.includes(extra.id)}
                    onChange={(event) =>
                      setExtras((currentExtras) =>
                        event.target.checked
                          ? [...currentExtras, extra.id]
                          : currentExtras.filter(
                              (id) => id !== extra.id
                            )
                      )
                    }
                  />

                  {extra.name}{" "}
                  <strong>+{money(extra.price)}</strong>
                </label>
              ))}
            </>
          )}

          <label
            className="form-label mt-3"
            htmlFor="special-notes"
          >
            Special instructions (optional)
          </label>

          <textarea
            id="special-notes"
            maxLength={250}
            className="form-control"
            rows={2}
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            placeholder="Any special requests for your meal?"
          />

          <small className="text-muted">
            {note.length}/250 characters
          </small>

          <div className="detail-actions">
            <QuantitySelector
              value={qty}
              onChange={setQty}
            />

            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
            >
              Add to Cart · {money(totalPrice)}
            </button>
          </div>
        </div>
      </div>

      <div className="section-title mt-5">
        <h2>You may also like</h2>
      </div>

      {relatedFoods.length > 0 ? (
        <div className="food-grid">
          {relatedFoods.map((item) => (
            <FoodCard
              key={item.id}
              food={item}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>
            No similar dishes are available right now.
            Explore our full menu for more options.
          </p>

          <Link
            to="/menu"
            className="btn btn-outline-primary"
          >
            View Full Menu
          </Link>
        </div>
      )}
    </section>
  );
}
