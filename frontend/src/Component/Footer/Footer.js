import React from "react";
import "./footer.scss";
import FooterNav from "./FooterNav/FooterNav";
import Sections from "./Sections/Sections";
const Footer = () => {
  return (
    <>
      <div className="footer-conatiner">
        <Sections />
        <FooterNav />
      </div>
    </>
  );
};

export default Footer;
