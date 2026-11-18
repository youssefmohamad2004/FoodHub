
import React from "react";
import { Link } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";

import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, clear } = useCart();

  // Ask for confirmation before removing all items
  const handleClearCart = () => {
    const confirmed = window.confirm(
      "Are you sure you want to remove all items from your cart?"
    );

    if (confirmed) {
      clear();
    }
  };

  return (
    <>
      <PageHeader
        title="Your Cart"
        subtitle="Review your selected meals and get ready to checkout."
      />

      <section className="container section pt-0">
        {items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="You haven't added any meals yet. Explore our menu and choose something delicious!"
          />
        ) : (
          <div className="checkout-grid">
            <div>
              <div className="cart-heading">
                <h3>
                  Your items ({items.length}{" "}
                  {items.length === 1 ? "item" : "items"})
                </h3>

                <button
                  type="button"
                  className="text-button"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>

              {items.map((item) => (
                <CartItem
                  key={item.cartItemId}
                  item={item}
                />
              ))}

              <Link className="back-link" to="/menu">
                ← Continue Shopping
              </Link>
            </div>

            <aside>
              <OrderSummary />

              <Link
                className="btn btn-primary w-100 mt-3"
                to="/checkout"
              >
                Proceed to Checkout
              </Link>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}
