
import React, { useState } from "react";

import PageHeader from "../components/common/PageHeader";
import { siteConfig } from "../data/siteConfig";
import { validEmail } from "../utils/validators";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  // Update form values and clear previous errors
  const change = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // Validate the form before showing the confirmation
  const submit = (e) => {
    e.preventDefault();

    if (form.name.trim().length < 2) {
      return setError(
        "Please enter your full name (at least 2 characters)."
      );
    }

    if (!validEmail(form.email)) {
      return setError("Please enter a valid email address.");
    }

    if (!form.subject.trim()) {
      return setError("Please enter a subject.");
    }

    if (form.message.trim().length < 10) {
      return setError(
        "Your message must contain at least 10 characters."
      );
    }

    setError("");
    setSent(true);
  };

  // Reset the form so the user can write another message
  const resetForm = () => {
    setForm(initialForm);
    setSent(false);
    setError("");
  };

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Have a question? We would love to hear from you."
      />

      <section className="container section pt-0 contact-grid">
        <div className="form-card">
          <h3>Send a message</h3>

          <p className="text-muted">
            Fill in the form below. All fields are required.
          </p>

          {sent ? (
            <div>
              <div
                className="alert alert-success"
                role="status"
              >
                Your form is complete. Message delivery is
                not connected yet. Please use the contact
                details shown on this page to reach us.
              </div>

              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={resetForm}
              >
                Write Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={submit}>
              {error && (
                <div
                  role="alert"
                  className="alert alert-danger"
                >
                  {error}
                </div>
              )}

              {[
                ["name", "Full Name", "Enter your full name"],
                ["email", "Email", "example@email.com"],
                ["subject", "Subject", "What is your question?"],
              ].map(([key, label, placeholder]) => (
                <label key={key}>
                  {label} *

                  <input
                    className="form-control"
                    required
                    type={key === "email" ? "email" : "text"}
                    name={key}
                    value={form[key]}
                    onChange={change}
                    placeholder={placeholder}
                    autoComplete={
                      key === "name"
                        ? "name"
                        : key === "email"
                        ? "email"
                        : "off"
                    }
                  />
                </label>
              ))}

              <label>
                Message *

                <textarea
                  className="form-control"
                  required
                  rows={5}
                  name="message"
                  value={form.message}
                  onChange={change}
                  maxLength={500}
                  placeholder="Write your message here..."
                />

                <small className="text-muted">
                  {form.message.length}/500 characters
                  (minimum 10)
                </small>
              </label>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        <aside className="contact-info">
          <h3>Let's connect</h3>

          <p>
            We are always happy to help with questions
            about our menu and ordering experience.
          </p>

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
