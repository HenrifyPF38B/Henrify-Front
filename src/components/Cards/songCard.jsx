import React, {useState, useContext, useRef} from 'react'
import styles from './songCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';
import { useNavigate } from 'react-router-dom';



const SongCard = ({artist, song, id, img, audio, audioFull}) => {
    
    const navigate = useNavigate();
    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { modalOpen, setModalOpen, setPlayerOpen, refPreviewNotAvailableAppJS } = data;
    const [playShow, setPlayShow] = useState(true);

    const handlePlay = () =>{
        if(!audio){
            refPreviewNotAvailableAppJS.current.show({lifeTime: 5000, severity: 'info', summary: "We're sorry!", detail: "This song's preview is not available!"});
        }else{
            setPlayerOpen({audio, img, song, artist, type: "song"})
        }
    };

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
                  onClick={()=> navigate("/song")}
                />
                <div className={styles.listen} onClick={handlePlay}>
                    <i className="fa-solid fa-play fa-2xl"></i>
                </div>
            </div>
            <span className={styles.topratedspan1}>{song?.length > 19 ? song.slice(0, 18) + "…" : song}</span>
            <span className={styles.topratedspan2}>{artist?.length > 19 ? artist.slice(0, 18) + "…" : artist}</span>
        </div>
     );
}

export default SongCard; 