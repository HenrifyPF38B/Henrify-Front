import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const AdminPrivateRoute = ({children, user}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let userExist = JSON.parse(localStorage.getItem("userSoulLife"));
    
    if(!userExist || !userExist.admin){
      return navigate("/login");
    }else{
      setLoading(false);
    }
  }, []);


  if(!loading){
    return children
  }

}
 
export default AdminPrivateRoute;