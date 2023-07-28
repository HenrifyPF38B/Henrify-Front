import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./Login.module.css";
import { useNavigate } from 'react-router-dom';
import { PlaylistContext } from '../../contexts/playlistContext';
import video from "../../components/assets/login.mp4"
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/Actions/UsersActions';
import { resetMessageState } from '../../redux/Actions/StateActions';


const Login = () => {

  const refToast = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { message } = state;
  const data = useContext(PlaylistContext);
  const { setLogin } = data;

  const [lockCard, setLockCard] = useState(false);

  const [logForm, setLogForm] = useState({
    credential: "",
    password: ""
  });

  const handleLogForm = (e) =>{
    setLogForm({
      ...logForm,
      [e.target.name]: e.target.value
    })
  };

  const handleLogin = (e) =>{
    if(!logForm.credential.length || !logForm.password.length){
      return refToast.current.show({sticky: true, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
    };
    
    dispatch(loginUser(logForm));
  };


  useEffect(() => {
    if(message === "Email or Username incorrect"){
      refToast.current.show({sticky: true, severity: "error", summary: "Ups!", detail: message});
      setTimeout(()=>{
        dispatch(resetMessageState());
      },1000);
    }else if(message === "Password Incorrect"){
      refToast.current.show({sticky: true, severity: "error", summary: "Wait!", detail: message});
      setTimeout(()=>{
        dispatch(resetMessageState());
      },1000);
    }else if(message.email){
      setLogin(message);
      dispatch(resetMessageState());
      navigate("/home");
    };
  }, [message]);

  return ( 
    <div className={styles.loginWrapper}>
      <Toast ref={refToast} position='top-left'></Toast>
      <div className={styles.back} onClick={()=> navigate("/home")}>
        <i className='bx bxs-home bx-md' style={{color:"white"}}></i>
      </div>
      <div className={styles.videoWrapper}>
        <video autoPlay muted loop playsInline>
          <source src={video} type='video/mp4'/>
        </video>
      </div>
      <div className={`flip-card ${lockCard && "locked"}`}>
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
                <div className='flip-card-lock'>
                  {
                    lockCard ? (
                      <i className="fa-solid fa-lock" onClick={()=> setLockCard(!lockCard)}></i>
                    ):(
                      <i className="fa-solid fa-lock-open" onClick={()=> setLockCard(!lockCard)}></i>
                    )
                  }
                </div>
                  <i className='bx bxs-user-circle bx-lg' style={{color:"whitesmoke"}}></i>
                  <p className="title">LOGIN</p>
                  <form className={styles.form} onSubmit={(e)=> e.preventDefault()}>
                    <div>
                      <input type="text" placeholder='Email' name='credential' onChange={handleLogForm} value={logForm.credential} />
                    </div>
                    <div>
                      <input type="password" placeholder='Password' name='password' onChange={handleLogForm} value={logForm.password} />
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