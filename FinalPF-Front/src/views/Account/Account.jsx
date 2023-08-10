import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./Account.module.css"
import { Link, useNavigate } from "react-router-dom";
import DelModal from '../../modals/delModal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { PlaylistContext } from '../../contexts/playlistContext';
import { putUsers } from '../../redux/Actions/UsersActions';
import { resetUserStates } from '../../redux/Actions/StateActions';
import PlaylistCard from '../../components/Cards/playlistCard';
import AlbumCard from '../../components/Cards/albumCard';

const Account = () => {

  const refToast = useRef();
  const refInputUsername = useRef();
  const refInputEmail = useRef();
  const refInputFirstname = useRef();
  const refInputLastname = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { usersId, message, userOrders } = state;

  const dataContext = useContext(PlaylistContext);
  const { setLogin } = dataContext;

  // Controla seccion de Profile
  const [profile, setProfile] = useState(true);
  
  // Controla seccion de Orders
  const [orders, setOrders] = useState(false);
  
  // Controla seccion de Password
  const [changeP, setChangeP] = useState(false);

  // Controla View Details
  const [viewDetails, setViewDetails] = useState(false);

  // Controla Order View
  const [viewOrder, setViewOrder] = useState(false);

  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [openPromo, setOpenPromo] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  // Vamos a mostrar la promo si los datos del usuario muestran que es premium.
  
  // Edit User & InitialState

  const initialState = {
    userName: usersId.userName,
    email: usersId.email,
    firstName: usersId.firstName,
    lastName: usersId.lastName,
  }

  const [editForm, setEditForm] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleEditForm = (e) =>{
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  };

  const handleCancelEdit = () =>{
    refInputUsername.current.value = initialState.userName;
    refInputEmail.current.value = initialState.email;
    refInputFirstname.current.value = initialState.firstName;
    refInputLastname.current.value = initialState.lastName;
    setEditUser(false);
    setEditForm({
      userName: "",
      email: "",
      firstName: "",
      lastName: "",
    });
  };

  const handleActiveEdit = () =>{
    setEditUser(true);
    setEditForm(initialState); 
  };

  // Para remover o poner el read only de los inputs
  const [editUser, setEditUser] = useState(false);


  const handleEditUser = () =>{

    if(editForm.userName === initialState.userName && editForm.email === initialState.email && editForm.firstName === initialState.firstName && editForm.lastName === initialState.lastName){
      return refToast.current.show({sticky: true, severity: 'warn', summary: `Hey ${usersId.userName}`, detail: "Looks like there is nothing to update!"});
    }else{
      Swal.fire({
        icon:"info",
        title: `Hey ${usersId.userName}`,
        text:"Do you want to update your account? Please know once you update your account, you will be redirected to the Login page!",
        showCancelButton: true,
        cancelButtonText:"Nope",
        showConfirmButton: true,
        confirmButtonText:"Yes!",
        cancelButtonColor: "lightgrey",
        confirmButtonColor:"palevioletred"
      })
      .then(result => {
        if(result.isConfirmed){
          // Update user
          dispatch(putUsers(usersId?.id, editForm));
        }else if(result.isDenied){
          return;
        }
      })  
    }
  };

  const handleChangePassword = () =>{
    if(usersId.googleUser){
      return refToast.current.show({sticky: true, severity: 'info', summary: `Hey ${usersId.userName}`, detail: "You can't change your password because you signed up with Google"});
    }else if(password1 !== password2){
      return refToast.current.show({sticky: true, severity: 'warn', summary: `Hey ${usersId.userName}`, detail: "Passwords must match!"});
    }else if(password1.length === 0 || password2.length === 0){
      return refToast.current.show({sticky: true, severity: 'warn', summary: `Hey ${usersId.userName}`, detail: "Please complete all fields!"});
    }else if(password1 === password2){
      Swal.fire({
        icon:"info",
        title: `Hey ${usersId.userName}`,
        text:"Do you want to update your password? Please know once you update it, you will be redirected to the Login page!",
        showCancelButton: true,
        cancelButtonText:"Nope",
        showConfirmButton: true,
        confirmButtonText:"Yes!",
        cancelButtonColor: "lightgrey",
        confirmButtonColor:"palevioletred"
      })
      .then(result => {
        if(result.isConfirmed){
          // Update user
          dispatch(putUsers(usersId?.id, {password: password1}));
        }else if(result.isDenied){
          return;
        }
      })  
    }
  };
  
  // Controla el modal de Delete Account
  const [delModal, setDelModal] = useState(false);

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


  useEffect(() => {
    setProfile(true);
    setOrders(false);
    setChangeP(false);
    setViewDetails(false);
  }, []);

  useEffect(() => {
    if(message === "User updated" || message === "User deleted"){
      setLogin(false);
      dispatch(resetUserStates());
      navigate("/login");
    }
  }, [message]);

  const handleSection = (e) =>{
    if(e.target.dataset.section === "profile"){
      setProfile(true);
      setOrders(false);
      setChangeP(false);
      setViewDetails(false);
      setViewOrder(false);
    };
    if(e.target.dataset.section === "orders"){
      setProfile(false);
      setOrders(true);
      setChangeP(false);
      setViewDetails(false);
      setViewOrder(false);
    };
    if(e.target.dataset.section === "password"){
      setProfile(false);
      setOrders(false);
      setChangeP(true);
      setViewDetails(false);
      setViewOrder(false);
    };
  };



  const handleViewOrder = (el) =>{
    setOrders(false);
    setViewOrder(el);
  };


  const googleAlert = () =>{
    if(usersId.googleUser && editUser){
      return refToast.current.show({sticky: true, severity: 'info', summary: `Hey ${usersId.userName}`, detail: "You can't change your email because you signed up with Google"});
    }
  };

  const googleAlertPassword = () =>{
    if(usersId.googleUser){
      return refToast.current.show({sticky: true, severity: 'info', summary: `Hey ${usersId.userName}`, detail: "You can't change your password because you signed up with Google"});
    }
  };


  return ( 
    <div className={styles.wrapper}>
      <Toast ref={refToast} position='top-left'></Toast>
      {delModal && <DelModal setDelModal={setDelModal} delModal={delModal}/>}
      <div className={styles.delete} onClick={()=> setDelModal({user: `${usersId.userName}`, userId:`${usersId.id}`})}>
        <span>Delete Account</span>
      </div>
      {
        openPromo && !usersId.member &&
        <div className={styles.banner}>
          <div className={styles.bannerTop}>
            <div>
              <h2>Get Premium for free for 1 month</h2>
              <p>After that it's only $15*** per month. Cancel whenever you want!</p>
              <button onClick={()=> navigate("/memberships")}>Begin</button>
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
      <div className={styles.subContainer}>
        
        <div className={styles.panel}>
          <div className={styles.back} onClick={()=> navigate("/home")}>
            <i className="fa-regular fa-circle-left fa-lg"></i>
          </div>
          <div className='d-flex align-items-center justify-content-between' data-section="profile" onClick={handleSection}>
            <span className={profile ? styles.linkActive : ""} data-section="profile">Profile</span>
            <i className="fa-solid fa-caret-down" style={{transform: profile ? "rotate(-90deg)" : ""}} data-section="profile"></i>
          </div>
          <div className='d-flex align-items-center justify-content-between' data-section="orders" onClick={handleSection}>
            <span className={(orders || viewOrder) ? styles.linkActive : ""} data-section="orders">Orders</span>
            <i className="fa-solid fa-caret-down" style={{transform: (orders || viewOrder) ? "rotate(-90deg)" : ""}} data-section="orders"></i>
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
                    <img src={usersId?.avatar} alt="abc" />
                  </div>
                  <div className={styles.name}>
                    <span>{usersId?.firstName + " " + usersId?.lastName}</span>
                  </div>
                  <div className={styles.buttons}>
                    {
                      !usersId.member &&
                      <button onClick={()=> navigate("/memberships")}>Upgrade</button>
                    }
                    <button onClick={()=> {setViewDetails(true) ; setProfile(false)}}>View Details</button>
                  </div>
                </div>
              </div>
            </div>
          
        }
        {
          orders &&
          <div className={styles.orders}>
            <div className={styles.container}>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Order Status</th>
                    <th>Date</th>
                    <th>Products</th>
                    <th style={{borderRight: "none"}}>Amount</th>
                    <th style={{borderRight: "none", backgroundColor:"transparent"}}></th>
                  </tr>
                </thead>
                <tbody>
                  {userOrders.length > 0 && userOrders.map((el, index) => {
                    return <tr key={index}>
                      <td>{el.orderId}</td>
                      <td><span className={styles.orderStatus}>{el.orderStatus}</span></td>
                      <td>{new Date(el.date).toLocaleDateString()}</td>
                      <td>{typeof el.items === "string" ? JSON.parse(el.items).length : el.items.length}</td>
                      <td>${el.totalPrice}</td>
                      <td>
                        <i className="fa-solid fa-file-lines fa-lg" style={{color:"white"}} onClick={(e)=> handleViewOrder(el)}></i>
                      </td>
                    </tr>
                  })}
                  {
                    userOrders.length === 0 && 
                    <tr>
                      <td colSpan={5} style={{borderBottom:"none", height:"100%"}}>
                        <span>{`Hi ${usersId.userName}! Looks like you don't have any orders yet!`}</span>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        }
        {
          viewOrder && 
          <div className={styles.viewOrder}>
            <div className={styles.viewOrderContainer}>
            
              <div className={styles.viewOrderFirst}>
                <div className={styles.orderId}>
                  <span>Order Id</span>
                  <span>{viewOrder.orderId}</span>
                </div>
                <div className={styles.headset}>
                  <a href="mailto: henrifyb@gmail.com">
                    <i className="fa-solid fa-headset fa-2xl" style={{color:"whitesmoke"}}></i>
                  </a>
                </div>
              </div>
              <div className={styles.viewOrderSecond}>
                <div className={styles.viewOrderDetails}> 
                  <span>Purchase Details</span>
                  <div className={styles.viewOrderGoBack} onClick={()=> {setViewOrder(false) ; setOrders(true)}}>
                    <i className="fa-solid fa-circle-left fa-xl" style={{color:"whitesmoke"}}></i>
                  </div>
                </div>
                <div className={styles.viewOrderDetails2}>
                  <div className={styles.shippingAddress}>
                    <span>Shipping Address</span>
                    <span>{viewOrder.shippingAddress}</span>
                  </div>
                  <div className={styles.billingAddress}>
                    <span>Billing Address</span>
                    <span>{viewOrder.billingAddress}</span>
                  </div>
                  <div className={styles.viewOrderThird}>
                    <div className={styles.viewOrderThird1}>
                      <div className={styles.shippingMethod}>
                        <span>Shipping Method</span>
                        <span>{viewOrder.shippingMethod}</span>
                      </div>
                      <div className={styles.totalPrice}>
                        <span>Total Price</span>
                        <span>${viewOrder.totalPrice}</span>
                      </div>
                    </div>
                    <div className={styles.viewOrderThird2}>
                      <div className={styles.viewOrderStatus}>
                        <span>Order Status</span>
                        <span>{viewOrder.orderStatus}</span>
                      </div>
                      <div className={styles.date}>
                        <span>Date Ordered</span>
                        <span>{new Date(viewOrder.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.viewOrderItemsTotal}>
                    <span>{`Total Items: ${typeof viewOrder.items === "string" ? JSON.parse(viewOrder.items).length : viewOrder.items.length}`}</span>
                  </div>
                  <div className={styles.viewOrderItems}>
                    <div className={styles.viewOrderItems}>
                      {
                        typeof viewOrder.items === "string" ? (
                          
                          JSON.parse(viewOrder.items).map((el, index) => {
                            if(el.type === "playlist"){
                              return (
                                <PlaylistCard
                                key={index}
                                creator={el.owner}
                                playlist={el.name}
                                image={el.image}
                                id={el.id}
                                playlistId={el.playlistId}
                                price={el.price}
                                el={el}
                                cartItem={true}
                                />
                              )
                            }else if(el.type === "album"){
                              return (
                                <AlbumCard
                                  artist={el.artists}
                                  album={el.name}
                                  image={el.image}
                                  id={el.id}
                                  albumId={el.albumId}
                                  price={el.price}
                                  el={el}
                                  cartItem={true}
                                />
                              )
                            }
                          })

                        ):(

                          viewOrder.items.map((el, index) => {
                            if(el.type === "playlist"){
                              return (
                                <PlaylistCard
                                key={index}
                                creator={el.owner}
                                playlist={el.name}
                                image={el.image}
                                id={el.id}
                                playlistId={el.playlistId}
                                price={el.price}
                                el={el}
                                cartItem={true}
                                />
                              )
                            }else if(el.type === "album"){
                              return (
                                <AlbumCard
                                  artist={el.artists}
                                  album={el.name}
                                  image={el.image}
                                  id={el.id}
                                  albumId={el.albumId}
                                  price={el.price}
                                  el={el}
                                  cartItem={true}
                                />
                              )
                            }
                          })

                        )
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <form className={styles.form} onSubmit={(e)=> e.preventDefault()}>
                  <div className='position-relative' onClick={googleAlertPassword}>
                    <input disabled={usersId.googleUser ? true : false} type={`${showPassword ? "text" : "password"}`} placeholder='New Password' onChange={(e)=> setPassword1(e.target.value)} />
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
                  <div className='position-relative' onClick={googleAlertPassword}>
                    <input disabled={usersId.googleUser ? true : false} type={`${showPassword2 ? "text" : "password"}`} placeholder='Confirm Password' onChange={(e)=> setPassword2(e.target.value)} />
                    <div className={styles.showPassword}>
                      {
                        showPassword2 ? (
                          <i className="fa-solid fa-eye-slash" onClick={()=> setShowPassword2(false)}></i>
                        ):(
                          <i className="fa-solid fa-eye" onClick={()=> setShowPassword2(true)}></i>
                        )
                      }
                    </div>
                  </div>
                  <div onClick={handleChangePassword}>
                    <button className={passwordMatch ? "passwordsMatch" : ""}>Change Password</button>
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
                <i className="fa-solid fa-circle-left fa-2xl" style={{color:"palevioletred"}}></i>
              </div>
              <h2 className={styles.detailsTitle}>Account Details</h2>
              <div className={styles.formDiv}>
                <div className={styles.circle}></div>
                <div className={styles.circle}></div>
                <form>
                  <div class={styles.inputDiv}>
                    <input ref={refInputUsername} type="text" name='userName' readOnly={editUser ? false : true} defaultValue={initialState.userName} onChange={handleEditForm}  />
                    <span>Username</span>
                  </div>
                  <div className={styles.inputDiv} onClick={googleAlert}>
                    <input ref={refInputEmail} type="email" name='email' readOnly={editUser && !usersId.googleUser ? false : true} defaultValue={initialState.email} onChange={handleEditForm} />
                    <span>Email</span>
                  </div>
                  <div className={styles.inputDiv}>
                    <input ref={refInputFirstname} type="text" name='firstName' readOnly={editUser ? false : true} defaultValue={initialState.firstName} onChange={handleEditForm}  />
                    <span>First Name</span>
                  </div>
                  <div className={styles.inputDiv}>
                    <input ref={refInputLastname} type="text" name='lastName' readOnly={editUser ? false : true} defaultValue={initialState.lastName} onChange={handleEditForm} />
                    <span>Last Name</span>
                  </div>
                  
                  {
                    editUser ? (
                      <div className='d-flex align-items-center gap-20 mt-3'>
                        <div className={styles.confirmEdit} onClick={handleEditUser}>
                          <i className="fa-solid fa-circle-check fa-2xl"></i>
                        </div>
                        <div className={styles.cancelEdit} onClick={handleCancelEdit}>
                          <i className="fa-solid fa-circle-xmark fa-2xl"></i>
                        </div>
                      </div>
                    ):(
                      <div className={styles.edit} onClick={handleActiveEdit}>
                        <i className="fa-solid fa-user-pen fa-2xl mt-3" style={{color: "white"}}></i>
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