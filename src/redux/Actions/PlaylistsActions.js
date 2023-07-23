import {
  GET_PLAYLISTS,
  GET_PLAYLISTS_ID,
  POST_PLAYLISTS,
  PUT_PLAYLISTS,
  DELETE_PLAYLISTS,
} from "../Action-types";

// CRUD PLAYLISTS --------------------------------------------
export const getPlaylists = () => {
  return async function (dispatch) {
    const res = await fetch("http://localhost:3001/api/playlists/");
    const data = await res.json();
    dispatch({ type: GET_PLAYLISTS, payload: data });
  };
};

export const getPlaylistsById = (id) => {
  return async function (dispatch) {
    const res = await fetch(`http://localhost:3001/api/playlists/${id}`);
    const data = await res.json();
    dispatch({ type: GET_PLAYLISTS_ID, payload: data });
  };
};

export const postPlaylists = (playlist) => {
  return async function (dispatch) {
    const res = await fetch(
      "http://localhost:3001/api/playlists/"
      // {
      //     method: 'POST',
      //     headers:{
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(playlist)
      // }
    );
    const data = await res.json();
    dispatch({ type: POST_PLAYLISTS, payload: data });
  };
};

export const putPlaylists = (playlist, id) => {
  return async function (dispatch) {
    const res = await fetch(
      `http://localhost:3001/api/playlists/${id}`
      // {
      //     method: 'PUT',
      //     headers: {
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(playlist)
      // }
    );
    const data = await res.json();
    dispatch({ type: PUT_PLAYLISTS, payload: data });
  };
};

export const deletePlaylists = (id) => {
  return async function (dispatch) {
    const res = await fetch(
      `http://localhost:3001/api/playlists/${id}`
      // {
      //     method: 'DELETE'
      // }
    );
    const data = await res.json();
    dispatch({ type: DELETE_PLAYLISTS, payload: data });
  };
};
