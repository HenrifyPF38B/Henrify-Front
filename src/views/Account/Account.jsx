import React, { useEffect, useState } from 'react'
import styles from "./Account.module.css"
import { Link, useNavigate } from "react-router-dom";
import DelModal from '../../modals/delModal';

const Account = () => {

  const navigate = useNavigate();

  // Controla seccion de Profile
  const [profile, setProfile] = useState(true);
  
  // Controla seccion de Orders
  const [orders, setOrders] = useState(false);
  
  // Controla seccion de Password
  const [changeP, setChangeP] = useState(false);

  // Controla View Details
  const [viewDetails, setViewDetails] = useState(false);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [openPromo, setOpenPromo] = useState(true);
  // Vamos a mostrar la promo si los datos del usuario muestran que es premium.
  
  // Edit User & InitialState

  const initialState = {
    userName:"Nacho",
    email: "gramajofeijoonacho@gmail.com",
    firstName: "Ignacio",
    lastName: "Gramajo Feijoo",
    phone: 17863813003
  }

  const [editUser, setEditUser] = useState(false);
  const handleEditUser = () =>{
    // Code here
  };

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
  //   setViewDetails(false);
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
      setViewDetails(false);
    };
    if(e.target.dataset.section === "password"){
      setProfile(false);
      setOrders(false);
      setChangeP(true);
      setViewDetails(false);
    };
  };

  return ( 
    <div className={styles.wrapper}>
      {delModal && <DelModal setDelModal={setDelModal}/>}
      <div className={styles.delete} onClick={()=> setDelModal(true)}>
        <span>Delete Account</span>
      </div>
      {
        openPromo &&
        <div className={styles.banner}>
          <div className={styles.bannerTop}>
            <div>
              <h2>Get Premium for free for 1 month</h2>
              <p>After that it's only $15*** per month. Cancel whenever you want!</p>
              <button>Begin</button>
            </div>
            <div className={styles.bannerImg}>
              <img src="/images/promo.jpg" alt="abc" />
            </div>
          </div>
          <div className={styles.bannerBottom}>
            <p>
            *** Afterwards, it only costs $15.00 per month + taxes (includes VAT [21%], PAIS [8%], IG/IBP [45%], which you will see on your bank statement). The free month is not available to users who have already tried Premium. <Link>Terms and Conditions apply</Link>.
            </p>
          </div>
        </div>
      }
      <div className='d-flex align-items-center w-100 h-100'>
        
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
        </div>
          
        {
          profile && 

            <div className={styles.profile}>
              <div className={styles.profileAnimation}>
                <div className={styles.circle2}></div>
                <div className={styles.circle2}></div>
                <div className={styles.profileContainer}>
                  <div className={styles.image}>
                    <img src="/images/nachoPic.jpeg" alt="abc" />
                  </div>
                  <div className={styles.name}>
                    <span>Ignacio Gramajo Feijoo</span>
                  </div>
                  <div className={styles.buttons}>
                    <button>Upgrade</button>
                    <button onClick={()=> {setViewDetails(true) ; setProfile(false)}}>View Details</button>
                  </div>
                </div>
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
        {
          viewDetails && 
            <div className={styles.details}>
              <div className={styles.backEdit} onClick={()=> {setViewDetails(false) ; setProfile(true) ; setEditUser(false)}}>
                <i className="fa-solid fa-circle-left fa-xl" style={{color:"whitesmoke"}}></i>
              </div>
              <h2 className={styles.detailsTitle}>Account Details</h2>
              <div className={styles.formDiv}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <form>
                  <div>
                    <input type="text" name='userName' readOnly={editUser ? false : true} defaultValue={initialState.userName}  />
                  </div>
                  <div>
                    <input type="email" name='email' readOnly={editUser ? false : true} defaultValue={initialState.email} />
                  </div>
                  <div>
                    <input type="text" name='firstName' readOnly={editUser ? false : true} defaultValue={initialState.firstName}  />
                  </div>
                  <div>
                    <input type="text" name='lastName' readOnly={editUser ? false : true} defaultValue={initialState.lastName} />
                  </div>
                  <div>
                    <input type="number" name='phone' readOnly={editUser ? false : true} defaultValue={initialState.phone} />
                  </div>
                  {
                    editUser ? (
                      <div className='d-flex align-items-center gap-20 mt-3'>
                        <div className={styles.confirmEdit} onClick={handleEditUser}>
                          <i className="fa-solid fa-circle-check fa-2xl"></i>
                        </div>
                        <div className={styles.cancelEdit} onClick={()=> setEditUser(false)}>
                          <i className="fa-solid fa-circle-xmark fa-2xl"></i>
                        </div>
                      </div>
                    ):(
                      <div className={styles.edit} onClick={()=> setEditUser(true)}>
                        <i className="fa-solid fa-user-pen fa-2xl mt-3" style={{color: "lightgrey"}}></i>
                      </div>
                    )
                  }
                </form>
              </div>
              
            </div>
        }
      </div>

    </div>
   );
}
 
export default Account;