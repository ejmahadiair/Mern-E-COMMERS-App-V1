import React from "react";
import { Link } from "react-router-dom";
import "./mainNav.scss";

const MainNav = () => {
  return (
    <div className="nav-bar-container">
      <div className="nav-bar">
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/products" className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            <a href="/#" className="nav-link">
              Contact Us
            </a>
          </li>
          <li className="nav-item">
            <a href="/#" className="nav-link">
              About Us
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MainNav;
