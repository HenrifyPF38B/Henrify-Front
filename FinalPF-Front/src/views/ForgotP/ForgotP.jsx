import React, { useEffect, useRef, useState } from 'react'
import styles from "./ForgotP.module.css"
import video from "../../components/assets/login.mp4"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPasswordUser } from '../../redux/Actions/UsersActions'
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { resetMessageState } from '../../redux/Actions/StateActions'

const ForgotP = () => {

  const refToast = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { message } = state;

  const [showConfirmation, setshowConfirmation] = useState();

  const [form, setForm] = useState({
    email: ""
  });

  const handleForm = (e) =>{
    setForm({
      email: e.target.value
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(forgotPasswordUser(form));
  }

  useEffect(() => {
    if(message === "No user found"){
      refToast.current.show({sticky: true, severity: 'error', summary: "We're sorry!", detail: "We couldn't find any account associated with that email"});
      dispatch(resetMessageState());
    }else if(message === "ForgotP sent"){
      refToast.current.show({sticky: true, severity: 'success', summary: "Great!", detail: "You should receive an email from us very soon"});
      dispatch(resetMessageState());
    }
  }, [message]);


  return ( 
    <div className={styles.wrapper}>
      <Toast ref={refToast} position='top-left' style={{zIndex:"999"}}></Toast>
      <div className={styles.videoWrapper}>
        <video autoPlay muted loop playsInline>
          <source src={video} type='video/mp4'/>
        </video>
      </div>
      <div className={styles.back} onClick={()=> navigate("/login")}>
        <i className='bx bxs-left-arrow bx-sm' style={{color:"white"}}></i>
      </div>
      <div className={styles.formDiv}>
        <form action="" className={styles.form} onSubmit={handleSubmit}>
          <h3>Forgot your password?</h3>
          <div>
            <p>
              Don't worry, we got you! Just type your email and we'll send you a link so you can reset your password!
            </p>
          </div>
          <div>
            <input type="text" placeholder='Email' name='email' onChange={handleForm} value={form.email} />
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