import { useContext, useEffect, useState } from 'react';
import './App.css';
import Router from './Router';
import PlayModal from './modals/playModal';
import { PlaylistContext } from './contexts/playlistContext';
import BuyModal from './modals/buyModal';
import CartModal from './modals/cartModal';
import { initMercadoPago } from '@mercadopago/sdk-react'
import { useDispatch } from 'react-redux';
import { getAlbums } from './redux/Actions/AlbumsActions';
import { getPlaylists } from './redux/Actions/PlaylistsActions';
import PlaylistModal from './modals/playlistModal';
import { getSongs } from './redux/Actions/SongsActions';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { getUsersById } from './redux/Actions/UsersActions';



function App() {

  const data = useContext(PlaylistContext);
  const { playerOpen, buyOpen, setBuyOpen, modalOpen, setModalOpen, refPreviewNotAvailableAppJS } = data;
  const dispatch = useDispatch();
  const [playerModalAaudio, setPlayerModalAaudio] = useState("");

  

  useEffect(() => {
    setBuyOpen(false);
    initMercadoPago('TEST-55b4f9ca-af32-4ae5-b5e9-baffcc5ed180');
    dispatch(getAlbums());
    dispatch(getPlaylists());
    dispatch(getSongs());
    let userExist = localStorage.getItem("userSoulLife");

    if(userExist){
      let parsedUser = JSON.parse(userExist);
      console.log(parsedUser.id);
      // dispatch(getUsersById(parsedUser.id));
    }
  }, []);



  return (
    <>
    
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







