import { useContext, useEffect } from 'react';
import './App.css';
import Router from './Router';
import PlayModal from './modals/playModal';
import { PlaylistContext } from './contexts/playlistContext';
import BuyModal from './modals/buyModal';
import CartModal from './modals/cartModal';
import { initMercadoPago } from '@mercadopago/sdk-react'

function App() {

  const data = useContext(PlaylistContext);
  const { playerOpen, buyOpen, setBuyOpen, cartModal } = data;

  useEffect(() => {
    setBuyOpen(false);
    initMercadoPago('TEST-55b4f9ca-af32-4ae5-b5e9-baffcc5ed180');
  }, []);

  return (
    <>
    <CartModal/>
    {buyOpen && <BuyModal/>}
    {playerOpen && <PlayModal/>}
    <Router/>
    </>
  );
}

export default App;
