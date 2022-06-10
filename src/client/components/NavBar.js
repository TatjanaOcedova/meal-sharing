import React, { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../assets/images/logo.png";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <img
            src={logo}
            style={{ width: "70px", height: "70px", borderRadius: "50%" }}
          />
        </Link>
      </div>
      <ul className="nav-links">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/meals">
          <li>Meals</li>
        </Link>
        <Link to="/add">
          <li>AddMeal</li>
        </Link>
        <li>Login</li>
      </ul>
    </nav>
  );
}

export default NavBar;
