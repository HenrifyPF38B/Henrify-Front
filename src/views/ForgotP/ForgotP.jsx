import React from 'react'
import styles from "./ForgotP.module.css"

const ForgotP = () => {



  return ( 
    <div className={styles.wrapper}>
      <div className={styles.formDiv}>
        <form action="" className={styles.form}>
          <h3>Forgot your password?</h3>
          <div>
            <p>
              Don't worry, we got you! Just type your email and we'll send you a link so you can reset your password!
            </p>
          </div>
          <div>
            <input type="text" placeholder='Email' />
          </div>
          <div className={styles.submit}>
            <button>Send</button>
          </div>
        </form>
      </div>
    </div>
   );
}
 
export default ForgotP;