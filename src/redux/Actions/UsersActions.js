import {
  GET_USERS,
  GET_USERS_ID,
  POST_USERS,
  PUT_USERS,
  DELETE_USERS,
} from "../Action-types";

// CRUD USERS -----------------------------------------------------------
export const getUsers = () => {
  return async function (dispatch) {
    const res = await fetch("http://localhost:3001/api/users/");
    const data = await res.json();
    dispatch({ type: GET_USERS, payload: data });
  };
};

export const getUsersById = (id) => {
  return async function (dispatch) {
    const res = await fetch(`http://localhost:3001/api/users/${id}`);
    const data = await res.json();
    dispatch({ type: GET_USERS_ID, payload: data });
  };
};

export const postUsers = (user) => {
  return async function (dispatch) {
    const res = await fetch(
      "http://localhost:3001/api/users/"
      // {
      //     method: 'POST',
      //     headers:{
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(user)
      // }
    );
    const data = await res.json();
    dispatch({ type: POST_USERS, payload: data });
  };
};

export const putUsers = (user, id) => {
  return async function (dispatch) {
    const res = await fetch(
      `http://localhost:3001/api/users/${id}`
      // {
      //     method: 'PUT',
      //     headers: {
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(user)
      // }
    );
    const data = await res.json();
    dispatch({ type: PUT_USERS, payload: data });
  };
};

export const deleteUsers = (id) => {
  return async function (dispatch) {
    const res = await fetch(
      `http://localhost:3001/api/users/${id}`
      // {
      //     method: 'DELETE'
      // }
    );
    const data = await res.json();
    dispatch({ type: DELETE_USERS, payload: data });
  };
};
