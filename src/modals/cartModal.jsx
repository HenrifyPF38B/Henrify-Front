import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./cartModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartUser, removeFromCart } from '../redux/Actions/UsersActions';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 

const CartModal = () => {

  const refToast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const state = useSelector(state => state);
  const { userCart, usersId, message } = state;
  const data = useContext(PlaylistContext);
  const { cartModal, setCartModal } = data;
  const [totalPrice, setTotalPrice] = useState(null);
  // const [totalGetter, setTotalGetter] = useState([]);

  const handleCheckout = () =>{
    setCartModal(false);
    navigate("/checkout");
  };
  const handleRemoveFromCart = (el) =>{
    if(message !== "Removing from cart"){
      dispatch(cartUser(usersId?.id, el));
      dispatch(removeFromCart(el.name));
    }else{
      refToast.current.show({life: 3000, severity: 'warn', summary: "Wow, not so fast!", detail: `Our robots are working on removing this items from your cart!`});
    }
  };


  useEffect(() => {
    if(userCart.length){
      let total = 0;
        userCart.map(el => {
          total += el.price;
          return setTotalPrice(total);
        })
    }else{
      
    }
  }, [userCart]);

  return ( 
    <div className={styles.mainWrapper}>
      <Toast ref={refToast} position='top-left'></Toast>
      <article style={{right: cartModal ? "0px" : "-420px"}}>
        <div className={styles.div}>
          <div className={styles.hideModal} onClick={()=> setCartModal(false)}>
            <i className="fa-solid fa-caret-right fa-2xl"></i>
          </div>
          <div className={styles.container}>

          {
            (userCart.length && usersId.id) ? userCart.map((el, index) => {
              return(
                <div key={index} className={styles.wrapper}>
                  <div className={styles.subWrapper}>
                      <div className={styles.image}>
                        <div className={styles.quantityIcon}>
                            <span>{el.quantity}</span>
                        </div>
                        <img src={el.image} alt="abc" />
                      </div>
                      <div className={styles.details}>
                        <span>{el.name}</span>
                        <span>{el.owner}</span>
                      </div>
                      <div className='d-flex align-items-center'>
                        <div className={styles.quantity} onClick={(e)=> handleRemoveFromCart(el)}>
                          <i className="fa-solid fa-circle-minus fa-sm" style={{color:"whitesmoke"}}></i>
                        </div>
                        <div className={styles.eachPrice}>
                          <span>${el.price}</span>
                        </div>
                      </div>
                    </div>
                </div>
              )
            })
            :
            ""
          }
          
          {
            userCart.length === 0 && usersId && usersId.userName &&
              <div className={styles.emptyDiv}> 
                <span className={styles.emptyDiv0}>Your Cart is Empty</span>
                <div className={styles.emptyDiv1}>
                  <span>We're sorry {usersId?.userName}, looks like there's nothing here...</span>
                </div>
                <div className={styles.emptyDiv2}>
                  <span>It appears that your shopping cart is empty. To start shopping please click the button below!</span>
                </div>
                <div className={styles.emptyDiv3} onClick={()=> setCartModal(false)}>
                  <span>Close & Keep Shopping</span>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
              </div>
          }
          {
            !usersId.id &&
              <div className={styles.emptyDiv}> 
                <span className={styles.emptyDiv0}>Your Cart is Empty</span>
                <div className={styles.emptyDiv1}>
                  <span>We're sorry, looks like there's nothing here...</span>
                </div>
                <div className={styles.emptyDiv2}>
                  <span>It appears that your shopping cart is empty. To start shopping please click the button below!</span>
                </div>
                <div className={styles.emptyDiv3} onClick={()=> setCartModal(false)}>
                  <span>Close & Keep Shopping</span>
                  <i className="fa-solid fa-angle-right"></i>
                </div>
              </div>
          }
          </div>
          {
            usersId.id && userCart.length > 0 &&
              <div className={styles.checkout}>
                <div>
                  <span>Subtotal</span>
                  <span>${totalPrice && totalPrice}</span>
                </div>
                <div onClick={handleCheckout} className={styles.checkoutBtn}>
                  <span>Checkout</span>
                </div>
              </div>
          }
          
        </div>
      </article>
    </div>
   );
}
 
export default CartModal;