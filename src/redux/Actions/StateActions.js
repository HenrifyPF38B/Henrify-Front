import { RESET_MESSAGES } from "../Action-types";

export const resetMessageState = () =>{
  return async function (dispatch) {
    
    dispatch({ type: RESET_MESSAGES });
  };
}