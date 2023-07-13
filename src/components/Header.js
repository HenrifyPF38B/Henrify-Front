import React, { useEffect, useState } from 'react'
import auriculares from "../components/assets/auric.jpg"
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return ( 
      <header className='header'>
          <div className='d-flex align-items-center justify-content-center text-white'>
            <img src="/images/logo.svg" alt="abc" className='me-4' />
            <div className='header-links d-flex ms-5 align-items-center justify-content-center text-white'>
              <p className='me-5' onClick={()=> navigate("home")}>Home</p>
              <p className='me-5' onClick={()=> navigate("about")}>About</p>
              <p className='me-5' onClick={()=> navigate("album")}>Albums</p>
              <p onClick={()=> navigate("store")}>Store</p>
            </div>
          </div>
          <div className='info-icons d-flex align-items-center gap-30'>
            <i className="fa-solid fa-heart fa-2xl" style={{color: "whitesmoke"}} onClick={()=> navigate("/favorites")}></i>
            <div className='user' onClick={()=> navigate("/login")}>
              <i className="fa-solid fa-user fa-2xl" style={{color: "whitesmoke"}}></i>
            </div>
            <i className="fa-solid fa-cart-shopping fa-2xl" style={{color: "whitesmoke"}}></i>
          </div>
      </header>
   );
}
 
export default Header;