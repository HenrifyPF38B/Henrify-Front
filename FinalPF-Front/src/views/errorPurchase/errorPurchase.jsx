import React from 'react'
import styles from "./errorPurchase.module.css"
import { useNavigate } from "react-router-dom"

const ErrorPurchase = () => {

  const navigate = useNavigate();

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <img src="/images/xmark.svg" alt="abc" width={120} />
        </div>
        <div className={styles.div}>
          <div className={styles.div1}>
            <span>Error</span>
          </div>
          <div className={styles.div2}>
            <span>It looks like something went wrong with your purchase...</span>
          </div>
          <div className={styles.div3}>
            <span>Please try again later or contact our support for further assistance!</span>
          </div>
          <div className={styles.div4}>
            <button onClick={()=> navigate("/home")}>Back Home</button>
          </div>
        </div>
      </div>
    </div>
   );
}
 
export default ErrorPurchase;