import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./delModal.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsers } from '../redux/Actions/UsersActions';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { resetUserStates } from '../redux/Actions/StateActions';
import { useNavigate } from 'react-router-dom';
import { PlaylistContext } from '../contexts/playlistContext';

const DelModal = ({setDelModal, delModal}) => {

  const refToast = useRef();
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { message } = state;
  const dataContext = useContext(PlaylistContext);
  const { setLogin } = dataContext;
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  
  
  const handleInput = (e) =>{
    setInput(e.target.value);
  };

  const handleDeleteAccount = () =>{
    if(input.length === 0){
      return refToast.current.show({sticky: true, severity: 'warn', summary: `Wait!`, detail: "Please complete all fields"});
    };
    if(input !== `account/delete/${delModal.user}`){
      return refToast.current.show({sticky: true, severity: 'warn', summary: `We're sorry!`, detail: "Text doesn't match!"});
    };
    if(input === `account/delete/${delModal.user}`){
      dispatch(deleteUsers(delModal.userId));
    };
  };

  useEffect(() => {
    if(message === "User deleted"){
      setLogin(false);
      dispatch(resetUserStates());
      navigate("/login");
    }
  }, [message]);

  return ( 
    <div className={styles.wrapper}>
      <Toast ref={refToast} position='top-left'></Toast>
      <article>
        <div className={styles.div}>
          <div className={styles.first}>
            <p>Delete Account</p>
            <p>Once you delete your account this action is permanent and it can't be undone.</p>
          </div>
          <div className={styles.sec}>
            <span>{`Please type "account/delete/${delModal?.user}" to delete your account.`}</span>
            <div>
              <input type="text" onChange={handleInput} value={input}/>
            </div>
            <div className={styles.btns}>
              <button onClick={handleDeleteAccount}>Delete</button>
              <button onClick={()=> setDelModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </article>
    </div>
   );
}
 
export default DelModal;