import React from 'react'
import styles from "./SuccessPurchase.module.css"
import { useNavigate } from 'react-router-dom';

const SuccessPurchase = () => {

  const navigate = useNavigate();

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Success Icon */}
        <div className={styles.icon}>
          <img src="/images/successIcon.svg" alt="abc" />
        </div>
        
        {/* Text */}
        <div className={styles.details}>
          <p>Thank you for your purchase!</p>
          <span>We received your order successfully! You'll be getting it very soon!</span>  
        </div>
        
        <div className={styles.supportTitle}>
          <span>Support</span>
          <i className="fa-solid fa-headset ms-2"></i>
        </div>
        <div className={styles.support}>
          <div className={styles.span1}>
            <span>If you have any question about your order please don't doubt in contact us!</span>
          </div>
          <div className='d-flex align-items-center mb-3'>
            <i className="fa-solid fa-paper-plane fa-bounce me-3" style={{color:"#1f1f1f"}}></i>
            <a href="mailto:henrifyb@gmail.com">henrifyb@gmail.com</a>
          </div>
        </div>

        {/* Redirect Buttons */}
        <div className={styles.buttons}>
          <button onClick={()=> navigate("/home")}>Got it!</button>
          <button onClick={()=> navigate("/account")}>View my Order</button>
        </div>
      </div>
    </div>
   );
}
 
export default SuccessPurchase;