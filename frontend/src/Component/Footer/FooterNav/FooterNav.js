import React from "react";
import "./footerNav.scss";
import paymentMethods from "../../../Icons/footer-icons/payment methods.png";
const FooterNav = () => {
  return (
    <>
      <div className="footer-nav-container">
        <div className="footer-itme">
          <p>
            Copyritht &copy; <span>Ej E-Commers</span> 2022. All rights reserved
          </p>
        </div>
        <div className="footer-itme">
          <img src={paymentMethods} alt="" />
        </div>
      </div>
    </>
  );
};

export default FooterNav;
