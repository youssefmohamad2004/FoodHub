import React from "react";
import { money, totals } from "../../utils/pricing";
import { useCart } from "../../context/CartContext";
export default function OrderSummary({ editable = true }) {
  const { items, coupon, setCoupon } = useCart(),
    p = totals(items, coupon);
  return (
    <div className="summary-card">
      <h4>Order Summary</h4>
      <div className="summary-line">
        <span>Subtotal</span>
        <b>{money(p.subtotal)}</b>
      </div>
      <div className="summary-line">
        <span>Delivery</span>
        <b>{p.delivery ? money(p.delivery) : "Free"}</b>
      </div>
      <div className="summary-line">
        <span>Discount</span>
        <b>−{money(p.discount)}</b>
      </div>
      {editable && (
        <div className="mt-3">
          <label className="form-label" htmlFor="coupon">
            Promo code
          </label>
          <input
            id="coupon"
            className="form-control"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value.trim().toUpperCase())}
            placeholder="Try FOOD10"
          />
          {coupon && coupon !== "FOOD10" && (
            <small className="text-danger">Invalid promo code</small>
          )}
        </div>
      )}
      <hr />
      <div className="summary-line total">
        <span>Total</span>
        <b>{money(p.total)}</b>
      </div>
      <small>Free delivery on orders of $40 or more.</small>
    </div>
  );
}
