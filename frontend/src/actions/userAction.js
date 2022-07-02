import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  CLEAR_ERROR,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_SUCCESS,
} from "../constants/userConstant";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/v1/login`,
      {
        email,
        password,
      },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  console.log(name, " ", email, " ", password);
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      header: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `/api/v1/register`,
      {
        name,
        email,
        password,
      },
      config
    );
    console.log("data: ", data);
    dispatch({ type: REGISTER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_FAIL, payload: error.response.data.message });
  }
};
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const { data } = await axios.get(`/api/v1/me`);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
  }
};
export const logOutUser = () => async (dispatch) => {
  try {
    await axios.get(`/api/v1/logout`);
    dispatch({ type: USER_LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response.data.message });
  }
};
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
