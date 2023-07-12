import React, {useState, useContext} from 'react'
import styles from './topRatedCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';

const TopRatedCard = ({owner, playlist}) => {

    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { modalOpen, setModalOpen } = data;

    return ( 
        <div className={styles.topratedcardwrapper} >
            <div className={styles.seePlaylist} onClick={()=> setModalOpen(true)}>
                <i className="fa-solid fa-eye fa-xs"></i>
                <i className="fa-regular fa-heart fa-xs"></i>
            </div>

            <div className={styles.topratedimgdiv}>
                <img src="/images/avatarDummy.jpeg" alt="abc" width={100} height={100} />
            </div>
            <span className={styles.topratedspan1}>{owner}</span>
            <span className={styles.topratedspan2}>{playlist}</span>
        </div>
     );
}

export default TopRatedCard; 