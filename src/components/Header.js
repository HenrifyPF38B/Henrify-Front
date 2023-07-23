import React, { useContext, useEffect, useState } from 'react'
import auriculares from "../components/assets/auric.jpg"
import { Link, useNavigate } from 'react-router-dom';
import nav from '../components/assets/logo.png';
import { PlaylistContext } from '../contexts/playlistContext';

const Header = () => {

  const navigate = useNavigate();

  const data = useContext(PlaylistContext);
  const { login, setLogin, setCartModal } = data;


  const handleLogout = (e) =>{
    e.preventDefault();
    setLogin(false);
    navigate("/login");
    window.location.reload();
  };

  return ( 
      <header className='header'>
          <div className='d-flex align-items-center justify-content-center text-white'>
            <img src={nav} alt="abc" className='me-4' />
            <div className='header-links d-flex ms-5 align-items-center justify-content-center text-white'>
              <p className='me-5' onClick={()=> navigate("home")}>Home</p>
              <p className='me-5' onClick={()=> navigate("about")}>About</p>
              <p className='me-5' onClick={()=> navigate("membership")}>Membership</p>
              <p onClick={()=> navigate("store")}>Store</p>
            </div>
          </div>
          <div className='info-icons d-flex align-items-center gap-30'>
            <i className="fa-solid fa-heart fa-2xl" style={{color: "whitesmoke"}} onClick={()=> navigate("/favorites")}></i>
            {
              login ? (
                <div className='dropdown'>
                  <i className="fa-solid fa-user fa-2xl" style={{color:"whitesmoke"}} id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                  <div class="dropdown-menu mt-4" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item" to="/account">
                      <i className='bx bx-sm bxs-user-circle'></i>
                      My Account
                    </Link>
                    <Link className="dropdown-item" to="/myPlaylist">
                      <i className='bx bx-sm bxs-playlist'></i>
                      My Playlists
                    </Link>
                    <Link className="dropdown-item" onClick={handleLogout}>Logout</Link>
                  </div>
                </div>
              ):(
                <div>
                  <i className="fa-solid fa-user fa-2xl" style={{color:"whitesmoke"}} onClick={()=> navigate("/login")}/>
                </div>
              )
            }
            <i className="fa-solid fa-cart-shopping fa-2xl" style={{color: "whitesmoke"}} onClick={()=> setCartModal(true)}></i>
          </div>
      </header>
   );
}
 
export default Header;