import React, { useEffect, useState } from 'react'
import styles from "./Account.module.css"
import { useNavigate } from "react-router-dom";
import DelModal from '../../modals/delModal';

const Account = () => {

  const navigate = useNavigate();

  // Controla seccion de Profile
  const [profile, setProfile] = useState(true);
  
  // Controla seccion de Orders
  const [orders, setOrders] = useState(false);
  
  // Controla seccion de Password
  const [changeP, setChangeP] = useState(false);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    if(password1.length > 0 && password2.length > 0){
      if(password1 === password2){
        setPasswordMatch(true);
      }else{
        setPasswordMatch(false);
      }
    }else{
      setPasswordMatch(false);
    }
  }, [password1, password2]);
  
  // Controla el modal de Delete Account
  const [delModal, setDelModal] = useState(false);


  // Desactivo este UEF para que no se ponga Profile cada vez que hagan un cambio en Orders. 
  // Cuando terminen Orders activen de nuevo el UEF, y pongan el UseState de Profile en true, y los demas en false (Orders, Password)
  // Este UseEffect es para que siempre se vea Profile inicialmente
  // useEffect(() => {
  //   setProfile(true);
  //   setOrders(false);
  //   setChangeP(false);
  // }, []);




  // Cuando clickean en Profile por ejemplo, cammbia el UseSate de Profile a TRUE, lo que hace que se renderize la seccion del perfil.
  const handleSection = (e) =>{
    if(e.target.dataset.section === "profile"){
      setProfile(true);
      setOrders(false);
      setChangeP(false);
    };
    if(e.target.dataset.section === "orders"){
      setProfile(false);
      setOrders(true);
      setChangeP(false);
    };
    if(e.target.dataset.section === "password"){
      setProfile(false);
      setOrders(false);
      setChangeP(true);
    };
  };

  return ( 
    <div className={styles.wrapper}>
      {delModal && <DelModal setDelModal={setDelModal}/>}
      <div className={styles.panel}>
        <div className={styles.back} onClick={()=> navigate("/home")}>
          <i className="fa-regular fa-circle-left fa-lg"></i>
        </div>
        <div className='d-flex align-items-center justify-content-between' data-section="profile" onClick={handleSection}>
          <span className={profile ? styles.linkActive : ""} data-section="profile">Profile</span>
          <i className="fa-solid fa-caret-down" style={{transform: profile ? "rotate(-90deg)" : ""}} data-section="profile"></i>
        </div>
        <div className='d-flex align-items-center justify-content-between' data-section="orders" onClick={handleSection}>
          <span className={orders ? styles.linkActive : ""} data-section="orders">Orders</span>
          <i className="fa-solid fa-caret-down" style={{transform: orders ? "rotate(-90deg)" : ""}} data-section="orders"></i>
        </div>
        <div className='d-flex align-items-center justify-content-between' data-section="password" onClick={handleSection}>
          <span className={changeP ? styles.linkActive : ""} data-section="password">Password</span>
          <i className="fa-solid fa-caret-down" style={{transform: changeP ? "rotate(-90deg)" : ""}} data-section="password"></i>
        </div>
        <div className={styles.delete} onClick={()=> setDelModal(true)}>
          <span>Delete Account</span>
        </div>
      </div>
      {
        profile && 
        <div className={styles.profile}>
          <div className={styles.welcome}>
            <h2>Hello Nacho!</h2>
          </div>
          <div className={styles.image}>
            <img src="/images/nachoPic.jpeg" alt="abc" />
          </div>
          <div className={styles.name}>
            <span>Ignacio Gramajo Feijoo</span>
          </div>
          <div className={styles.buttons}>
            <button>Upgrade</button>
            <button>View Details</button>
          </div>
          <div className={styles.viewDetails}>
            <form className={styles.detailsForm}>
              <div>
                <input type="email" readOnly value={"gramajofeijoonacho@gmail.com"}/>
              </div>
              <div>
                <input type="text" readOnly value={"Ignacio"}/>
              </div>
              <div>
                <input type="text" readOnly value={"Gramajo Feijoo"}/>
              </div>
              <div>
                <input type="number" readOnly value={+17866778932}/>
              </div>
            </form>
          </div>
        </div>
      }
      {
        orders &&
        <div className={styles.orders}>

        </div>
      }
      {
        changeP &&
        <div className={styles.password}>
          <div className={styles.popContainer}>
            <div className={styles.pop}>
              <h2>Privacy & Settings</h2>
                <div className={styles.popTop}>
                  <span>Please be aware once you change your password this action is permanent and it can't be undone.</span>
                  <span>We encourage you to make a strong password by following these requirements:</span>
                </div>
                <div className={styles.popBottom}>
                  <span>It includes a combination of uppercase and lowercase letters.</span>
                  <span>It contains numbers: For Example "0" and "4" are used.</span>
                  <span>It incorporates special characters: For Example "!" and "@" and "#" are used.</span>
                  <span>It has a sufficient length of 14 characters.</span>
                </div>
            </div>
            <div className='d-flex flex-column align-items-center justify-content-center'>
              <form className={styles.form}>
                <div>
                  <input type="password" placeholder='New Password' onChange={(e)=> setPassword1(e.target.value)} />
                </div>
                <div>
                  <input type="password" placeholder='Confirm Password' onChange={(e)=> setPassword2(e.target.value)} />
                </div>
                <div>
                  <button type='submit' className={passwordMatch ? "passwordsMatch" : ""}>Change Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }

    </div>
   );
}
 
export default Account;