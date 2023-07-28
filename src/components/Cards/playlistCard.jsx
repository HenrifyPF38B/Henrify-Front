import React, {useState, useContext} from 'react'
import styles from './playlistCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';
import { useNavigate } from 'react-router-dom';

const PlaylistCard = ({creator, playlist, image, id}) => {
    const navigate = useNavigate();
    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { setModalOpen, setBuyOpen } = data;
    const [playShow, setPlayShow] = useState(true);

    return ( 
        <div className={styles.topratedcardwrapper} >
            <div className={styles.seePlaylist}>
                <i className="fa-solid fa-eye fa-xs" onClick={()=> setModalOpen({id, type: "playlist"})}></i>
                <i className="fa-regular fa-heart fa-xs"></i>
            </div>

            <div className={styles.topratedimgdiv}>
                <img 
                  src={image} 
                  alt="abc" 
                  width={100} 
                  height={100} 
                />
                <div className={styles.listen} onClick={()=> navigate(`/playlist/${id}`)}>
                    <i class="fa-solid fa-play fa-2xl"></i>
                </div>
                <div className={styles.addContainer} onClick={()=> setBuyOpen(true)}>
                    <div className={styles.addToCart}>
                        <i className="fa-solid fa-cart-plus"></i>
                    </div>
                </div>
            </div>
            <span className={styles.topratedspan1}>{playlist && playlist.length > 20 ? playlist.slice(0, 20) + "…" : playlist}</span>
            <span className={styles.topratedspan2}>{creator}</span>
        </div>
     );
}

export default PlaylistCard; 