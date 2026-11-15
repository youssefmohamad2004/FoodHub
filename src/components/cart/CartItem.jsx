import React from "react";
import { Trash2 } from "lucide-react";
import QuantitySelector from "../common/QuantitySelector";
import { money, itemUnitPrice } from "../../utils/pricing";
import { useCart } from "../../context/CartContext";
export default function CartItem({ item }) {
  const { update, remove } = useCart();
  return (
    <div className="cart-item">
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        onError={(e) => {
          if (
            item.fallbackImage &&
            e.currentTarget.src !==
              new URL(item.fallbackImage, window.location.origin).href
          )
            e.currentTarget.src = item.fallbackImage;
        }}
      />
      <div className="cart-item-body">
        <h5>{item.name}</h5>
        {item.selectedExtras.length > 0 && (
          <small>{item.selectedExtras.map((e) => e.name).join(", ")}</small>
        )}
        {item.instructions && <small>Note: {item.instructions}</small>}
        <p>{money(itemUnitPrice(item))} each</p>
        <QuantitySelector
          value={item.quantity}
          onChange={(n) => update(item.cartItemId, n)}
        />
      </div>
      <div className="cart-item-end">
        <strong>{money(itemUnitPrice(item) * item.quantity)}</strong>
        <button
          className="icon-btn"
          aria-label="Remove item"
          onClick={() => remove(item.cartItemId)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
