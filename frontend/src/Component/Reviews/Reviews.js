import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./reviews.scss";
const Reviews = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth <= 600 ? 15 : 20,
    value: review.rating,
    isHalf: true,
  };
  //for Read Control
  const [read, setRead] = useState(false);
  //
  return (
    <>
      <div id="Porduct-Reviews-container" className="Reviews-container">
        <div className="right">
          <div className="avatar same">
            <img className="avatar-image" src="" alt="review" />
          </div>
          <h3 className="review-user-name  same">{review.name}</h3>
          <div className="user-rating same">
            <ReactStars {...options} />
          </div>
          <div id="userComment" className="user-comment">
            <p
              className={
                !read ? "read-more read-comment" : "read-less read-comment"
              }
            >
              {review.comment}
            </p>
          </div>
          {review.comment.length > 50 && (
            <a
              href="#Porduct-Reviews-container"
              className="read-control"
              onClick={() => setRead(!read)}
            >
              {!read ? "Read More" : "Read Less"}
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
