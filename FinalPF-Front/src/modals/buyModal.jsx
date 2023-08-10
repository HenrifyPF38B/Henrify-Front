import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./buyModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, cartUser } from '../redux/Actions/UsersActions';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 


const BuyModal = () => {

  const refToast = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { usersId, userCart, playlists, albums } = state;
  const data = useContext(PlaylistContext);

  const { buyOpen, setBuyOpen, setLoginOpen } = data;
  const [quantity, setQuantity] = useState(1);


  const handleQuantity = (e) =>{
    if(quantity > 0 && quantity < 10){
      if(e.target.dataset.action === "inc" && quantity < 9){
        setQuantity(quantity + 1);
      }else if(e.target.dataset.action === "dec" && quantity > 1){
        setQuantity(quantity - 1);
      };
    }
  };

  useEffect(() => {
    console.log(buyOpen);
  }, []);

  const handleAddToCart = () =>{
    if(usersId.id && buyOpen){
      let filter = userCart.filter(el => el.name === buyOpen.name);

      if(filter.length > 0){
        refToast.current.show({life: 3000, severity: 'error', summary: `Hey ${usersId?.userName}!`, detail: `This ${buyOpen.type} is already in your cart!`});
      }else{
        
        dispatch(cartUser(usersId?.id, {...buyOpen, quantity}));
        dispatch(addToCart({...buyOpen, quantity}));
        refToast.current.show({life: 3000, severity: 'success', summary: "Done!", detail: `This ${buyOpen.type} has been added to your cart`});
        
      }
    }else{
      // Alerta que no esta logeado
      setBuyOpen(false);
      setLoginOpen(true);
    }
  };

  // Aplico estilos para darle un efecto de transicion al modal en el file App.css
  return ( 
    <div className={`buyModal ${buyOpen ? "active" : ""}`}>
      <Toast ref={refToast} position='top-left'></Toast>
      <article className={styles.article}>
        <div className={styles.div}>
          <div className={styles.back} onClick={()=> setBuyOpen(false)}>
            <i className="fa-solid fa-caret-left"></i>
          </div>
          <div className={styles.img}>
            <img src={buyOpen?.image} alt="abc" />
          </div>
          <div className='d-flex align-items-start mt-5 justify-content-between'>
            <div className={styles.details}>
              <span>{buyOpen?.artist ? buyOpen?.artist : buyOpen?.owner}</span>
              <span>{buyOpen?.name}</span>
            </div>
            <div className={styles.price}>
              <span>${buyOpen?.price * quantity}</span>
            </div>
          </div>
          <div className='d-flex align-items-center mt-5'>
            <div className='d-flex flex-column align-items-start gap-20'>
              <i className="fa-solid fa-caret-up fa-lg" style={{color:"#777777"}} data-action="inc" onClick={handleQuantity}></i>
              <i className="fa-solid fa-caret-down fa-lg" style={{color:"#777777"}} data-action="dec" onClick={handleQuantity}></i>
            </div>
            <span className={styles.quantity}>x{quantity}</span>
          </div>
          <div className={styles.submit} onClick={handleAddToCart}>
            <span>Add to Cart</span>
          </div>
        </div>
      </article>
    </div>
   );
}
 
export default BuyModal;