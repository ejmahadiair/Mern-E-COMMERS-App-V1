import React from "react";
import "./product.scss";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth <= 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <>
      <Link className="ProductCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <div className="product-data">
          <p>{product.name}</p>
          <div className="product-rating">
            <ReactStars {...options} />{" "}
            <span className="toatal-reviews">({product.numOfReviews})</span>
          </div>
          <span>{`$${product.price}`}</span>
        </div>
      </Link>
    </>
  );
};

export default Product;
