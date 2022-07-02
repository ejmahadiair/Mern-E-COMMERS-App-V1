import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryOff,
  clearError,
  getProduct,
} from "../../actions/productActions";
import { useAlert } from "react-alert";
import PaginationCall from "../Pagination/PaginationCall.js";
import Loader from "../loader/Loader";
import Product from "../Product/Product";
import "./products.scss";
import { useParams } from "react-router-dom";
// import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { Slider } from "@material-ui/core";
import { CATEGORY_OFF } from "../../constants/productConstant";
import MetaData from "../MetaData";

const catagoris = [
  { name: "Select Catagory", disabled: "disabled" },
  { name: "Laptop" },
  { name: "T-Shirt" },
  { name: "Mobile" },
  { name: "SomeThing" },
  { name: "Electronics" },
];

const Products = () => {
  const {
    loading,
    products,
    productsCount,
    resultPerPage,
    error,
    filterProductCount,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  //price filter control
  const [minPrice, setMinprice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [price, setPrice] = useState([0, 1000]);
  console.log(`products: ${products.length}`);
  //

  //catagori filter control
  const [category, setCategory] = useState("");
  //

  //Ratings filter control
  const [ratings, setRatings] = useState(0);
  //

  // Category on off controller
  const filter = useSelector((state) => state.categoryOnOff.filter);
  const category_Off = (value) => {
    switch (value) {
      case CATEGORY_OFF:
        dispatch(categoryOff());
        break;

      default:
        break;
    }
  };
  //

  console.log(filterProductCount);
  const alert = useAlert();
  const params = useParams();
  const keyword = params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, value) => {
    switch (value) {
      case "submit":
        e.preventDefault();
        setPrice([minPrice, maxPrice]);
        break;
      case "min":
        setMinprice(e.target.value);
        break;

      case "max":
        setMaxPrice(e.target.value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [alert, dispatch, error, keyword, currentPage, price, category, ratings]);
  return (
    <>
      <div className="products-container">
        <MetaData title="Products | EJ-Commers" />
        <h1 className="products-tag">The Products</h1>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="all-products">
              {products &&
                products.map((product) => {
                  return <Product key={product._id} product={product} />;
                })}
            </div>

            <div
              className={
                filter ? "filter-box-slide-nav filter-box" : "filter-box"
              }
            >
              <div
                className="close-button"
                onClick={() => category_Off(CATEGORY_OFF)}
              >
                <div className="line-1"></div>
                <div className="line-2"></div>
              </div>
              <div className="price-filter-container filter-container">
                <Typography className="Price-tag-title">Price</Typography>
                <form
                  className="filter-price"
                  onSubmit={(e) => priceHandler(e, "submit")}
                >
                  <input
                    type="text"
                    name="min"
                    value={minPrice}
                    placeholder={`min: ${minPrice}`}
                    onChange={(e) => priceHandler(e, "min")}
                  />
                  <p>-</p>
                  <input
                    type="text"
                    name="max"
                    value={maxPrice}
                    placeholder={`max: ${maxPrice}`}
                    onChange={(e) => priceHandler(e, "max")}
                  />
                  <button type="submit">Get</button>
                </form>
                <div className="filter-break-line"></div>
              </div>

              <div className="catagori-filter-container filter-container">
                <Typography className="catagory-tag-title">
                  Catagoris
                </Typography>
                <select
                  className="category-box"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {catagoris.map((category) => {
                    return (
                      <option
                        key={category.name}
                        className="category-link"
                        value={category.name}
                        disabled={category.disabled}
                        selected={category.disabled}
                      >
                        {category.name}
                      </option>
                    );
                  })}
                </select>
                <div className="filter-break-line"></div>
              </div>
              <fieldset className="rating-filter-container filter-container">
                <Typography component="legend">Rating</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>

            {resultPerPage < filterProductCount && (
              <PaginationCall
                currentPage={currentPage}
                resultPerPage={resultPerPage}
                productsCount={productsCount}
                setCurrentPageNo={setCurrentPageNo}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Products;
