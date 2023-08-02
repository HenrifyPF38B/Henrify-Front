import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./myPlaylist.module.css";
import img from "../assets/dddd.png";
import arrow from "../assets/arrow.svg";
import { useState } from "react";
import back from "../assets/prev.svg"

const MyPlaylist = () => {
  // const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  // const dummy = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2
  // ];

  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editingPlaylistId, setEditingPlaylistId] = useState(null);

  const [playlists, setPlaylists] = useState([
    { id: 1, name: "Playlist 1" },
    { id: 2, name: "Playlist 2" },
    { id: 3, name: "Playlist 3" },
    { id: 4, name: "Playlist 4" },
    { id: 5, name: "Playlist 5" },
    { id: 6, name: "Playlist 6" },
    { id: 7, name: "Playlist 7" },
    { id: 8, name: "Playlist 8" },
    { id: 9, name: "Playlist 9" },
    { id: 10, name: "Playlist 10" },
    { id: 11, name: "Playlist 11" },
    { id: 12, name: "Playlist 12" },
  ]);

  const handleDeletePlaylist = (id) => {
    setPlaylists((prevPlaylists) =>
      prevPlaylists.filter((playlist) => playlist.id !== id)
    );
  };

  const activateEditMode = (playlistName, playlistId) => {
    setEditedName(playlistName);
    setEditingPlaylistId(playlistId);
    setEditMode(true);
  };

  const cancelEditMode = () => {
    setEditMode(false);
  };

  const saveNameChanges = () => {
    if (editedName.trim() !== "") {
      setPlaylists((prevPlaylists) =>
        prevPlaylists.map((prevPlaylist) =>
          prevPlaylist.id === editingPlaylistId
            ? { ...prevPlaylist, name: editedName }
            : prevPlaylist
        )
      );
    }
    setEditMode(false);
  };

  return (
    <div className={styles.wrapper} id="myplaylist">
      <button className={styles.button} onClick={() => navigate('/home')}>
        <img className={styles.backkk} src={back} alt="" />
      </button>
      <div className={styles.titulo}>
        <h2 className={styles.title}>Your gallery, your music</h2>
        <div className={styles.createContainer}>
          <Link to="/create" className={styles.create}>
            Add a new playlist
          </Link>
        </div>
      </div>
      <div className={styles.container1}>
        {playlists.map((playlist) => (
          <div className={styles.cardsContainer} key={playlist.id}>
            <div className={styles.image}>
              <img src={img} alt="playlist" />
            </div>
            {(!editMode || editingPlaylistId !== playlist.id) && (
              <div
                className={styles.playForListen}
                onClick={() => navigate("/playlist")}
              >
                <i
                  class="fa-solid fa-play fa-2xl"
                  style={{ color: "#ffffff" }}
                ></i>
              </div>
            )}
            <div className={styles.boxData}>
              {editMode && editingPlaylistId === playlist.id ? (
                <div>
                  <div className={styles.setName}>
                    <input
                      className={styles.inputName}
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                    />
                  </div>
                  <div className={styles.btnCont}>
                    <button
                      className={styles.btnName}
                      onClick={saveNameChanges}
                    >
                      Save
                    </button>
                    <button className={styles.btnName} onClick={cancelEditMode}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span className={styles.span}>{playlist.name}</span>
                  <div className="dropdown">
                    <i
                      className="fa-solid fa-ellipsis fa-2xl myplaylist-menu"
                      style={{ color: "#ffffff" }}
                      id="dLabel"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    />
                    <div
                      class="dropdown-menu mt-2"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <button
                        className="dropdown-item"
                        onClick={() =>
                          activateEditMode(playlist.name, playlist.id)
                        }
                      >
                        Rename
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => handleDeletePlaylist(playlist.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPlaylist;
