import {
  GET_GENRES,
  GET_GENRES_ID,
  POST_GENRES,
  DELETE_GENRES,
} from "../Action-types";

// CRUD GENRES --------------------------------------------
export const getGenres = () => {
  return async function (dispatch) {
    const res = await fetch("http://localhost:3001/api/genres/");
    const data = await res.json();
    dispatch({ type: GET_GENRES, payload: data });
  };
};

export const getGenresById = (id) => {
  return async function (dispatch) {
    const res = await fetch(`http://localhost:3001/api/genres/${id}`);
    const data = await res.json();
    dispatch({ type: GET_GENRES_ID, payload: data });
  };
};

export const postGenres = (genre) => {
  return async function (dispatch) {
    const res = await fetch(
      "http://localhost:3001/api/genres/"
      // {
      //     method: 'POST',
      //     headers:{
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(genre)
      // }
    );
    const data = await res.json();
    dispatch({ type: POST_GENRES, payload: data });
  };
};

export const deleteGenres = (id) => {
  return async function (dispatch) {
    const res = await fetch(
      `http://localhost:3001/api/genres/${id}`
      // {
      //     method: 'DELETE'
      // }
    );
    const data = await res.json();
    dispatch({ type: DELETE_GENRES, payload: data });
  };
};
