import React, { useState } from 'react'
import styles from "./Favorites.module.css"

const Favorites = () => {

  const [section, setSection] = useState("All");

  const handleSection = (e) =>{
    if(section !== e.target.dataset.id){
      setSection(e.target.dataset.id)
    }
  };

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.left}>
        <div className={section === "All" ? styles.favSectionActive : styles.favSection} data-id="All" onClick={handleSection}>
          <span className='me-5'>All</span>
          <div className={styles.favIcon}>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>
        <div className={section === "Playlists" ? styles.favSectionActive : styles.favSection} data-id="Playlists" onClick={handleSection}>
          <span className='me-5'>Playlists</span>
          <div className={styles.favIcon}>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>
        <div className={section === "Songs" ? styles.favSectionActive : styles.favSection} data-id="Songs" onClick={handleSection}>
          <span className='me-5'>Songs</span>
          <div className={styles.favIcon}>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div>
      </div>
      <div className={styles.right}>

      </div>
    </div>
   );
}
 
export default Favorites;