import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getProductDetails } from "../../actions/productActions";
import Loader from "../loader/Loader";
import MetaData from "../MetaData";
import Reviews from "../Reviews/Reviews";
import "./productDetails.scss";
const ProductDetails = () => {
  //control description and review container
  const [isDesOrRev, setIsDesOrRev] = useState(true);
  //

  const dispatch = useDispatch();
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const params = useParams();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, alert, error]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth <= 600 ? 15 : 20,
    value: product.ratings,
    isHalf: true,
  };

  //constorl captcha number
  const [ok, setOk] = useState("");
  const [fnum, setFnum] = useState(0);
  const [snum, setSnum] = useState(0);
  const [gsum, setGsum] = useState();
  const [sum, setSum] = useState("");
  //

  const captcha = () => {
    let a = Math.floor(Math.random() * 100 + 1);
    let b = Math.floor(Math.random() * 100 + 1);
    let sum = a + b;
    return [a, b, sum];
  };

  useEffect(() => {
    let capdata = captcha();
    setFnum(capdata[0]);
    setSnum(capdata[1]);
    setGsum(capdata[2]);
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (Number(gsum) === Number(sum)) {
      setOk("YES");
      let capdata = captcha();
      setFnum(capdata[0]);
      setSnum(capdata[1]);
      setGsum(capdata[2]);
      setSum("");
    } else {
      setOk("NO");
      let capdata = captcha();
      setFnum(capdata[0]);
      setSnum(capdata[1]);
      setGsum(capdata[2]);
      setSum("");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="product-details-container">
            <MetaData title={`${product.name} | of EJ-COMMERS`} />
            <div className="image-container">
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => {
                    return (
                      <div key={item._id} className="Carosole-image-container">
                        <img
                          src={item.url}
                          alt={`${i} slide`}
                          className="Carosole-image"
                        />
                      </div>
                    );
                  })}
              </Carousel>
            </div>
            {/*  */}
            <div className="details-contaner">
              <div className="details-container-control">
                {/*  */}
                <div className="section detail-sectio1">
                  <h1>{product.name}</h1>
                  <p>Product Id: {product._id}</p>
                  <hr />
                </div>
                {/*  */}
                <div className="section detail-sectio2">
                  <div className="sub-section-review">
                    <ReactStars {...options} />{" "}
                    <span className="toatal-reviews">
                      ({product.numOfReviews} reviews)
                    </span>
                  </div>

                  <hr />
                </div>
                {/*  */}
                <div className="section detail-sectio3">
                  <h1>${product.price}</h1>
                  <div className="sub-section">
                    <div className="quantity">
                      <button type="button">-</button>
                      <div className="numberOfQuentity">
                        <p>10</p>
                      </div>
                      <button type="button">+</button>
                    </div>
                    <button type="button" className="Add-to-cart">
                      Add to Cart
                    </button>
                  </div>
                  <hr />
                </div>
                {/*  */}
                <div className="section detail-sectio4">
                  <p
                    className={product.Stock > 0 ? "in-stock" : "out-of-stock"}
                  >
                    Status:{" "}
                    <span>
                      {product.Stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </p>
                  <hr />
                </div>
                {/*  */}

                <button className="buy-now" type="button">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className="review-details-container">
            <div className="card-title-container for-spacification">
              <h2 className="card-title" onClick={() => setIsDesOrRev(true)}>
                Description And Spacification
              </h2>
              <div
                className={isDesOrRev ? "card-hr active-hr" : "card-hr"}
              ></div>
            </div>
            <div className="card-title-container for-review">
              <h2 className="card-title" onClick={() => setIsDesOrRev(false)}>
                REVIEWS
              </h2>
              <div
                className={!isDesOrRev ? "card-hr active-hr" : "card-hr"}
              ></div>
            </div>
          </div>
          <hr className="review-details-breakline" />

          {isDesOrRev ? (
            <div className="description-container">
              <h2 className="description-title">{`${product.name}`}</h2>
              <div className="spacification">
                <h3>Description/Spacification</h3>
                <p className="spacification-detail">{product.description}</p>
              </div>
            </div>
          ) : (
            <div className="review-container">
              <div className="post-review">
                <h2 className="post-tag">Post A Review</h2>
                <form className="post-review-container" onSubmit={handleSubmit}>
                  <div className="give-product-rating">
                    <div className="rating-title">
                      <h3>Your Rating</h3>
                      <span>*</span>
                    </div>
                  </div>
                  <div className="rating-user-name">
                    <div>
                      <h4>Name</h4>
                      <span>*</span>
                    </div>
                    <input id="user-name-rating" type="text" name="" />
                  </div>
                  <div className="rating-comment">
                    <div>
                      <h4>Comment</h4>
                      <span>*</span>
                    </div>
                    <textarea id="comment-area" rows="" cols=""></textarea>
                  </div>
                  <div className="Are-you-humna">
                    <div className="captcha">
                      <h3>{fnum}</h3>
                      <p>+</p>
                      <h3>{snum}</h3>
                    </div>
                    <input
                      type="text"
                      name="sum"
                      value={sum}
                      onChange={(e) => setSum(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit">Submit</button>
                </form>
                <p>
                  {ok.toString() === "YES"
                    ? "Captcha matched"
                    : "Reentry the captcha"}
                </p>
              </div>
              <div className="post-show-brakline"></div>
              <div className="show-review">
                {product.reviews && product.reviews[0] ? (
                  product.reviews.map((item) => {
                    return <Reviews key={item._id} review={item} />;
                  })
                ) : (
                  <h2 className="no-review">No Review</h2>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
