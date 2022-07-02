import React, { useEffect, useRef, useState } from "react";
import {
  EmailOutlined,
  LockOpenOutlined,
  FaceOutlined,
  ScreenLockLandscapeOutlined,
  Visibility,
  VisibilityOff,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import "./account.scss";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, login, register } from "../../actions/userAction";
import Loader from "../loader/Loader";
const Account = ({ isAcounnt }) => {
  //login register control
  const switcher = useRef();
  const switchLogin = useRef();
  const switchRegister = useRef();

  const switchTab = (tab) => {
    switch (tab) {
      case "login":
        switcher.current.classList.add("switch-to-left");
        switcher.current.classList.remove("switch-to-right");

        switchLogin.current.classList.add("login-container-switched");
        switchRegister.current.classList.remove("register-container-switched");

        break;
      case "register":
        switcher.current.classList.add("switch-to-right");
        switcher.current.classList.remove("switch-to-left");

        switchRegister.current.classList.add("register-container-switched");
        switchLogin.current.classList.remove("login-container-switched");

        break;
      default:
        break;
    }
  };
  //password visibility control
  const [visible, setVisible] = useState(false);
  //

  //login data set and pass
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  //Register data set and pass
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  //
  const alert = useAlert();
  const navigate = useNavigate();
  //react redux part start
  const { loading, user, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  console.log("user: ", user);
  const dispatch = useDispatch();
  const loginHandle = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    if (isAuthenticated) {
      navigate("/userAccount");
    }
  };
  const registerHandle = (e) => {
    e.preventDefault();
    dispatch(register(userName, userEmail, userPassword));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/userAccount");
    }
  }, [alert, dispatch, error, navigate, isAuthenticated]);

  //
  //

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="account-container">
            <div className="user-account-container">
              <div className="login-signUp-button">
                <div className="logiin-signUp-button-action">
                  <p
                    className="login-button"
                    onClick={() => switchTab("login")}
                  >
                    LOGIN
                  </p>
                  <p
                    className="singup-button"
                    onClick={() => switchTab("register")}
                  >
                    REGISTER
                  </p>
                </div>
                <div
                  className={isAcounnt ? "switch-to-left" : "switch-to-right"}
                  ref={switcher}
                ></div>
              </div>
              {/*  */}

              <div
                className={
                  isAcounnt
                    ? "login-container login-container-switched"
                    : "login-container"
                }
                ref={switchLogin}
              >
                <form className="login-form" onSubmit={loginHandle}>
                  <div className="input-container">
                    <EmailOutlined />
                    <input
                      type="email"
                      name="emial"
                      value={email}
                      placeholder="Email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-container">
                    <LockOpenOutlined />
                    <input
                      type={!visible ? "password" : "text"}
                      name="password"
                      value={password}
                      placeholder="Password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <div
                      className="login-visibility-conrtol"
                      onClick={() => setVisible(!visible)}
                    >
                      {!visible ? <VisibilityOff /> : <Visibility />}
                    </div>
                  </div>
                  <p className="forget-password">Forget Password ?</p>
                  <div className="login-button-container">
                    <button type="submit" className="login-button">
                      LOGIN
                    </button>
                  </div>
                </form>
              </div>
              {/*  */}
              <div
                className={
                  !isAcounnt
                    ? "register-container register-container-switched"
                    : "register-container"
                }
                ref={switchRegister}
              >
                <form className="register-form" onSubmit={registerHandle}>
                  <div className="register-input-container">
                    <FaceOutlined />
                    <input
                      type="text"
                      name="userName"
                      placeholder="Name"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="register-input-container">
                    <EmailOutlined />
                    <input
                      type="email"
                      name="userEmail"
                      placeholder="Email"
                      required
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  <div className="register-input-container">
                    <ScreenLockLandscapeOutlined />
                    <input
                      type={!visible ? "password" : "text"}
                      name="userPassword"
                      placeholder="Password"
                      required
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <div
                      className="register-visibility-conrtol"
                      onClick={() => setVisible(!visible)}
                    >
                      {!visible ? <VisibilityOff /> : <Visibility />}
                    </div>
                  </div>

                  <div className="Register-button-container">
                    <button type="submit" className="register-button">
                      REGISTER
                    </button>
                  </div>
                </form>
              </div>
              <Link to="/" className="riderect-home">
                Home
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Account;
