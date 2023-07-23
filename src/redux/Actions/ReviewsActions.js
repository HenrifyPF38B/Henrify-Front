import {
  GET_REVIEWS,
  GET_REVIEWS_ID,
  POST_REVIEWS,
  PUT_REVIEWS,
  DELETE_REVIEWS,
} from "../Action-types";

// CRUD REVIEWS ----------------------------------------------
export const getReviews = () => {
  return async function (dispatch) {
    const res = await fetch("http://localhost:3001/api/reviews/");
    const data = await res.json();
    dispatch({ type: GET_REVIEWS, payload: data });
  };
};

export const getReviewsById = (id) => {
  return async function (dispatch) {
    const res = await fetch(`http://localhost:3001/api/reviews/${id}`);
    const data = await res.json();
    dispatch({ type: GET_REVIEWS_ID, payload: data });
  };
};

export const postReviews = (review) => {
  return async function (dispatch) {
    const res = await fetch(
      "http://localhost:3001/api/reviews/"
      // {
      //     method: 'POST',
      //     headers:{
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(review)
      // }
    );
    const data = await res.json();
    dispatch({ type: POST_REVIEWS, payload: data });
  };
};

export const putReviews = (review, id) => {
  return async function (dispatch) {
    const res = await fetch(
      `http://localhost:3001/api/reviews/${id}`
      // {
      //     method: 'PUT',
      //     headers: {
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(review)
      // }
    );
    const data = await res.json();
    dispatch({ type: PUT_REVIEWS, payload: data });
  };
};

export const deleteReviews = (id) => {
  return async function (dispatch) {
    const res = await fetch(
      `http://localhost:3001/api/reviews/${id}`
      // {
      //     method: 'DELETE'
      // }
    );
    const data = await res.json();
    dispatch({ type: DELETE_REVIEWS, payload: data });
  };
};
