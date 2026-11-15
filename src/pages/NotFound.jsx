import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="container empty-state section">
      <h1 className="error-code">404</h1>
      <h2>Page not found</h2>
      <p>Sorry, the page you are looking for doesn't exist.</p>
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
    </div>
  );
}
