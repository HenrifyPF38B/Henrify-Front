import React, {useState, useContext, useRef, useEffect} from 'react'
import styles from './songCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, favsUser, getUsersById, removeFromFav } from '../../redux/Actions/UsersActions';



const SongCard = ({artist, song, id, img, audio, audioFull, songId, explicit}) => {
    
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { userFavs, usersId } = state;
    const navigate = useNavigate();
    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { modalOpen, setModalOpen, setPlayerOpen, refPreviewNotAvailableAppJS } = data;
    const [playShow, setPlayShow] = useState(true);
    const [inFavs, setInFavs] = useState(null);
 
    

    const handlePlay = () =>{
        if(!audio){
            refPreviewNotAvailableAppJS.current.show({lifeTime: 5000, severity: 'info', summary: "We're sorry!", detail: "This song's preview is not available!"});
        }else{
            setPlayerOpen({audio, img, song, artist, type: "song", id: songId})
        }
    };


    const handleAddFav = (e) =>{
        // setInFavs(!inFavs);
        dispatch(favsUser(usersId?.id, songId));
        if(e.target.dataset.id === "add"){
            dispatch(addToFav(songId));
        }else{
            dispatch(removeFromFav(songId))
        }
    };


    return ( 
        <div className={styles.topratedcardwrapper} >
            
            <div className={styles.seePlaylist}>
                {
                    usersId.id && (userFavs?.includes(songId) ? (
                        <i className="fa-solid fa-heart fa-sm p-1" data-id="remove" style={{color: "#E1402E"}} onClick={handleAddFav}></i>
                    ):(
                        <i className="fa-regular fa-heart fa-sm p-1" data-id="add" onClick={handleAddFav}></i>
                    ))
                }
                {
                    !usersId.length && !usersId?.id && 
                        <i className="fa-regular fa-heart p-1 fa-sm"></i>
                }
                <div className='dropdown songCard'>
                    <i className="fa-solid fa-list-ul fa-sm p-1" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
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
                {
                    explicit &&
                    <div className={styles.explicit}>
                        <img src="/images/explicit.png" alt="abc" />
                    </div>
                }
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
            <span className={styles.topratedspan2}>{artist?.toString().length > 19 ? artist.toString().replaceAll(",","").slice(0, 18) + "…" : artist}</span>
        </div>
     );
}

export default SongCard; 