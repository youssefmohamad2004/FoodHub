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
  const [form, setForm] = useState(initial),
    [error, setError] = useState(""),
    { items, coupon, clear } = useCart(),
    { create } = useOrders(),
    navigate = useNavigate();
  if (!items.length)
    return (
      <>
        <PageHeader title="Checkout" />
        <div className="container">
          <EmptyState title="Your cart is empty" />
        </div>
      </>
    );
  const change = (e) =>
    setForm((p) => ({
      ...p,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  const submit = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2)
      return setError("Enter your full name (at least 2 characters).");
    if (!validEmail(form.email))
      return setError("Enter a valid email address.");
    if (!validPhone(form.phone))
      return setError("Enter a valid phone number (7–15 digits).");
    if (!form.city || !form.street.trim())
      return setError("Enter your city and street address.");
    if (!form.terms)
      return setError("Please confirm that you understand how ordering works.");
    const id = create(form, items, totals(items, coupon));
    clear();
    navigate("/orders/" + id);
  };
  return (
    <>
      <PageHeader
        title="Checkout"
        subtitle="Almost there! Complete your delivery details."
      />
      <section className="container section pt-0 checkout-grid">
        <form onSubmit={submit} className="form-card">
          <h3>Delivery Information</h3>
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
                {["Tripoli", "Beirut", "Jounieh", "Byblos", "Sidon"].map(
                  (x) => (
                    <option key={x}>{x}</option>
                  ),
                )}
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
            />
          </label>
          <label>
            Building / Floor
            <input
              className="form-control"
              name="building"
              value={form.building}
              onChange={change}
            />
          </label>
          <label>
            Delivery Notes
            <textarea
              className="form-control"
              rows="3"
              name="notes"
              value={form.notes}
              onChange={change}
            />
          </label>
          <h4 className="mt-4">Payment Method</h4>
          <label className="radio-box">
            <input type="radio" checked readOnly /> Cash on Delivery
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              name="terms"
              checked={form.terms}
              onChange={change}
            />{" "}
            I understand that this website does not process or deliver real
            orders. *
          </label>
          <button className="btn btn-primary btn-lg w-100 mt-3" type="submit">
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
