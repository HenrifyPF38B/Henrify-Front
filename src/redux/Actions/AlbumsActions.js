import {
  DELETE_ALBUMS,
  GET_ALBUMS,
  GET_ALBUMS_ID,
  POST_ALBUMS,
  PUT_ALBUMS,
} from "../Action-types";
import { base_url } from "../baseURL";

// CRUD ALBUMS
export const getAlbums = () => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/albums`);
    const data = await res.json();
    return dispatch({ type: GET_ALBUMS, payload: data });
  };
};

export const getAlbumsById = (id) => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/albums/${id}`);
    const data = await res.json();
    dispatch({ type: GET_ALBUMS_ID, payload: data });
  };
};

export const postAlbums = (album) => {
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/albums`
      // {
      //     method: 'POST',
      //     headers:{
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(album)
      // }
    );
    const data = await res.json();
    dispatch({ type: POST_ALBUMS, payload: data });
  };
};

export const putAlbums = (album, id) => {
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/albums/${id}`
      // {
      //     method: 'PUT',
      //     headers: {
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(album)
      // }
    );
    const data = await res.json();
    dispatch({ type: PUT_ALBUMS, payload: data });
  };
};

export const deleteAlbums = (id) => {
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/albums/${id}`
      // {
      //     method: 'DELETE'
      // }
    );
    const data = await res.json();
    dispatch({ type: DELETE_ALBUMS, payload: data });
  };
};
