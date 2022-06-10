import React from "react";
import "../index.css";

export default function Footer() {
  return (
    <>
      <ul className="footer-container">
        <li>
          <ul className="footer-content">
            <h3>Services</h3>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/meals">Meals</a>
            </li>
            <li>
              <a href="/add">AddMeal</a>
            </li>
          </ul>
        </li>
      </ul>
      <div className="copyright">
        <span>©Copyright | 2022</span>
      </div>
    </>
  );
}
