import React, { useContext } from 'react'
import styles from "./cartModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext'
import { useNavigate } from 'react-router-dom';

const CartModal = () => {
  const navigate = useNavigate();
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const data = useContext(PlaylistContext);
  const { cartModal, setCartModal } = data;

  const handleCheckout = () =>{
    setCartModal(false);
    navigate("/checkout");
  };

  return ( 
    <div className={styles.mainWrapper}>
      <article style={{right: cartModal ? "0px" : "-420px"}}>
        <div className={styles.div}>
          <div className={styles.hideModal} onClick={()=> setCartModal(false)}>
            <i className="fa-solid fa-caret-right fa-2xl"></i>
          </div>
          <div className={styles.container}>

          {
            dummy.map((el, index) => {
              
              return(
                <div key={index} className={styles.wrapper}>
                  <div className={styles.subWrapper}>
                      <div className={styles.image}>
                        <div className={styles.quantityIcon}>
                            <span>3</span>
                        </div>
                        <img src="/images/ari.jpeg" alt="abc" />
                      </div>
                      <div className={styles.details}>
                        <span>Sweetener</span>
                        <span>Ariana Grande</span>
                      </div>
                      <div className='d-flex align-items-center'>
                        <div className={styles.quantity}>
                          <i className="fa-solid fa-circle-minus fa-sm" style={{color:"whitesmoke"}}></i>
                        </div>
                        <div className={styles.eachPrice}>
                          <span>$33,70</span>
                        </div>
                      </div>
                    </div>
                </div>
              )
            })
          }
          </div>
          <div className={styles.checkout}>
            <div>
              <span>Subtotal</span>
              <span>$1.550</span>
            </div>
            <div onClick={handleCheckout}>
              <span>Checkout</span>
            </div>
          </div>
        </div>
      </article>
    </div>
   );
}
 
export default CartModal;