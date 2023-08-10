import React, { useContext, useEffect, useState } from 'react'
import auriculares from "../components/assets/auric.jpg"
import { Link, useNavigate } from 'react-router-dom';
import nav from '../components/assets/logo.png';
import { PlaylistContext } from '../contexts/playlistContext';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserStates } from '../redux/Actions/StateActions';

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { usersId } = state;

  const data = useContext(PlaylistContext);
  const { login, setLogin, setCartModal, setLoginOpen, setPlayerOpen } = data;

  const handleFavs = () =>{
    if(login){
      navigate("/favorites");
    }else{
      // Notification 
      setLoginOpen(true);
    }
  }

  const handleLogout = (e) =>{
    e.preventDefault();
    setLogin(false);
    dispatch(resetUserStates());
    navigate("/login");
    // window.location.reload();
  };

  return ( 
      <header className='header d-flex w-100'>
          <div className='d-flex align-items-center justify-content-center text-white'>
            <div className='d-flex justify-content-center align-items-center h-100'>
              <img src={nav} alt="abc" className='me-4' width={100} />
            </div>
            <div className='header-links d-flex ms-5 align-items-center justify-content-center text-white'>
              <p className='me-5 mb-0 mt-0' onClick={()=> navigate("home")}>Home</p>
              <p className='me-5 mb-0 mt-0' onClick={()=> navigate("about")}>About</p>
              <p className='me-5 mb-0 mt-0' onClick={()=> navigate("memberships")}>Membership</p>
              <p className='me-5 mb-0 mt-0' onClick={()=> navigate("store")}>Songs</p>
            </div>
          </div>
          <div className='info-icons d-flex align-items-center gap-30'>
            <i className="fa-solid fa-heart fa-xl" style={{color: "whitesmoke"}} onClick={handleFavs}></i>
            {
              login ? (
                <div className='dropdown'>
                  <i className="fa-solid fa-user fa-xl" style={{color:"whitesmoke"}} id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                  <div class="dropdown-menu mt-4" aria-labelledby="dropdownMenuButton">
                    <Link className="dropdown-item align-items-center d-flex" to="/account">
                      <i className='bx bx-sm bxs-user-circle me-1'></i>
                      My Account
                    </Link>
                    <Link className="dropdown-item align-items-center d-flex" to="/myPlaylist">
                      <i className='bx bx-sm bxs-playlist me-1'></i>
                      My Playlists
                    </Link>
                    {
                      usersId.admin && 
                      <Link className="dropdown-item align-items-center d-flex" to="/admin">
                          Dashboard
                      </Link>
                    }
                    <Link className="dropdown-item align-items-center d-flex" onClick={handleLogout}>Logout</Link>
                  </div>
                </div>
              ):(
                <div>
                  <i className="fa-solid fa-user fa-xl" style={{color:"whitesmoke"}} onClick={()=> {setPlayerOpen(false) ; navigate("/login")}}/>
                </div>
              )
            }
            <i className="fa-solid fa-cart-shopping fa-xl" style={{color: "whitesmoke"}} onClick={()=> setCartModal(true)}></i>
          </div>
      </header>
   );
}
 
export default Header;