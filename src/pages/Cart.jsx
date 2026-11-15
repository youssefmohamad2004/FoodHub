import React from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import { useCart } from "../context/CartContext";
export default function Cart() {
  const { items, clear } = useCart();
  return (
    <>
      <PageHeader
        title="Your Cart"
        subtitle="Review your picks before checkout."
      />
      <section className="container section pt-0">
        {items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Add some delicious dishes to get started."
          />
        ) : (
          <div className="checkout-grid">
            <div>
              <div className="cart-heading">
                <h3>Your items ({items.length})</h3>
                <button className="text-button" onClick={clear}>
                  Clear Cart
                </button>
              </div>
              {items.map((x) => (
                <CartItem key={x.cartItemId} item={x} />
              ))}
              <Link className="back-link" to="/menu">
                ← Continue Shopping
              </Link>
            </div>
            <aside>
              <OrderSummary />
              <Link className="btn btn-primary w-100 mt-3" to="/checkout">
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
