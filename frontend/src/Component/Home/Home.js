import React, { useEffect, useState } from "react";
import "./home.scss";
import Banner from "../Banner/Banner";
import Product from "../Product/Product";
import MetaData from "../MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productActions";
import Loader from "../loader/Loader";
import { useAlert } from "react-alert";
import PaginationCall from "../Pagination/PaginationCall";
import { useParams } from "react-router-dom";

// const product = {
//   name: "Blue T-Shirt",
//   images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
//   price: "$10",
//   _id: "ejmahadi",
// };

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const params = useParams();
  const keyword = params.keyword;

  const {
    loading,
    products,
    productsCount,
    resultPerPage,
    error,
    filterProductCount,
  } = useSelector((state) => state.products);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  console.log(filterProductCount);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, alert, error, keyword, currentPage]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="home-container">
          <MetaData title="EJ E-Commers" />
          <Banner />
          <div className="products" id="products">
            <div className="product-menu-container">
              <h1 className="feature-product">Featured Products</h1>
            </div>

            <div className="product-list">
              {products &&
                products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
            </div>
          </div>
          {resultPerPage < productsCount && (
            <PaginationCall
              currentPage={currentPage}
              resultPerPage={resultPerPage}
              productsCount={productsCount}
              setCurrentPageNo={setCurrentPageNo}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Home;
