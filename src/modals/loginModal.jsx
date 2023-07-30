import React, { useContext } from 'react'
import styles from "./loginModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext';



const LoginModal = () => {

  const dataContext = useContext(PlaylistContext);
  const { setLoginOpen } = dataContext;

  return ( 
      <article className={styles.article} onClick={()=> setLoginOpen(false)}>
          <div className={styles.div} onClick={(e)=> e.stopPropagation()}>
            <div className={styles.left}>
              <span>Hi there!</span>
              <span>{"Looks like you are not logged in :("}</span>
              <span>Please login in order to access all of our functionalities!</span>
              <div className={styles.img}>
                <img src="/images/lovesong.png" alt="abc" />
              </div>
            </div>
            <div className={styles.right}>
              <form>
                <div className={styles.icon}>
                  <i className='bx bx-lg bxs-user-circle' style={{color:"lightgrey"}}></i>
                </div>
                <div>
                  <input type="text" placeholder='Email' name='email' />
                </div>
                <div>
                  <input type="text" placeholder='Password' name='password' />
                </div>
                <button>Login</button>
              </form>
            </div>
        </div>
      </article>
   );
}
 
export default LoginModal;