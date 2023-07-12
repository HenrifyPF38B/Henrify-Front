import React, {useState, useContext} from 'react'
import styles from './topRatedCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';

const TopRatedCard = ({artist, song}) => {

    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { modalOpen, setModalOpen } = data;

    return ( 
        <div 
            className={styles.topratedcardwrapper} 
        >
            <div className={styles.seePlaylist} onClick={()=> setModalOpen(true)}>
                <i className="fa-solid fa-eye fa-xs"></i>
            </div>
            <div className={styles.topratedimgdiv}>
                <img src="/images/avatarDummy.jpeg" alt="abc" width={100} height={100} />
            </div>
            <span className={styles.topratedspan1}>{artist}</span>
            <span className={styles.topratedspan2}>{song}</span>
        </div>
     );
}

export default TopRatedCard; 