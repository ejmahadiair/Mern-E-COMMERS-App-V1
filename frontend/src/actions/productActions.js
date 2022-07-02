import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR,
  CATEGORY_ON,
  CATEGORY_OFF,
} from "../constants/productConstant";

export const getProduct =
  (keyword = "", currentPage, price = [0, 1000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const res = await axios.get(link);
      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: res.data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const res = await axios.get(`/api/v1/product/${id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.message,
    });
  }
};

export const categoryOn = () => {
  return {
    type: CATEGORY_ON,
  };
};
export const categoryOff = () => {
  return {
    type: CATEGORY_OFF,
  };
};
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
