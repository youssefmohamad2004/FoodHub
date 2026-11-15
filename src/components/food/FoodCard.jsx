import React from "react";
import { Link } from "react-router-dom";
import { Star, Plus } from "lucide-react";
import { money } from "../../utils/pricing";
import { useCart } from "../../context/CartContext";
export default function FoodCard({ food }) {
  const { add } = useCart();
  return (
    <article className="food-card">
      <Link to={"/menu/" + food.id}>
        <img
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
      </Link>
      <div className="food-content">
        <div className="food-meta">
          <span>{food.category}</span>
          <span>
            <Star size={13} fill="currentColor" /> {food.rating}
          </span>
        </div>
        <Link className="food-title" to={"/menu/" + food.id}>
          {food.name}
        </Link>
        <p className="clamp">{food.description}</p>
        <div className="food-bottom">
          <strong>{money(food.price)}</strong>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => add(food)}
            aria-label={"Add " + food.name + " to cart"}
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
