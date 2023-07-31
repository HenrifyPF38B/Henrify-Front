import React, {useState, useContext, useEffect} from 'react'
import styles from './albumCard.module.css'; 
import { PlaylistContext } from '../../contexts/playlistContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, favsUser, removeFromFav } from '../../redux/Actions/UsersActions';

const AlbumCard = ({price, artist, album, image, id, albumId, el}) => {
    
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { usersId, userFavs } = state;
    const navigate = useNavigate();
    const [eyeActive, setEyeActive] = useState(false);
    const data = useContext(PlaylistContext);
    const { setModalOpen, setBuyOpen } = data;
    const [playShow, setPlayShow] = useState(true);
    const [inFavs, setInFavs] = useState(false);

    const handleAddFav = (e) =>{
        // setInFavs(!inFavs);
        dispatch(favsUser(usersId?.id, albumId));
        if(e.target.dataset.id === "add"){
            dispatch(addToFav(albumId));
        }else{
            dispatch(removeFromFav(albumId))
        }
    };

    return ( 
        <div className={styles.topratedcardwrapper} >
            <div className={styles.seePlaylist}>
                <i className="fa-solid fa-eye fa-xs" onClick={()=> setModalOpen({id, type: "album"})}></i>
                {
                    usersId.id && (userFavs?.includes(albumId) ? (
                        <i className="fa-solid fa-heart fa-sm" data-id="remove" style={{color: "#E1402E"}} onClick={handleAddFav}></i>
                    ):(
                        <i className="fa-regular fa-heart fa-sm" data-id="add" onClick={handleAddFav}></i>
                    ))
                }
                {
                    !usersId.length && !usersId?.id && 
                        <i className="fa-regular fa-heart fa-sm"></i>
                }
            </div>

            <div className={styles.topratedimgdiv}>
                <img 
                  src={image} 
                  alt="abc" 
                  width={100} 
                  height={100} 
                />
                <div className={styles.listen} onClick={()=> navigate("/album/" + id)}>
                    <i class="fa-solid fa-play fa-2xl"></i>
                </div>
                <div className={styles.addContainer} onClick={()=> setBuyOpen(el)}>
                    <div className={styles.addToCart}>
                        <i className="fa-solid fa-cart-plus"></i>
                    </div>
                </div>
            </div>
            <span className={styles.topratedspan1}>{(artist && artist.length) && artist[0]?.name.length > 19 ? (artist && artist.length) && artist[0]?.name.slice(0, 19) + "…" : (artist && artist.length) && artist[0]?.name}</span>
            <span className={styles.topratedspan2}>{album && album.length > 19 ? album.slice(0, 19) + "…" : album}</span>
        </div>
     );
}

export default AlbumCard; 