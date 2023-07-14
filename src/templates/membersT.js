import React from 'react'
import styles from "../views/About/About.module.css"

const MemberTemplate = ({indicator, name, description, linkGit, linkIg, linkLn, linkUrl, isActive }) => {
  return ( 
    <label htmlFor={`s${indicator}`} id={`slide${indicator}`} className={`card-label${isActive === name ? "active" :  ""}`}>
        <div className={styles.slideCard}>
          <div className={styles.slideImage}>
            <img src="/images/avatarDummy.jpeg" alt="abc" />
          </div>
          <div className={styles.slideInfo}>
              <span className={styles.slideName}>{name}</span>
              <span className={styles.slideDescription}>{description}</span>
              <div className={styles.slideDetails}>
                <span>Full Stack Developer</span>
              </div>
              {/* ACTIONS */}
              <div className={styles.slideLinks}>
                <i className="fa-brands fa-github" onClick={()=> window.open(linkGit, "_blank")}></i>
                <i className="fa-brands fa-instagram  fa-xl" onClick={()=> window.open(linkIg, "_blank")}></i>
                <i className="fa-brands fa-linkedin-in" onClick={()=> window.open(linkLn, "_blank")}></i>
                <i className="fa-solid fa-link" onClick={()=> window.open(linkUrl, "_blank")}></i>
              </div>
          </div>
        </div>
      </label>
   );
}
 
export default MemberTemplate;