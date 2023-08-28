import axios from "axios";
import {
  IsError,
  IsLoading,
  PRODUCT_REQUEST,
  SINGLE_PRODUCT_REQUEST,

} from "./actionTypes";
const Url = "https://moviesserver.onrender.com/movies";

export const getProducts = (obj, page) => (dispatch) => {
  console.log("starting");
  dispatch({ type: IsLoading });
  axios
    .get(`${Url}`)
    .then((data) => {


      dispatch({ type: PRODUCT_REQUEST, payload: data.data });
    })
    .catch((error) => {
      dispatch({ type: IsError });
    });
};

export const getSingleProducts = (id) => (dispatch) => {
  console.log(id, "inside seinglefunction");
  dispatch({ type: IsLoading });
  axios
    .get(`${Url}/${id}`)
    .then((data) => {
      dispatch({ type: SINGLE_PRODUCT_REQUEST, payload: data.data });
      console.log(data.data);
    })
    .catch((error) => {
      dispatch({ type: IsError });
    });
};
