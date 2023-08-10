import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./myPlaylist.module.css";
import img from "../assets/dddd.png";
import arrow from "../assets/arrow.svg";
import { useState } from "react";
import back from "../assets/prev.svg"
import { useDispatch, useSelector } from "react-redux";
import PlaylistCard from "./playlistCard";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { resetMessageState } from "../../redux/Actions/StateActions";
import { getPlaylists } from "../../redux/Actions/PlaylistsActions";

const MyPlaylist = () => {

  const dispatch = useDispatch();
  const refToast = useRef();
  const navigate = useNavigate();
  const state = useSelector(state => state);

  const { playlists, usersId, message } = state;

  const [userPlaylist, setUserPlaylist] = useState([]);

  
  useEffect(() => {
    dispatch(getPlaylists());
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let userPlaylist = [];
    
    if(playlists.length){
      playlists.map((el) => {
        if(el.belongsTo === usersId.id){
          console.log(el);
          userPlaylist.push(el);      
        }
      })
    };

    if(userPlaylist.length){
      setUserPlaylist(userPlaylist);
    }
  }, [playlists]);


  useEffect(() => {
    if(message === "Playlist not found"){
      refToast.current.show({sticky: true, severity: 'error', summary: "We're sorry!", detail: "Something went wrong, please try again later!"});
      dispatch(resetMessageState());
    }else if(message === "User playlist deleted"){
      refToast.current.show({life: 2000, severity: 'success', summary: "Done", detail: "Your Playlist has been deleted"});
      if(userPlaylist.length === 1){
        setUserPlaylist([]);
      }

      dispatch(resetMessageState());
    }
  }, [message]);

  useEffect(() => {
    if(userPlaylist.length){
      document.querySelector(".createPlaylistButton").classList.remove("fa-bounce");
    }else{
      document.querySelector(".createPlaylistButton").classList.add("fa-bounce");
    }
  }, [userPlaylist]);


  return (
    <div className={styles.wrapper} id="myplaylist">
      <Toast ref={refToast} position='top-left'></Toast>
      
      {/* <div className={styles.titulo}>
        <h2 className={styles.title}>Your gallery, your music</h2>
        <div className={styles.createContainer}>
          <Link to="/create" className={styles.create}>
            Add a new playlist
          </Link>
        </div>
      </div> */}
      <h4 className={styles.title}>Your gallery, your music <i className="fa-solid fa-face-smile"></i></h4>
      <div className={styles.container1}>
        {
          userPlaylist.length ? (
            userPlaylist.map(el => {
              return (
                <PlaylistCard
                  creator={usersId.userName}
                  playlist={el.name}
                  price={false}
                  image={el.image}
                  playlistId={el.playlistId}
                  id={el.id}
                  el={el}
                  activeDelete={true}
                  showUser={true}
                />
              )
            })
          ):(
            <div className={styles.noPlaylists}>
              <div className={styles.noData}>
                <img src="/images/listening.png" alt="abc" />
              </div>
              <span>{`Hi ${usersId.userName}! Looks like you don't have any playlist yet...`}</span>
            </div>
          )
        }
        
      </div>
    </div>
  );
};

export default MyPlaylist;
