import React from "react";
import "./sections.scss";
import telephone from "../../../Icons/footer-icons/telephone.png";
import mail from "../../../Icons/footer-icons/email.png";
import address from "../../../Icons/footer-icons/address.png";
import facebook from "../../../Icons/footer-icons/facebook.png";
import linkedin from "../../../Icons/footer-icons/linkedin.png";
import instagram from "../../../Icons/footer-icons/instagram.png";
import youtube from "../../../Icons/footer-icons/youtube.png";
import playstore from "../../../Icons/footer-icons/playstore.png";
import applestore from "../../../Icons/footer-icons/apple store.png";
const Sections = () => {
  return (
    <>
      <div className="section-container">
        <div className="sections">
          <h2 className="section-title">Contact Us</h2>
          <div className="section-items">
            <div className="item">
              <img src={telephone} alt="Telephone" className="item-icon" />
              <p className="item-text">+8801642167361</p>
            </div>
            <div className="item">
              <img src={mail} alt="Mail now" className="item-icon" />
              <p className="item-text">ejmahadiair@gmail.com</p>
            </div>
            <div className="item">
              <img src={address} alt="Office address" className="item-icon" />
              <p className="item-text">Ashilia,Dhaka</p>
            </div>
          </div>
          <div className="section-icons">
            <a
              href="https://web.facebook.com/ej.mahadi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={facebook}
                alt="Check My facebook"
                className="icon-link"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/eftakhar-jaman-1a227a170/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedin}
                alt="Check our linkedin"
                className="icon-link"
              />
            </a>
            <a
              href="https://www.instagram.com/ej.mahadi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="instagram" className="icon-link" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCOt_gfEnCQKbdPjSeFRu7xg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={youtube}
                alt="Subscribe my youtube channel"
                className="icon-link"
              />
            </a>
          </div>
        </div>
        <div className="sections">
          <h2 className="section-title" style={{ fontSize: "60px" }}>
            EJ E-Commers
          </h2>
          <div className="section-items">
            <div className="item"></div>
          </div>
        </div>
        <div className="sections">
          <h2 className="section-title">Download Apps</h2>
          <div className="section-items">
            <div className="item">
              <a href="/#">
                <img
                  src={playstore}
                  alt="get in goole play store"
                  className="item-photo"
                />
              </a>
            </div>
            <div className="item">
              <a href="/#">
                <img
                  src={applestore}
                  alt="get in apple store"
                  className="item-photo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sections;
