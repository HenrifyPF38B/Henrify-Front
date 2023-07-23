import React, { useContext } from 'react'
import styles from "./Login.module.css";
import { useNavigate } from 'react-router-dom';
import { PlaylistContext } from '../../contexts/playlistContext';
import video from "../../components/assets/login.mp4"

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
      <div className={styles.back} onClick={()=> navigate("/home")}>
        <i className='bx bxs-home bx-md' style={{color:"white"}}></i>
      </div>
      <div className={styles.videoWrapper}>
        <video autoPlay muted loop playsInline>
          <source src={video} type='video/mp4'/>
        </video>
      </div>
      <div className="flip-card">
          <div className="flip-card-inner">
              <div className="flip-card-front">
                  <p className="titleF">Hey you!</p>
                  <p className='titleB'>Do you like Soul Life? Don't forget to visit our socials!</p>
                  <p className='titleC'>You are currently in the Login page, in order to Login or Sign up, just hover the card, and it will flip!</p>
                  <div className='leftLog'>
                    <img src="/images/leftLog.svg" alt="abc" width={60} height={60} />
                  </div>
              </div>
              <div className="flip-card-back">
                  <i className='bx bxs-user-circle bx-lg' style={{color:"whitesmoke"}}></i>
                  <p className="title">LOGIN</p>
                  <form className={styles.form}>
                    <div>
                      <input type="text" placeholder='Email' />
                    </div>
                    <div>
                      <input type="password" placeholder='Password' />
                    </div>
                    <span className={styles.forgotP} onClick={()=> navigate("/forgot-password")}>Forgot your password?</span>
                    <div className='d-flex align-items-center justify-content-center mt-5'>
                      <button className={styles.google}>
                        <img src="/images/google.svg" alt="abc" width={20} height={20} className='me-3'/>
                        Sign In with Google
                      </button>
                    </div>

                    {/* CORNER BUTTONS / P ABSOLUTE */}
                    <div className={styles.btn1} onClick={handleLogin}>
                      <i className="fa-solid fa-right-to-bracket fa-xl"></i>
                    </div>
                    <div className={styles.btn2} onClick={()=> navigate("/sign-up")}>
                      <i className="fa-solid fa-user-pen fa-xl"></i>
                    </div>

                  </form>
              </div>
          </div>
      </div>
    </div>
   );
}
 
export default Login;

/*
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
          <div className={styles.buttonsContainer}>
            <div className={styles.submit}>
              <button type='submit'>Log In</button>
            </div>
            <div className={styles.signup}>
              <button>Sign Up</button>
            </div>
          </div>
        </form>
      </div>
*/