import React, { useState } from "react";
import PageHeader from "../components/common/PageHeader";
import { siteConfig } from "../data/siteConfig";
import { validEmail } from "../utils/validators";
export default function Contact() {
  const [form, setForm] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    }),
    [sent, setSent] = useState(false),
    [error, setError] = useState("");
  const change = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (
      form.name.trim().length < 2 ||
      !validEmail(form.email) ||
      !form.subject.trim() ||
      form.message.trim().length < 10
    ) {
      setError(
        "Please enter valid details and a message of at least 10 characters.",
      );
      return;
    }
    setError("");
    setSent(true);
  };
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We would love to hear from you."
      />
      <section className="container section pt-0 contact-grid">
        <div className="form-card">
          <h3>Send a message</h3>
          {sent ? (
            <div className="alert alert-success">
              Your form is complete. Message delivery is not connected yet;
              please use the contact details shown here.
            </div>
          ) : (
            <form onSubmit={submit}>
              {error && (
                <div role="alert" className="alert alert-danger">
                  {error}
                </div>
              )}
              {[
                ["name", "Full Name"],
                ["email", "Email"],
                ["subject", "Subject"],
              ].map(([key, label]) => (
                <label key={key}>
                  {label} *
                  <input
                    className="form-control"
                    required
                    type={key === "email" ? "email" : "text"}
                    name={key}
                    value={form[key]}
                    onChange={change}
                  />
                </label>
              ))}
              <label>
                Message *
                <textarea
                  className="form-control"
                  required
                  rows="5"
                  name="message"
                  value={form.message}
                  onChange={change}
                />
              </label>
              <button className="btn btn-primary">Send Message</button>
            </form>
          )}
        </div>
        <aside className="contact-info">
          <h3>Let's connect</h3>
          <p>We are always happy to help with questions about our menu.</p>
          <h5>Email</h5>
          <p>{siteConfig.email}</p>
          <h5>Phone</h5>
          <p>{siteConfig.phone}</p>
          <h5>Address</h5>
          <p>{siteConfig.address}</p>
          <h5>Availability</h5>
          <p>Explore our menu online anytime.</p>
          <div className="map-placeholder">
            Find us: Online ordering experience
          </div>
        </aside>
      </section>
    </>
  );
}
