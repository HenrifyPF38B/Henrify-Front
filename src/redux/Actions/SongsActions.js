import { getSpotifyToken } from "../../spotifyHandler/spotify";
import {
  GET_SONGS,
  GET_ALL_SONGS,
  GET_SONGS_ID,
  POST_SONGS,
  PUT_SONGS,
  DELETE_SONGS,
  FILTER_SONGS
} from "../Action-types";
import { base_url } from "../baseURL";




// CRUD SONGS ------------------------------------------------
export const getSongs = () => {
  return async function (dispatch) {
    
    const res = await fetch(`${base_url}/songs`);
    const data = await res.json();
    
    dispatch({type: GET_SONGS, payload: data})
        
  };
};

export const getAllSongs = () => {
  return async function (dispatch) {
    
    const res = await fetch(`${base_url}/songs/all`);
    const data = await res.json();
    
    dispatch({type: GET_ALL_SONGS, payload: data})
        
  };
};


export const filterSongs = (data) => {
  return async function (dispatch) {
    
    dispatch({ type: FILTER_SONGS, payload: data });
  };
};


export const getSongsById = (id) => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/songs/${id}`);
    const data = await res.json();
    dispatch({ type: GET_SONGS_ID, payload: data });
  };
};






export const postSongs = (song) => {
  return async function (dispatch) {
    const res = await fetch(
    `${base_url}/songs`,
      {
          method: 'POST',
          headers:{
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify(song)
      }
    );
    const data = await res.json();
    dispatch({ type: POST_SONGS, payload: data });
  };
};

export const putSongs = (song, id) => {
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/songs/${id}`
      // {
      //     method: 'PUT',
      //     headers: {
      //         "Content-type":"application/json; charset=UTF-8"
      //     },
      //     body: JSON.stringify(song)
      // }
    );
    const data = await res.json();
    dispatch({ type: PUT_SONGS, payload: data });
  };
};

export const deleteSongs = (id) => {
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/songs/${id}`,
      {
          method: 'DELETE'
      }
    );
    const data = await res.json();
    dispatch({ type: DELETE_SONGS, payload: data });
  };
};
