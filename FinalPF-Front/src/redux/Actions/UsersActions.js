import {
  GET_USERS,
  GET_USERS_ID,
  POST_USERS,
  PUT_USERS,
  DELETE_USERS,
  CREATE_USER,
  LOGIN_USER,
  FAVS_USER,
  ADD_FAV,
  REMOVE_FAV,
  CART_USER,
  ADD_CART,
  REMOVE_CART,
  CREATE_ORDER,
  GET_ORDER,
  GOOGLE_AUTH,
  MAKE_MEMBER,
  FORGOT_PASSWORD,
  CREATE_USER_PLAYLIST,
  DELETE_USER_PLAYLIST,
  UPDATE_USER_PLAYLIST,
  TOGGLE_PLAYLIST,
} from "../Action-types";
import { base_url } from "../baseURL";

// CRUD USERS -----------------------------------------------------------
export const getUsers = () => {
  return async function (dispatch) {
    const res = await fetch(`${base_url}/users`);
    const data = await res.json();
    dispatch({ type: GET_USERS, payload: data });
  };
};

export const getUsersById = (id) => {
  console.log(id);
  return async function (dispatch) {
    const res = await fetch(`${base_url}/users/${id}`);
    const data = await res.json();
    console.log(data);
    dispatch({ type: GET_USERS_ID, payload: data });
  };
};

export const googleAuthSoul = (newUser) => {
  
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/users/googleAuth`,
      {
          method: 'POST',
          headers:{
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify(newUser)
      }
    );
    const data = await res.json();
    

    dispatch({ type: GOOGLE_AUTH, payload: data });
    
  };
};

export const createUser = (user) => {
  
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/users/register`,
      {
          method: 'POST',
          headers:{
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify(user)
      }
    );
    const data = await res.json();
    console.log(data);

    dispatch({ type: CREATE_USER, payload: data });
    
  };
};

export const loginUser = (user) => {
  
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/users/login`,
      {
          method: 'POST',
          headers:{
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify(user)
      }
    );
    const data = await res.json();
    console.log(data);

    dispatch({ type: LOGIN_USER, payload: data });
    
  };
};

export const favsUser = (userId, productId) =>{
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/users/favs`,
      {
          method: 'PUT',
          headers:{
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify({userId, productId})
      }
    );
    const data = await res.json();

    dispatch({ type: FAVS_USER, payload: data });
    
  };
};

export const cartUser = (userId, product) =>{
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/users/cart`,
      {
          method: 'PUT',
          headers:{
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify({userId, product})
      }
    );
    const data = await res.json();

    dispatch({ type: CART_USER, payload: data });
    
  };
};


export const addToFav = (id) =>{
  return async function (dispatch){

    dispatch({ type: ADD_FAV, payload: id});
  }
};


export const removeFromFav = (id) =>{
  return async function (dispatch){

    dispatch({ type: REMOVE_FAV, payload: id});
  }
};


export const addToCart = (id) =>{
  console.log(id);
  return async function (dispatch){

    dispatch({ type: ADD_CART, payload: id});
  }
};


export const removeFromCart = (id) =>{
  return async function (dispatch){

    dispatch({ type: REMOVE_CART, payload: id});
  }
};



export const createOrder = (order) =>{
  return async function (dispatch){
    const res = await fetch(
      `${base_url}/orders/create`,
      {
          method: 'POST',
          headers:{
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify({order})
      }
    );
    const data = await res.json();
    console.log(data);

    dispatch({ type: CREATE_ORDER, payload: data })
  }
}

export const getUserOrder = (userId) =>{
  return async function (dispatch){
    const res = await fetch(
      `${base_url}/orders/${userId}`
    );

    const data = await res.json();
   

    dispatch({ type: GET_ORDER, payload: data })
  }
};


export const makeMember = (info) => {
  
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/users/member`,
      {
          method: 'PUT',
          headers:{
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify(info)
      }
    );
    const data = await res.json();
    console.log(data);

    dispatch({ type: MAKE_MEMBER, payload: data });
    
  };
};

export const forgotPasswordUser = (body) => {
  
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/users/forgot-password`,
      {
          method: 'PUT',
          headers:{
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify(body)
      }
    );
    const data = await res.json();
    console.log(data);

    dispatch({ type: FORGOT_PASSWORD, payload: data });
    
  };
};

export const putUsers = (userId, newData) => {
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/users`,
      {
          method: 'PUT',
          headers: {
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify({userId, newData})
      }
    );
    const data = await res.json();
    
    dispatch({ type: PUT_USERS, payload: data });
  };
};

export const deleteUsers = (id) => {
  return async function (dispatch) {
    const res = await fetch(
      `${base_url}/users/${id}`,
      {
          method: 'DELETE'
      }
    );
    const data = await res.json();
    dispatch({ type: DELETE_USERS, payload: data });
  };
};


export const createUserPlaylist = (newPlaylist) =>{
  return async function (dispatch){
    const res = await fetch(
      `${base_url}/playlists/user/create`,
      {
          method: 'POST',
          headers: {
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify(newPlaylist)
      }
    );
    const data = await res.json();
    
    dispatch({ type: CREATE_USER_PLAYLIST, payload: data });
  }
}


export const deleteUserPlaylist = (playlistId) =>{
  return async function (dispatch){
    const res = await fetch(
      `${base_url}/playlists/user/${playlistId}`,
      {
          method: 'DELETE',
          headers: {
              "Content-type":"application/json; charset=UTF-8"
          }
      }
    );
    const data = await res.json();
    
    dispatch({ type: DELETE_USER_PLAYLIST, payload: data });
  }
}

export const updateUserPlaylist = (playlist) =>{
 
  return async function (dispatch){
    const res = await fetch(
      `${base_url}/playlists/user/update`,
      {
          method: 'PUT',
          headers: {
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify(playlist)
      }
    );
    const data = await res.json();
    
    dispatch({ type: UPDATE_USER_PLAYLIST, payload: data });
  }
};

export const toggleUserPlaylist = (info) =>{
  
  return async function (dispatch){
    const res = await fetch(
      `${base_url}/playlists/user/toggle`,
      {
          method: 'PUT',
          headers: {
              "Content-type":"application/json; charset=UTF-8"
          },
          body: JSON.stringify(info)
      }
    );
    const data = await res.json();
    
    dispatch({ type: TOGGLE_PLAYLIST, payload: data });
  }
};