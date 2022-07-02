import React from "react";
import "./banner.scss";
const Banner = () => {
  return (
    <>
      <div className="banner-container">
        <h2 className="banner-item">Welcome to Ecommerce</h2>
        <p className="banner-item">Here your best products search on</p>
        <a href="#products" className="banner-item">
          <button type="button">Scroll</button>
        </a>
      </div>
    </>
  );
};

export default Banner;
