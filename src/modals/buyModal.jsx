import React, { useContext, useState } from 'react'
import styles from "./buyModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext';

const BuyModal = () => {

  const data = useContext(PlaylistContext);

  const { buyOpen, setBuyOpen } = data;
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

  // Aplico estilos para darle un efecto de transicion al modal en el file App.css
  return ( 
    <div className={`buyModal ${buyOpen ? "active" : ""}`}>
      <article className={styles.article}>
        <div className={styles.div}>
          <div className={styles.back} onClick={()=> setBuyOpen(false)}>
            <i className="fa-solid fa-caret-left"></i>
          </div>
          <div className={styles.img}>
            <img src="/images/justin.png" alt="abc" />
          </div>
          <div className='d-flex align-items-start mt-5 justify-content-between'>
            <div className={styles.details}>
              <span>Justice</span>
              <span>Justin Bieber</span>
            </div>
            <div className={styles.price}>
              <span>$55.75</span>
            </div>
          </div>
          <div className='d-flex align-items-center mt-5'>
            <div className='d-flex flex-column align-items-start gap-20'>
              <i className="fa-solid fa-caret-up fa-lg" style={{color:"#777777"}} data-action="inc" onClick={handleQuantity}></i>
              <i className="fa-solid fa-caret-down fa-lg" style={{color:"#777777"}} data-action="dec" onClick={handleQuantity}></i>
            </div>
            <span className={styles.quantity}>x{quantity}</span>
          </div>
          <div className={styles.submit}>
            <span>Add to Cart</span>
          </div>
        </div>
      </article>
    </div>
   );
}
 
export default BuyModal;