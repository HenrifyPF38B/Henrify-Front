import React, {useState} from 'react'
import styles from "./playlistModal.module.css";

const PlaylistModal = ({setModalOpen}) => {

    const quantity = [1, 2, 3, 4, 5, 6, 7, 7, 21, 23 ,34 ,34];
    const [inFav, setInFav] = useState(false);

    return ( 
        <article className={styles.playlistModalArticle}>
            <div className={styles.playlistModalDiv}>
                {/* <div className={styles.playlistModalBtn} onClick={()=> setModalOpen(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </div> */}
                <div className={styles.back} onClick={()=> setModalOpen(false)}>
                    <i className="fa-solid fa-caret-left fa-xl"></i>
                </div>
                <h2 className={styles.playlistTitle}>Let's Party</h2>
                {
                    quantity.map((el, index) => {
                        return(
                            <div className={styles.playlistModalCard}>
                                <div className={styles.favorites}>
                                    {
                                        inFav ? 
                                            <i className="fa-solid fa-heart" onClick={()=> setInFav(false)}></i>
                                        :
                                            <i className="fa-regular fa-heart" onClick={()=> setInFav(true)}></i>
                                    }
                                </div>
                                <div className={styles.playlistModalDetails} style={{borderBottom: quantity.length !== index + 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                                    <div className={styles.playDiv}>
                                        <img src="/images/ovo.jpeg" alt="abc" />
                                        <div className={styles.play}>
                                            <i className="fa-solid fa-play fa-xl"></i>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column ms-4 gap-2'>
                                        <span>Drake</span>
                                        <span>Jimmy Cooks</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </article> 
     );
}
 
export default PlaylistModal;