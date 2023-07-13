import React, { useState } from 'react'
import styles from "./Favorites.module.css"
import TopRatedCard from '../../components/Cards/topRatedCard';

const Favorites = () => {

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4];
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
      <div className='d-flex align-items-center flex-column justify-content-center'>
        <div className={styles.favTitle}></div>
        <div className={styles.right}>
          {
            dummy.map((el, index) =>{
              return(
                <TopRatedCard
                  key={index}
                  type="album"
                  owner={"Jack Harlow"}
                  playlist={"What's Poppin"}
                />
              )
            })
          }
        </div>
      </div>
    </div>
   );
}
 
export default Favorites;