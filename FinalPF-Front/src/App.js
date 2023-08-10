import { useContext, useEffect, useState } from 'react';
import './App.css';
import Router from './Router';
import PlayModal from './modals/playModal';
import { PlaylistContext } from './contexts/playlistContext';
import BuyModal from './modals/buyModal';
import CartModal from './modals/cartModal';
import { initMercadoPago } from '@mercadopago/sdk-react'
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from './redux/Actions/AlbumsActions';
import { getPlaylists } from './redux/Actions/PlaylistsActions';
import PlaylistModal from './modals/playlistModal';
import { getSongs } from './redux/Actions/SongsActions';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { getUserOrder, getUsersById } from './redux/Actions/UsersActions';
import LoginModal from './modals/loginModal';
import { getMemberships } from './redux/Actions/MembershipsActions';
import { useNavigate } from 'react-router-dom';
import AddToPlaylistModal from './modals/addToPlaylistModal';
import { getReviews } from './redux/Actions/ReviewsActions';



function App() {

  const data = useContext(PlaylistContext);
  const { playerOpen, buyOpen, setBuyOpen, modalOpen, setModalOpen, refPreviewNotAvailableAppJS, loginOpen, setLoginOpen, openAddToPlaylist } = data;
  const dispatch = useDispatch();
  const [playerModalAaudio, setPlayerModalAaudio] = useState("");
  const state = useSelector(state => state);
  const { message, usersId } = state;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    setBuyOpen(false);
    initMercadoPago('TEST-55b4f9ca-af32-4ae5-b5e9-baffcc5ed180');
    dispatch(getAlbums());
    dispatch(getPlaylists());
    dispatch(getSongs());
    dispatch(getMemberships());
    let userExist = localStorage.getItem("userSoulLife");

    if(userExist){
      let parsedUser = JSON.parse(userExist);
      console.log(parsedUser.id);
      dispatch(getUsersById(parsedUser.id));
      dispatch(getUserOrder(parsedUser.id));
    }
  }, []);


  useEffect(() => {
    if(message === "User now is member"){
      dispatch(getUsersById(usersId.id));
    }
  }, [message]);

  return (
    <>
    {
      window.location.href === "http://localhost:3000/myPlaylist" &&
      <div className="createPlaylistButton" onClick={() => navigate('/create')}>
        <i className="fa-solid fa-headphones-simple"></i>
        <span>Create Playlist</span>
      </div>
    }
    {
      openAddToPlaylist && <AddToPlaylistModal/>
    }
      {
        loginOpen && <LoginModal setLoginOpen={setLoginOpen}/>
      }
     {
        modalOpen && <PlaylistModal setModalOpen={setModalOpen}/>
      }
    <Toast ref={refPreviewNotAvailableAppJS} position='top-left'></Toast>
    <CartModal/>
    {buyOpen && <BuyModal/>}
    {playerOpen && <PlayModal/>}
    <Router/>
    </>
  );
}

export default App;







