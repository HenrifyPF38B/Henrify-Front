import { useContext, useEffect, useState } from "react";

import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { PlaylistContext } from "../contexts/playlistContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrder, getUsersById } from "../redux/Actions/UsersActions";

const PrivateRoute = ({children}) => {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userExist = localStorage.getItem("userSoulLife");
    if(!userExist){
      return navigate("/login");
    }else{
      setLoading(false);
    }
  }, []);


  if(!loading){
    return children
  }
 
};

export default PrivateRoute;