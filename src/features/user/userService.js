import axios from "axios";

const verifiyUser = async() =>{

  const response  = await axios.get("URL");
  return response.data;
}


export const userService = {
  verifiyUser,
}


