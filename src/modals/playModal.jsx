import React, { useContext } from 'react'
import styles from "./playModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext';

const PlayModal = () => {

  const data = useContext(PlaylistContext);
  const { playerOpen, setPlayerOpen } = data;

  return ( 
    <article className={styles.article}>
      <div className={styles.div}>

        <div className={styles.left}>
          <div className='position-relative'>
            <img src="/images/lil.jpeg" alt="abc" />
            <div className={styles.close} onClick={()=> setPlayerOpen(false)}>
              <i className="fa-solid fa-xmark fa-lg"></i>
            </div>
          </div>
          <div className='d-flex flex-column align-items-start mx-3' style={{gap:"3px"}}>
            <span style={{color:"whitesmoke", fontSize:"14px"}}>What's Poppin</span>
            <span style={{color:"#777777", fontSize:"12px"}}>Jack Harlow</span>
          </div>
          <div className='d-flex align-items-center'>
            <i className="fa-regular fa-heart me-2 fa-lg" style={{color:"whitesmoke"}}></i>
            <i className="fa-solid fa-minimize" style={{color:"whitesmoke"}}></i>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.middleTop}>
            <i className="fa-solid fa-shuffle fa-lg"></i>
            <i className="fa-solid fa-backward-step fa-lg"></i>
            <div className={styles.play}>
              <i className="fa-solid fa-pause"></i>
            </div>
            <i className="fa-solid fa-forward-step fa-lg"></i>
            <i className="fa-solid fa-rotate-right fa-lg"></i>
          </div>
          <div className={styles.middleBottom}>
              <span>0:00</span>
              <div className={styles.large}></div>
              <span>2:05</span>
          </div>
        </div>
        <div className={styles.right}>
          <div>
            <i className="fa-solid fa-ellipsis-vertical fa-lg"></i>
          </div>
          <div>
            <i className="fa-solid fa-volume-high fa-lg"></i>
          </div>
          <div>
            <input type="range" defaultValue={100} min={0} max={100} />
          </div>
        </div>
      </div>
    </article>
   );
}
 
export default PlayModal;