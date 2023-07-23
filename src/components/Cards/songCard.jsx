import React, {useState, useContext} from 'react'
import styles from './songCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';
import { useNavigate } from 'react-router-dom';

const SongCard = ({artist, song, id, img, audio}) => {
    const navigate = useNavigate();
    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { modalOpen, setModalOpen, setPlayerOpen } = data;
    const [playShow, setPlayShow] = useState(true);

    return ( 
        <div className={styles.topratedcardwrapper} >
            <div className={styles.seePlaylist}>
                <i className="fa-solid fa-heart fa-sm"></i>
                <div className='dropdown songCard'>
                    <i className="fa-solid fa-list-ul fa-sm" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                    <div class="dropdown-menu mb-2" aria-labelledby="dropdownMenuButton" onClick={(e)=> e.stopPropagation()}>
                        <div className="dropdown-item">
                            <input type="checkbox" id='1'/>
                            <label htmlFor="1">Gym Playlist</label>
                        </div>
                        <div className="dropdown-item">
                            <input type="checkbox" id='2'/>
                            <label htmlFor="2">Party Playlist</label>
                        </div>
                        <div className="dropdown-item">
                            <input type="checkbox" id='2'/>
                            <label htmlFor="2">Study Playlist</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.topratedimgdiv}>
                <img 
                  src={img} 
                  alt="abc" 
                  width={100} 
                  height={100} 
                  onClick={()=> navigate("/song")}
                />
                <div className={styles.listen} onClick={()=> setPlayerOpen(audio)}>
                    <i className="fa-solid fa-play fa-2xl"></i>
                </div>
            </div>
            <span className={styles.topratedspan1}>{song}</span>
            <span className={styles.topratedspan2}>{artist}</span>
        </div>
     );
}

export default SongCard; 