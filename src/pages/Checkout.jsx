
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageHeader from "../components/common/PageHeader";
import EmptyState from "../components/common/EmptyState";
import OrderSummary from "../components/cart/OrderSummary";

import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrderContext";

import { totals } from "../utils/pricing";
import { validEmail, validPhone } from "../utils/validators";

const initial = {
  name: "",
  email: "",
  phone: "",
  city: "",
  street: "",
  building: "",
  notes: "",
  terms: false,
};

export default function Checkout() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  const { items, coupon, clear } = useCart();
  const { create } = useOrders();
  const navigate = useNavigate();

  // Update form fields and clear previous errors
  const change = (e) => {
    const { name, type, checked, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (error) {
      setError("");
    }
  };

  // Validate customer information before creating an order
  const submit = (e) => {
    e.preventDefault();

    if (form.name.trim().length < 2) {
      return setError(
        "Enter your full name (at least 2 characters)."
      );
    }

    if (!validEmail(form.email)) {
      return setError("Enter a valid email address.");
    }

    if (!validPhone(form.phone)) {
      return setError(
        "Enter a valid phone number (7–15 digits)."
      );
    }

    if (!form.city.trim() || !form.street.trim()) {
      return setError(
        "Enter your city and street address."
      );
    }

    if (!form.terms) {
      return setError(
        "Please confirm that you understand how ordering works."
      );
    }

    const id = create(
      form,
      items,
      totals(items, coupon)
    );

    clear();
    navigate("/orders/" + id);
  };

  if (!items.length) {
    return (
      <>
        <PageHeader title="Checkout" />
        <div className="container">
          <EmptyState title="Your cart is empty" />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Checkout"
        subtitle="Almost there! Complete your delivery details."
      />

      <section className="container section pt-0 checkout-grid">
        <form onSubmit={submit} className="form-card">
          <h3>Delivery Information</h3>

          <p className="text-muted">
            Please fill in the required fields marked with *.
          </p>

          {error && (
            <div role="alert" className="alert alert-danger">
              {error}
            </div>
          )}

          <div className="form-grid">
            <label>
              Full Name *
              <input
                className="form-control"
                required
                name="name"
                value={form.name}
                onChange={change}
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </label>

            <label>
              Email *
              <input
                className="form-control"
                required
                type="email"
                name="email"
                value={form.email}
                onChange={change}
                placeholder="example@email.com"
                autoComplete="email"
              />
            </label>

            <label>
              Phone *
              <input
                className="form-control"
                required
                type="tel"
                name="phone"
                value={form.phone}
                onChange={change}
                placeholder="Enter your phone number"
                autoComplete="tel"
              />
            </label>

            <label>
              City *
              <select
                className="form-select"
                required
                name="city"
                value={form.city}
                onChange={change}
              >
                <option value="">Select city</option>

                {[
                  "Tripoli",
                  "Beirut",
                  "Jounieh",
                  "Byblos",
                  "Sidon",
                ].map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            Street Address *
            <input
              className="form-control"
              required
              name="street"
              value={form.street}
              onChange={change}
              placeholder="Street name and area"
              autoComplete="street-address"
            />
          </label>

          <label>
            Building / Floor
            <input
              className="form-control"
              name="building"
              value={form.building}
              onChange={change}
              placeholder="Building name, floor, or apartment"
            />
          </label>

          <label>
            Delivery Notes
            <textarea
              className="form-control"
              rows={3}
              name="notes"
              value={form.notes}
              onChange={change}
              maxLength={250}
              placeholder="Add any delivery instructions (optional)"
            />

            <small className="text-muted">
              {form.notes.length}/250 characters
            </small>
          </label>

          <h4 className="mt-4">Payment Method</h4>

          <label className="radio-box">
            <input
              type="radio"
              checked
              readOnly
            />{" "}
            Cash on Delivery
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={change}
              required
            />{" "}
            I understand that this website does not process or deliver real
            orders. *
          </label>

          <button
            className="btn btn-primary btn-lg w-100 mt-3"
            type="submit"
          >
            Place Order
          </button>
        </form>

        <aside>
          <OrderSummary editable={false} />
        </aside>
      </section>
    </>
  );
}
