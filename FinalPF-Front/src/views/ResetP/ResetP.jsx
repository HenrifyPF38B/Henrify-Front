import React, { useEffect, useRef, useState } from 'react'
import styles from "./ResetP.module.css"
import video from "../../components/assets/login.mp4"
import { useNavigate, useParams } from 'react-router-dom'
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { putUsers } from '../../redux/Actions/UsersActions';
import { resetMessageState } from '../../redux/Actions/StateActions';


const ResetP = () => {
  
  const refToast = useRef();
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { message } = state;

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleReset = (e) =>{
    e.preventDefault();
    if(password1.length === 0 || password2.length === 0){
      return refToast.current.show({sticky: true, severity: 'warn', summary: "Wait!", detail: "Please complete all fields"});
    }else if(password1 !== password2){
      return refToast.current.show({sticky: true, severity: 'warn', summary: "We're sorry!", detail: "Passwords must match"});
    }else if(password1 === password2){
      let decodedUser = jwt_decode(token);
    
      if(decodedUser.id){
        dispatch(putUsers(decodedUser.id, {password: password1}));
      }else{
        return refToast.current.show({sticky: true, severity: 'error', summary: "Error", detail: "Invalid token"});
      }
    }
  };

  
  useEffect(() => {
    if(message  === "User updated"){
      refToast.current.show({life: 3000, severity: 'success', summary: "Done!", detail: "Your password has been updated"});
      setTimeout(()=>{
        dispatch(resetMessageState());
        navigate("/login");
      },3100)
    }
  }, [message]);
  
  return ( 
    <div className={styles.forgotWrapper}>
      <Toast ref={refToast} position='top-left' style={{zIndex:"999"}}></Toast>
      <div className={styles.videoWrapper}>
        <video autoPlay muted loop playsInline>
          <source src={video} type='video/mp4'/>
        </video>
      </div>
      <div className={styles.formDiv}>
        <form action="" className={styles.form} onSubmit={handleReset}>
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