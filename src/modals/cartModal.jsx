import React, { useContext, useEffect, useState } from 'react'
import styles from "./cartModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cartUser, removeFromCart } from '../redux/Actions/UsersActions';

const CartModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const state = useSelector(state => state);
  const { userCart, playlists, albums, usersId } = state;
  const data = useContext(PlaylistContext);
  const { cartModal, setCartModal } = data;
  const [totalGetter, setTotalGetter] = useState([]);
  const [totalPrice, setTotalPrice] = useState(null);

  const handleCheckout = () =>{
    setCartModal(false);
    navigate("/checkout");
  };

  const handleRemoveFromCart = (id) =>{
    dispatch(cartUser(usersId?.id, id));
    let filter = totalGetter.filter(el => el.type === "album" ? el.albumId !== id : el.playlistId !== id );
    setTotalGetter(filter);
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if(usersId.id){
      userCart.map(el => {
        return playlists.map(playlist => {
          if(playlist.playlistId === el){
           let filter = totalGetter.filter(item => item.name === playlist.name);
           if(!filter.length) return setTotalGetter([...totalGetter, playlist])
            
          }
        })
      });
      userCart.map(el => {
        return albums.map(album => {
          if(album.albumId === el){
            let filter = totalGetter.filter(item => item.name === album.name);
            if(!filter.length) return setTotalGetter([...totalGetter, album])
          }
        })
      });
    }
  }, [usersId, albums, playlists, userCart]);

  useEffect(() => {
    if(totalGetter.length){
      let total = 0;
        totalGetter.map(el => {
          total += el.price;
          return setTotalPrice(total);
        })
    }else{
      
    }
  }, [totalGetter, userCart]);

  return ( 
    <div className={styles.mainWrapper}>
      <article style={{right: cartModal ? "0px" : "-420px"}}>
        <div className={styles.div}>
          <div className={styles.hideModal} onClick={()=> setCartModal(false)}>
            <i className="fa-solid fa-caret-right fa-2xl"></i>
          </div>
          <div className={styles.container}>

          {
            totalGetter.length ? totalGetter.map((el, index) => {
              return(
                <div key={index} className={styles.wrapper}>
                  <div className={styles.subWrapper}>
                      <div className={styles.image}>
                        <div className={styles.quantityIcon}>
                            <span>3</span>
                        </div>
                        <img src={el.image} alt="abc" />
                      </div>
                      <div className={styles.details}>
                        <span>{el.name}</span>
                        <span>{el.owner}</span>
                      </div>
                      <div className='d-flex align-items-center'>
                        <div className={styles.quantity} onClick={(e)=> handleRemoveFromCart(el.type === "album" ? el.albumId : el.playlistId)}>
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
            ((userCart.length === 0|| totalGetter.length === 0) && usersId && usersId.userName)&&
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
          </div>
          {
            userCart.length > 0 && totalGetter.length > 0 &&
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