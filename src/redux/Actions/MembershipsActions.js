import {
  GET_MEMBERSHIPS,
  GET_MEMBERSHIPS_ID,
  POST_MEMBERSHIPS,
  PUT_MEMBERSHIPS,
  DELETE_MEMBERSHIPS,
} from "../Action-types";

// CRUD MEMBERSHIPS --------------------------------------------
export const getMemberships = () => {
  return async function (dispatch) {
    const res = await fetch("http://localhost:3001/api/memberships/");
    const data = await res.json();
    dispatch({ type: GET_MEMBERSHIPS, payload: data });
  };
};

export const getMembershipsById = (id) => {
  return async function (dispatch) {
    const res = await fetch(`http://localhost:3001/api/memberships/${id}`);
    const data = await res.json();
    dispatch({ type: GET_MEMBERSHIPS_ID, payload: data });
  };
};

export const postMemberships = (membership) => {
  return async function (dispatch) {
    const res = await fetch(
      "http://localhost:3001/api/memberships/"
      // {
      //     method: 'POST',
      //     headers:{
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(membership)
      // }
    );
    const data = await res.json();
    dispatch({ type: POST_MEMBERSHIPS, payload: data });
  };
};

export const putMemberships = (membership, id) => {
  return async function (dispatch) {
    const res = await fetch(
      `http://localhost:3001/api/memberships/${id}`
      // {
      //     method: 'PUT',
      //     headers: {
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(membership)
      // }
    );
    const data = await res.json();
    dispatch({ type: PUT_MEMBERSHIPS, payload: data });
  };
};

export const deleteMemberships = (id) => {
  return async function (dispatch) {
    const res = await fetch(
      `http://localhost:3001/api/memberships/${id}`
      // {
      //     method: 'DELETE'
      // }
    );
    const data = await res.json();
    dispatch({ type: DELETE_MEMBERSHIPS, payload: data });
  };
};
