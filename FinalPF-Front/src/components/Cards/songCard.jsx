import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./songCard.module.css";
import { PlaylistContext } from "../../contexts/playlistContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFav,
  favsUser,
  getUsersById,
  removeFromFav,
} from "../../redux/Actions/UsersActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import style from "./UserPlaylist/songsPlaylist.module.css";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";

const SongCard = ({
  el,
  artist,
  song,
  id,
  img,
  audio,
  audioFull,
  songId,
  explicit,
  isFavoriteView,
  handleAddToPlaylist,
  handleRemoveSong,
}) => {

  const refToast = useRef();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { userFavs, usersId } = state;
  const navigate = useNavigate();
  const [eyeActive, setEyeActive] = useState(false);
  const data = useContext(PlaylistContext);
  const {
    modalOpen,
    setModalOpen,
    setPlayerOpen,
    refPreviewNotAvailableAppJS,
    setOpenAddToPlaylist
  } = data;
  const [playShow, setPlayShow] = useState(true);
  const [inFavs, setInFavs] = useState(null);

  const handlePlay = () => {
    if (!audio) {
      refPreviewNotAvailableAppJS.current.show({
        lifeTime: 5000,
        severity: "info",
        summary: "We're sorry!",
        detail: "This song's preview is not available!",
      });
    } else {
      setPlayerOpen({ audioPreview: audio, audioFull: audioFull, img, song, artist, type: "song", id: songId });
    }
  };

  const handleAddFav = (e) => {
    // setInFavs(!inFavs);
    dispatch(favsUser(usersId?.id, songId));
    if (e.target.dataset.id === "add") {
      dispatch(addToFav(songId));
    } else {
      dispatch(removeFromFav(songId));
    }
  };

  const handleOpenAddToPModal = () =>{
    if(!usersId.id){
      // Toast
      return refToast.current.show({sticky: true, severity: 'info', summary: "We're sorry!", detail: "Please login to access this functionality!"});
    }else{
      // Open modal
      setOpenAddToPlaylist(el);
    }
  };

  return (
    <div className={styles.topratedcardwrapper}>
      <Toast ref={refToast} position='top-left'></Toast>
      <div className={styles.seePlaylist}>
        {!isFavoriteView &&
          usersId.id &&
          (userFavs?.includes(songId) ? (
            <i
              className="fa-solid fa-heart fa-sm p-1"
              data-id="remove"
              style={{ color: "#E1402E" }}
              onClick={handleAddFav}
            ></i>
          ) : (
            <i
              className="fa-regular fa-heart fa-sm p-1"
              data-id="add"
              onClick={handleAddFav}
            ></i>
          ))}
        {!isFavoriteView && !usersId.length && !usersId?.id && (
          <i className="fa-regular fa-heart p-1 fa-sm"></i>
        )}
        {!isFavoriteView && (
          <div onClick={handleOpenAddToPModal}>
            <i
              className="fa-solid fa-list-ul fa-sm p-1"
            
            ></i>
          </div>
        )}
        {/*  ISFAVORITEVIEW = TRUE  */}
        {isFavoriteView && (
          <div className={style.remove}>
            <button onClick={handleAddToPlaylist} className="trashIcon">
              <FontAwesomeIcon icon={faPlus} className="fa-sm p-1" />
            </button>

            <button onClick={() => handleRemoveSong(songId)} className="trashIcon">
              <FontAwesomeIcon icon={faTrashAlt} className="fa-sm p-1" />
            </button>
          </div>
        )}
      </div>

      <div className={styles.topratedimgdiv}>
        {explicit && (
          <div className={styles.explicit}>
            <img src="/images/explicit.png" alt="abc" />
          </div>
        )}
        <img src={img} alt="abc" />
        <div className={styles.listen} onClick={handlePlay}>
          <i className="fa-solid fa-play fa-2xl"></i>
        </div>
      </div>
      <span className={styles.topratedspan1}>
        {song?.length > 19 ? song.slice(0, 18) + "…" : song}
      </span>
      <span className={styles.topratedspan2}>
        {artist?.toString().length > 19
          ? artist.toString().replaceAll(",", "").slice(0, 18) + "…"
          : artist}
      </span>
    </div>
  );
};

export default SongCard;