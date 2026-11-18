
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container empty-state section">
      <h1 className="error-code">404</h1>

      <h2>Oops! Page not found</h2>

      <p>
        Sorry, the page you are looking for does not exist
        or may have been moved.
      </p>

      <p>
        You can return to the homepage or explore our
        delicious menu to find something you like.
      </p>

      <div className="d-flex justify-content-center gap-3 flex-wrap mt-4">
        <Link
          className="btn btn-primary"
          to="/"
        >
          Back to Home
        </Link>

        <Link
          className="btn btn-outline-primary"
          to="/menu"
        >
          Explore Menu
        </Link>
      </div>
    </div>
  );
}
