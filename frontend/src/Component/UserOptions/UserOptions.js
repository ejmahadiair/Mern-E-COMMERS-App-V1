import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../../actions/userAction";
import UserOptionSetting from "../../Icons/user-icons/user-options4.svg";
import "./userOptions.scss";
const UserOptions = () => {
  const [optionOnOff, setOptionOnOff] = useState(false);

  //user control
  const { user } = useSelector((state) => state.user);
  //
  //logut activatis
  const dispatch = useDispatch();

  const logOutHandler = () => {
    dispatch(logOutUser());
  };
  //
  return (
    <>
      <div
        className={
          optionOnOff
            ? "user-options-container user-options-container-on"
            : "user-options-container"
        }
      >
        <div className="profile-photo">
          <img
            src="https://scontent.fdac34-1.fna.fbcdn.net/v/t1.6435-1/105587304_2683943768554824_3271717627285428452_n.jpg?stp=dst-jpg_p240x240&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeGqPKWk-1fcHe_Aw-jwZ8f6RjwEZmx2VGpGPARmbHZUahpd7BVFVsDz4xkZrhIa0FcYAHM3cPf4tEl2asnqszkz&_nc_ohc=DUsjY9CM1jgAX_oOaZo&tn=agtt1xdDPnzYwt0a&_nc_ht=scontent.fdac34-1.fna&oh=00_AT-cVM_uriipW-hDClMkfozneLhvPdLK7c8GmZOzEuGCqw&oe=62E46B26"
            alt="profile-photo"
          />
        </div>
        <div className="option-box">
          <ul>
            {user.role === "admin" && (
              <li>
                <Link to="/dashboard" className="option-item">
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to="/orders" className="option-item">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/userAccount" className="option-item">
                My Account
              </Link>
            </li>
            <li>
              <Link to="/cart" className="option-item">
                Cart
              </Link>
            </li>
            <li>
              <Link to="/" className="option-item" onClick={logOutHandler}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
        <div
          className="OnOff-option-box"
          onClick={() => setOptionOnOff(!optionOnOff)}
        >
          <div className="user-option-setting-box">
            <img src={UserOptionSetting} alt="" className="option-setting" />
            <div className="profile-option">
              <img
                src="https://scontent.fdac34-1.fna.fbcdn.net/v/t1.6435-1/105587304_2683943768554824_3271717627285428452_n.jpg?stp=dst-jpg_p240x240&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_eui2=AeGqPKWk-1fcHe_Aw-jwZ8f6RjwEZmx2VGpGPARmbHZUahpd7BVFVsDz4xkZrhIa0FcYAHM3cPf4tEl2asnqszkz&_nc_ohc=DUsjY9CM1jgAX_oOaZo&tn=agtt1xdDPnzYwt0a&_nc_ht=scontent.fdac34-1.fna&oh=00_AT-cVM_uriipW-hDClMkfozneLhvPdLK7c8GmZOzEuGCqw&oe=62E46B26"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {optionOnOff && (
        <div
          className="cover-on-off"
          onClick={() => setOptionOnOff(false)}
        ></div>
      )}
    </>
  );
};

export default UserOptions;
