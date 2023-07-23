import React, { useState } from 'react'
import styles from "./ResetP.module.css"
import video from "../../components/assets/login.mp4"
import { useNavigate } from 'react-router-dom'

const ResetP = () => {

  const navigate = useNavigate();

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  
  return ( 
    <div className={styles.forgotWrapper}>
      <div className={styles.videoWrapper}>
        <video autoPlay muted loop playsInline>
          <source src={video} type='video/mp4'/>
        </video>
      </div>
      <div className={styles.formDiv}>
        <form action="" className={styles.form}>
          <h2 className={styles.h2}>Reset Password</h2>
          <div>
            <input type="password" placeholder='Password' onChange={(e)=> setPassword1(e.target.value)}/>
          </div>
          <div>
            <input type="password" placeholder='Confirm Password' onChange={(e)=> setPassword2(e.target.value)} />
          </div>
          <div className={styles.submit}>
            <button type='submit'>Confirm & Change</button>
          </div>
        </form>
      </div>
    </div>
   );
}
 
export default ResetP;