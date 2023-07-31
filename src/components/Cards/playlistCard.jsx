import React, {useState, useContext, useEffect} from 'react'
import styles from './playlistCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, favsUser, removeFromFav } from '../../redux/Actions/UsersActions';

const PlaylistCard = ({price, creator, playlist, image, id, playlistId, el}) => {
    
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { usersId, userFavs } = state;
    const navigate = useNavigate();
    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { setModalOpen, setBuyOpen, setLoginOpen } = data;
    const [playShow, setPlayShow] = useState(true);
    const [inFavs, setInFavs] = useState(false);

    const handleAddFav = (e) =>{
        // setInFavs(!inFavs);
        dispatch(favsUser(usersId?.id, playlistId));
        if(e.target.dataset.id === "add"){
            dispatch(addToFav(playlistId));
        }else{
            dispatch(removeFromFav(playlistId))
        }
    };

    return ( 
        <div className={styles.topratedcardwrapper} >
            <div className={styles.seePlaylist}>
                <i className="fa-solid fa-eye fa-xs" onClick={()=> setModalOpen({id, type: "playlist"})}></i>
                {
                    usersId.id && 
                    (userFavs?.includes(playlistId) ? (
                        <i className="fa-solid fa-heart fa-sm" data-id="remove" style={{color: "#E1402E"}} onClick={handleAddFav}></i>
                    ):(
                        <i className="fa-regular fa-heart fa-sm" data-id="add" onClick={handleAddFav}></i>
                    ))
                }
                {
                    !usersId.length && !usersId?.id && 
                        <i className="fa-regular fa-heart fa-sm" onClick={()=> setLoginOpen(true)}></i>
                }
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
                <div className={styles.addContainer} onClick={()=> setBuyOpen(el)}>
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