import React from 'react'
import styles from "./ForgotP.module.css"
import video from "../../components/assets/login.mp4"
import { useNavigate } from 'react-router-dom'


const ForgotP = () => {

  const navigate = useNavigate();

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.videoWrapper}>
        <video autoPlay muted loop playsInline>
          <source src={video} type='video/mp4'/>
        </video>
      </div>
      <div className={styles.back} onClick={()=> navigate("/login")}>
        <i className='bx bxs-left-arrow bx-sm' style={{color:"white"}}></i>
      </div>
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