import React from 'react'
import styles from "./delModal.module.css"

const DelModal = ({setDelModal}) => {
  return ( 
    <div className={styles.wrapper}>
      <article>
        <div className={styles.div}>
          <div className={styles.first}>
            <p>Delete Account</p>
            <p>Once you delete your account this action is permanent and it can't be undone.</p>
          </div>
          <div className={styles.sec}>
            <span>Please type "account/delete" to delete your account.</span>
            <div>
              <input type="text" />
            </div>
            <div className={styles.btns}>
              <button>Delete</button>
              <button onClick={()=> setDelModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </article>
    </div>
   );
}
 
export default DelModal;