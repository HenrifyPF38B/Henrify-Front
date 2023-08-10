import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./addToPlaylistModal.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { PlaylistContext } from '../contexts/playlistContext';
import { toggleUserPlaylist } from '../redux/Actions/UsersActions';
import { resetMessageState } from '../redux/Actions/StateActions';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
import { getPlaylists } from '../redux/Actions/PlaylistsActions';


const AddToPlaylistModal = () => {

  const refToast = useRef();
  const state = useSelector(state => state);
  const { playlists, usersId, message } = state;
  const dispatch = useDispatch();
  const dataContext = useContext(PlaylistContext);
  const { openAddToPlaylist, setOpenAddToPlaylist } = dataContext;

  const [userPlaylists, setUserPlaylists] = useState([]);

  const handleAddOrRemove = (e, playlist) =>{
    if(message !== "Playlist toggle success"){
      if(e.target.checked){
        
        let updatedPlaylist = playlist;
  
        updatedPlaylist.tracks.push(openAddToPlaylist);
        
        dispatch(toggleUserPlaylist({id: playlist.id, tracks: updatedPlaylist.tracks}));
  
      }else{
        let updatedPlaylist = playlist;
  
        let filter = updatedPlaylist.tracks.filter(track => track.name !== openAddToPlaylist.name);
        
        dispatch(toggleUserPlaylist({id: playlist.id, tracks: filter}));
        
      }
    }else{
      return refToast.current.show({sticky: true, severity: 'info', summary: "Wow, not so fast!", detail: "Give our robots some time to complete your request"});
    }
  };

  const handleCloseModal = () =>{
    setOpenAddToPlaylist(false);
    dispatch(getPlaylists());
  };

  useEffect(() => {
    let userP = [];
    if(playlists.length){
      playlists.map(el => {
        if(el.belongsTo === usersId.id){
          userP.push(el);
        }
      });

      setUserPlaylists(userP);
    }
  }, [playlists]);

  useEffect(() => {
    if(message === "Playlist toggle success"){
      dispatch(resetMessageState());
    }
  }, [message]);

  return ( 
    <article className={styles.article} onClick={handleCloseModal}>
      <div onClick={(e)=> e.stopPropagation()}>
        <Toast ref={refToast} position='top-left'></Toast>
      </div>
      <div className={styles.div} onClick={(e)=> e.stopPropagation()}>
        <div className={styles.container}>
          <div className={styles.avatar}>
            <img src={usersId.avatar} alt="abc" />
            <span>{`Hi ${usersId.userName}!`}</span>
          </div>
          <div className={styles.title}>
            <p>Your Playlists</p>
          </div>
          {
            userPlaylists.length > 0 ? (
              <div className={styles.myPlaylists}>
                {
                  userPlaylists.map((el, index) => {
                    return(
                      <div key={index} className={styles.eachPlaylist} style={{borderBottom: index + 1 === userPlaylists.length ? "none" : "1px solid rgba(66, 65, 65, 0.2)"}}>       
                        {
                          el.tracks.filter(track => track.name === openAddToPlaylist.name).length > 0 ? (
                            <div className={styles.addIcon}>
                              <input type="checkbox" defaultChecked onClick={(e)=> handleAddOrRemove(e, el)} />
                            </div> 
                          ):(
                            <div className={styles.addIcon}>
                              <input type="checkbox" onClick={(e)=> handleAddOrRemove(e, el)} />
                            </div> 
                          )
                        }
                        <div className={styles.playlistImg}>
                          <img src={el.image} alt="abc"/>
                        </div>
                        <div className={styles.playlistD}>
                          <span>{el.name}</span>
                          <span>By {el.owner}</span>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            ):(
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>
                  <i className='bx bxl-deezer bx-lg'></i>
                </div>
                <span>You don't have any Playlists yet!</span>
                <div className={styles.createPlaylist}>
                  <button>Create Playlist</button>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </article>
   );
}
 
export default AddToPlaylistModal;