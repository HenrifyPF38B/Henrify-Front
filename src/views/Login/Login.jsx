import React from 'react'
import styles from "./Login.module.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  return ( 
    <div className={styles.loginWrapper}>
      <div className={styles.formDiv}>
        <form className={styles.form}>
          <div>
            <input type="text" placeholder='Type your email' />
          </div>
          <div className={styles.password}>
            <input type="password" placeholder='Password' />
          </div>
          <div className={styles.forgotP} onClick={()=> navigate("/forgot-password")}>
            <p>Forgot Password?</p>
          </div>
          <div className={styles.submit}>
            <button type='submit'>Log In</button>
          </div>
        </form>
      </div>
    </div>
   );
}
 
export default Login;