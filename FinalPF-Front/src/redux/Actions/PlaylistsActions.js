import {
  GET_PLAYLISTS,
  GET_PLAYLISTS_ID,
  POST_PLAYLISTS,
  PUT_PLAYLISTS,
  DELETE_PLAYLISTS,
  EDIT_P_SONGS,
} from "../Action-types";
import { base_url } from "../baseURL";

// CRUD PLAYLISTS --------------------------------------------
export const getPlaylists = () => {
  
  return async function (dispatch) {
    
    const res = await fetch(`${base_url}/playlists`);
    const data = await res.json();
    
    return dispatch({ type: GET_PLAYLISTS, payload: data });
  };
};

export const getPlaylistsById = (id) => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/playlists/${id}`);
    const data = await res.json();
    dispatch({ type: GET_PLAYLISTS_ID, payload: data });
  };
};

export const postPlaylists = (playlist) => {
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/playlists`
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
      `${base_url}/playlists/${id}`
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
      `${base_url}/playlists/${id}`
      // {
      //     method: 'DELETE'
      // }
    );
    const data = await res.json();
    dispatch({ type: DELETE_PLAYLISTS, payload: data });
  };
};


export const editPSongsState = (data) => {
  return async function (dispatch) {
    
    dispatch({ type: EDIT_P_SONGS, payload: data });
  };
};
