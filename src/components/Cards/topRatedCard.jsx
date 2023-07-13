import React, {useState, useContext} from 'react'
import styles from './topRatedCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';
import { useNavigate } from 'react-router-dom';

const TopRatedCard = ({owner, playlist, type}) => {
    const navigate = useNavigate();
    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { modalOpen, setModalOpen } = data;
    const [playShow, setPlayShow] = useState(true);

    return ( 
        <div className={styles.topratedcardwrapper} >
            <div className={styles.seePlaylist} onClick={()=> setModalOpen(true)}>
                <i className="fa-solid fa-eye fa-xs"></i>
                <i className="fa-regular fa-heart fa-xs"></i>
            </div>

            <div className={styles.topratedimgdiv}>
                <img 
                  src={type === "album" ? "/images/disco.avif" : type === "song" ? "/images/ari.jpeg" : "/images/playlistcover.jpeg"} 
                  alt="abc" 
                  width={100} 
                  height={100} 
                  onClick={()=> navigate("/playlist")}
                />
                <div className={styles.listen}>
                    <i class="fa-solid fa-play fa-2xl"></i>
                </div>
            </div>
            <span className={styles.topratedspan1}>{owner}</span>
            <span className={styles.topratedspan2}>{playlist}</span>
        </div>
     );
}

export default TopRatedCard; 