import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Sun, Moon, Menu as MenuIcon, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
export default function Navbar() {
  const { count } = useCart(),
    { dark, toggle } = useTheme(),
    [open, setOpen] = useState(false);
  return (
    <header className="topbar">
      <div className="container nav-wrap">
        <Link className="brand" to="/">
          Food<span>Hub.</span>
        </Link>
        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <MenuIcon />}
        </button>
        <nav
          className={open ? "nav-links open" : "nav-links"}
          onClick={() => setOpen(false)}
        >
          {[
            ["/", "Home"],
            ["/about", "About"],
            ["/menu", "Menu"],
            ["/contact", "Contact"],
          ].map(([url, label]) => (
            <NavLink key={url} end={url === "/"} to={url}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="nav-actions">
          <button
            aria-label="Toggle theme"
            className="icon-btn"
            onClick={toggle}
          >
            {dark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link className="cart-link" to="/cart" aria-label="Shopping cart">
            <ShoppingBag size={21} />
            <span className="cart-count">{count}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
