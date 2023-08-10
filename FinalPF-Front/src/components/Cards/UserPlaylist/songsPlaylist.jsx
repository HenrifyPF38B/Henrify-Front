import React, { useContext, useState } from "react";
import styles from "./songsPlaylist.module.css";
import { PlaylistContext } from "../../../contexts/playlistContext";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { faCheck } from "@fortawesome/free-solid-svg-icons";

const SongsPlaylist = ({
  artist,
  song,
  id,
  img,
  audio,
  audioFull,
  songId,
  explicit,
  selectedSongs,
  setSelectedSongs,
  handleAddToPlaylist,
  handleRemoveSong,
  isInPlaylist,
}) => {
  const data = useContext(PlaylistContext);
  const { setPlayerOpen, refPreviewNotAvailableAppJS } = data;

  const isSelected = selectedSongs.some((song) => song.songId === songId);

  const handlePlay = () => {
    if (!audio) {
      refPreviewNotAvailableAppJS.current.show({
        lifeTime: 5000,
        severity: "info",
        summary: "We're sorry!",
        detail: "This song's preview is not available!",
      });
    } else {
      setPlayerOpen({ audio, img, song, artist, type: "song", id: songId });
    }
  };

  const handleAddOrRemove = (e) => {
    e.preventDefault();
    if (isSelected) {
      handleRemoveSong(songId);
    } else {
      handleAddToPlaylist({
        id,
        artist,
        song,
        img,
        audio,
        audioFull,
        songId,
        explicit,
      });
    }
  };

  return (
    <div className={styles.topratedcardwrapper}>
      <div className={styles.seePlaylist}>
        <div className={styles.remove}>
        {!isInPlaylist && <button  
            onClick={() => handleAddToPlaylist(song)}
            className="trashIcon"
          >
            <FontAwesomeIcon icon={faPlus} className="fa-sm p-1" />
          </button>}

          <button
            onClick={() => handleRemoveSong(songId)}
            className="trashIcon"
          >
            <FontAwesomeIcon icon={faTrashAlt} className="fa-sm p-1" />
          </button>
        </div>
      </div>

      <div className={styles.topratedimgdiv}>
        {explicit && (
          <div className={styles.explicit}>
            <img src="/images/explicit.png" alt="abc" />
          </div>
        )}
        <img
          src={img}
          alt="abc"
        />
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

export default SongsPlaylist;