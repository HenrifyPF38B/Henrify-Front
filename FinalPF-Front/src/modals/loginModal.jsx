import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./loginModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext';
import { useNavigate } from "react-router-dom"
import { GoogleLogin } from '@react-oauth/google';
import { googleAuthSoul, loginUser } from '../redux/Actions/UsersActions';
import uniqid from 'uniqid';
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { resetMessageState } from '../redux/Actions/StateActions';

const LoginModal = () => {

  const refToast = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataContext = useContext(PlaylistContext);
  const { setLoginOpen, setLogin, setPlayerOpen } = dataContext;
  const state = useSelector(state => state);
  const { message } = state; 

  const initialForm = {
    credential: "",
    password: ""
  };

  const [form, setForm] = useState(initialForm);

  const [showPassword, setShowPassword] = useState(false);

  const handleForm = (e) =>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  };

  const handleLogin = (e) =>{
    e.preventDefault();

    if(!form.credential.length || !form.password.length){
      return refToast.current.show({sticky: true, severity: "warn", summary: "Wait!", detail: "Please complete all fields"});
    };
    
    dispatch(loginUser(form));
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
    }else if(message.msg === "User created"){
      refToast.current.show({life: 3000, severity: "success", summary: "Welcome", detail: "Congrats! You are now part of Soul Music!"});
      setTimeout(()=>{
        setLogin(message.user);
        dispatch(resetMessageState());
        if(window.location.href !== "http://localhost:3000/home"){
          setLoginOpen(false);
          setPlayerOpen(false);
          navigate("/home");
        }else{
          window.location.reload();
        }
      },3100);
    }else if(message?.email){
      setLogin(message);
      dispatch(resetMessageState());
      if(window.location.href !== "http://localhost:3000/home"){
        setLoginOpen(false);
        setPlayerOpen(false);
        navigate("/home");
      }else{
        window.location.reload();
      }
    };
  }, [message]);

  return ( 
      <article className={styles.article}>
          <Toast ref={refToast} position='top-left'></Toast>
          <div className={styles.div}>
            <div className={styles.close} onClick={()=> setLoginOpen(false)}>
              <i className="fa-solid fa-circle-xmark fa-xl" style={{color:"whitesmoke"}}></i>
            </div>
            <div className={styles.left}>
              <span>Hi there!</span>
              <span>{"Looks like you are not logged in :("}</span>
              <span>Please login in order to access all of our functionalities!</span>
              <div className={styles.img}>
                <img src="/images/lovesong.png" alt="abc" />
              </div>
            </div>
            <div className={styles.right}>
              <form onSubmit={handleLogin}>
                <div className={styles.icon}>
                  <i className='bx bx-lg bxs-user-circle' style={{color:"lightgrey"}}></i>
                </div>
                <div>
                  <input type='text' placeholder='Email' name='credential' onChange={handleForm} value={form.credential} />
                </div>
                <div className='position-relative'>
                  <input type={`${showPassword ? "text" : "password"}`} placeholder='Password' name='password' onChange={handleForm} value={form.password} />
                  <div className={styles.showPassword}>
                    {
                        showPassword ? (
                          <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword(false)}></i>
                        ):(
                          <i className="fa-solid fa-eye" onClick={()=> setShowPassword(true)}></i>
                        )
                    }
                  </div>
                </div>
                <div className={styles.forgotPassword}>
                  <span>Forgot password?</span>
                </div>
                <div className={styles.googleAuth}>
                <GoogleLogin  
                      onSuccess={credentialResponse => {
                        let data = jwt_decode(credentialResponse.credential);
                        let newUser = {
                          firstName: data.given_name,
                          lastName: data.family_name,
                          email: data.email,
                          userName: data.name,
                          password: uniqid(),
                          member: false,
                          avatar: "/images/google.svg",
                          googleUser: true
                        };
                        dispatch(googleAuthSoul(newUser));
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }} 
                    />
                </div>
                <div className={styles.buttons}>
                  <button>Login</button>
                </div>
                <div className={styles.signUpLink}>
                  <span>Don't have an account?</span>
                  <span onClick={()=> navigate("/sign-up")}>Sign up here!</span>
                </div>
              </form>
            </div>
        </div>
      </article>
   );
}
 
export default LoginModal;