import { useContext, useEffect } from 'react';
import './App.css';
import Router from './Router';
import PlayModal from './modals/playModal';
import { PlaylistContext } from './contexts/playlistContext';
import BuyModal from './modals/buyModal';
import CartModal from './modals/cartModal';

function App() {

  const data = useContext(PlaylistContext);
  const { playerOpen, buyOpen, setBuyOpen, cartModal } = data;

  useEffect(() => {
    setBuyOpen(false);
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
