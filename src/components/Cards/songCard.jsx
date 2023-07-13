import React, {useState, useContext} from 'react'
import styles from './songCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';
import { useNavigate } from 'react-router-dom';

const SongCard = ({artist, song}) => {
    const navigate = useNavigate();
    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { modalOpen, setModalOpen } = data;
    const [playShow, setPlayShow] = useState(true);

    return ( 
        <div className={styles.topratedcardwrapper} >
            <div className={styles.seePlaylist} onClick={()=> setModalOpen(true)}>
            <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>

            <div className={styles.topratedimgdiv}>
                <img 
                  src={"/images/ari.jpeg"} 
                  alt="abc" 
                  width={100} 
                  height={100} 
                  onClick={()=> navigate("/song")}
                />
                <div className={styles.listen}>
                    <i class="fa-solid fa-play fa-2xl"></i>
                </div>
            </div>
            <span className={styles.topratedspan1}>{artist}</span>
            <span className={styles.topratedspan2}>{song}</span>
        </div>
     );
}

export default SongCard; 