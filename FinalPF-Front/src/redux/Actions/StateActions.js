import { RESET_EDITPSONGS, RESET_MESSAGES, RESET_USERSID_USERFAVS } from "../Action-types";

export const resetMessageState = () =>{
  return async function (dispatch) {
    
    dispatch({ type: RESET_MESSAGES });
  };
}

export const resetUserStates = () =>{
  return async function (dispatch) {
    
    dispatch({ type: RESET_USERSID_USERFAVS });
  };
}



export const resetFilteredSongs = () =>{
  return async function (dispatch) {
    
    dispatch({ type: RESET_EDITPSONGS });
  };
};