import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { categoryOn } from "../../actions/productActions";
import { CATEGORY_ON } from "../../constants/productConstant";

import "./header.scss";
import MainNav from "./Navbar/Nav1/MainNav";
import SideNav from "./Navbar/Nav2/SideNav";

const Header = () => {
  const [toggle, setToggle] = useState(true);
  const [toggleClick, setToggleClick] = useState(true);

  const location = useLocation();
  const productLocation = location.pathname.includes("/products");
  console.log("path is: ", productLocation);
  const filter = useSelector((state) => state.categoryOnOff.filter);
  console.log("filter", filter);
  const dispatch = useDispatch();
  // Category on off controller
  const [isCategory, setIsCategory] = useState(true);
  const category_On = (value) => {
    switch (value) {
      case CATEGORY_ON:
        dispatch(categoryOn());
        break;
      default:
        break;
    }
  };
  //
  useEffect(() => {
    if (window.outerWidth > 1050) setIsCategory(false);
  }, []);

  useEffect(() => {
    let w;
    window.addEventListener("resize", () => {
      w = window.outerWidth;
      if (w <= 1250) {
        setToggle(true);
      } else {
        setToggle(false);
      }
      if (w <= 1050) {
        setIsCategory(true);
      } else {
        setIsCategory(false);
      }
    });
  }, []);
  const mytoogle = () => {
    let naves = document.querySelector(".NavesContainer");

    if (toggleClick) {
      naves.style.right = "0px";
    } else {
      naves.style.right = "-300px";
    }
    setToggleClick(!toggleClick);
  };
  return (
    <div className="Header-container">
      {productLocation && (
        <>
          {isCategory && (
            <div
              className="open-category"
              onClick={() => category_On(CATEGORY_ON)}
            >
              <div className="category-line cate-line-1"></div>
              <div className="category-line cate-line-2"></div>
              <div className="category-line cate-line-3"></div>
            </div>
          )}
        </>
      )}

      <div className="logo">
        <h1>EJ E-Commers</h1>
      </div>

      <div className="NavesContainer">
        <div className="Naves">
          <MainNav />
          <SideNav />
        </div>
      </div>

      {toggle && (
        <div className="toggoler">
          <div onClick={mytoogle} className="toggle">
            <div className={toggleClick ? "line lines" : "line-1 lines"}></div>
            <div className={toggleClick ? "line lines" : "line-2 lines"}></div>
            <div className={toggleClick ? "line lines" : "line-3 lines"}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
