import React, { useContext } from 'react'
import styles from "./Login.module.css";
import { useNavigate } from 'react-router-dom';
import { PlaylistContext } from '../../contexts/playlistContext';

const Login = () => {

  const navigate = useNavigate();
  const data = useContext(PlaylistContext);
  const { setLogin } = data;

  const handleLogin = (e) =>{
    setLogin(true);
    navigate("/home")
  };

  return ( 
    <div className={styles.loginWrapper}>
      <div className={styles.formDiv}>
        <form className={styles.form} onSubmit={handleLogin}>
          <div>
            <input type="email" placeholder='Type your email' required/>
          </div>
          <div className={styles.password}>
            <input type="password" placeholder='Password' required/>
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