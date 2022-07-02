import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sideNav.scss";
import Search from "../../../../Icons/search.gif";
import InSearch from "../../../../Icons/loupe.png";
import { accountContext } from "../../../../App";
import { useSelector } from "react-redux";
const SideNav = () => {
  //search box control
  const [isSearch, setIsSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  //
  //loginsignup control
  const { isAuthenticated } = useSelector((state) => state.user);
  const account = useContext(accountContext);
  const handleAccount = (value) => {
    switch (value) {
      case "login":
        account(true);

        break;
      case "register":
        account(false);

        break;

      default:
        break;
    }
  };
  //

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`products/${keyword}`);
      setKeyword("");
    } else {
      navigate("products");
      setKeyword("");
    }
    setIsSearch(false);
  };

  return (
    <>
      <div className="side-nav-container">
        <div className="nav-bar">
          <ul className="nav">
            <li className="nav-item search-nav-item">
              <img
                src={Search}
                alt=""
                className="search-link"
                onClick={() => setIsSearch(!isSearch)}
              />
              <form
                className={
                  isSearch ? "form-search search-has" : "search-form search-has"
                }
                onSubmit={searchHandler}
              >
                <input
                  type="text"
                  name=""
                  className="search-box"
                  placeholder="Search your product"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="search-in">
                  <img src={InSearch} alt="" className="in-search" />
                </button>
              </form>
            </li>
            {!isAuthenticated && (
              <>
                {" "}
                <li className="nav-item">
                  <Link
                    to="/account"
                    className="btn-link"
                    onClick={() => handleAccount("login")}
                  >
                    LogIn
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/account"
                    className="btn-link"
                    onClick={() => handleAccount("register")}
                  >
                    Create Account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideNav;
