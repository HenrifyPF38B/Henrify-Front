import React, {useEffect, useRef, useState} from 'react'
import styles from "./EditPlaylist.module.css"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { TailSpin } from 'react-loader-spinner';
import Swal from 'sweetalert2'
import '@sweetalert2/themes/dark/dark.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { editPSongsState } from '../../redux/Actions/PlaylistsActions';
import { updateUserPlaylist } from '../../redux/Actions/UsersActions';
import { resetMessageState } from '../../redux/Actions/StateActions';


const EditPlaylit = () => {

  const navigate = useNavigate();
  const refToast = useRef();
  const refAudio = useRef();
  const { id } = useParams();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { playlists, usersId, songs, editPlaylistSongs, message } = state;

  const [userPlaylist, setUserPlaylist] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [newTracks, setNewTracks] = useState([]);
  const [optionsSearch, setOptionsSearch] = useState([]);
  const [songsSorted, setSongsSorted] = useState([]);

// PLAYER FUNCTIONS
const playTrack = (el) =>{
    console.log(el);
    if(!usersId.id || !usersId.member){
        if(playing){
            // Si ya hay una cancion sonando, primero la borramos.
            refAudio.current.pause();

            setTimeout(()=>{
                setPlaying(null)
            },100);

            // Luego ponemos la cancion nueva
            setTimeout(()=>{
                setPlaying({
                    audio: el.trackPreview ? el.trackPreview : el.audioPreview, 
                    id: el.id, 
                    playing: true
                });
            },200);

            setTimeout(()=>{
                refAudio.current.play(); 
            },300)

        }else{
            setPlaying({
                audio: el.trackPreview ? el.trackPreview : el.audioPreview, 
                id: el.id, 
                playing: true
            });
            
            setTimeout(()=>{
                refAudio.current.play();
            },100);
        }
    }else if(usersId.member){
        if(playing){
            // Si ya hay una cancion sonando, primero la borramos.
            refAudio.current.pause();

            setTimeout(()=>{
                setPlaying(null)
            },100);

            // Luego ponemos la cancion nueva
            setTimeout(()=>{
                setPlaying({
                    audio: el.trackFull ? el.trackFull : el.audioFull, 
                    id: el.id, 
                    playing: true
                });
            },200);

            setTimeout(()=>{
                refAudio.current.play(); 
            },300)

        }else{
            setPlaying({
                audio: el.trackFull ? el.trackFull : el.audioFull, 
                id: el.id, 
                playing: true
            });
            
            setTimeout(()=>{
                refAudio.current.play();
            },100);
        }
    }
};

const stopTrack = (el) =>{
    
    refAudio.current.pause();

    setTimeout(()=>{
        setPlaying(null)
    },200)

};

const handlePlayTrack = (el) =>{
  if(usersId.member){
    if(!el.audioFull){
        refToast.current.show({lifeTime: 5000, severity: 'info', summary: "We're sorry!", detail: "This song's preview is not available!"});
    }else{
        playTrack(el);
    }
  }else{
    if(!el.audioPreview){
        refToast.current.show({lifeTime: 5000, severity: 'info', summary: "We're sorry!", detail: "This song's preview is not available!"});
    }else{
        playTrack(el);
    }
  }
};

const handlePauseTrack = (el) =>{
    stopTrack(el);
};
// 


const handleDeleteTrack = (id) =>{
    Swal.fire({
      icon: "warning",
      title: `Hey ${usersId.userName}!`,
      text: "Are you sure you want to delete this track?",
      showDenyButton: true,
      showConfirmButton: true,
      denyButtonText:"Nope",
      confirmButtonText: "Yes!",
      denyButtonColor:"grey",
      confirmButtonColor:"#1f1f1f",
      denyButtonAriaLabel:"black",
      toast: true
    }).then(result => {
      if(result.isConfirmed){
        let filter = newTracks.filter(track => track.id !== id);
        setNewTracks(filter);
        setPlaying(false);
      }else if(result.isDenied){
        return;
      }
    })
};


const handleAddTrack = (el) =>{
  console.log(el);
  setNewTracks([
    ...newTracks,
    el
  ])
  console.log(newTracks);
};

// UPDATE FUNCTION  
const handleUpdatePlaylist = () =>{
  if(message !== "User playlist updated"){
    if(newTracks.length > 0){
      dispatch(updateUserPlaylist({tracks: newTracks, id: userPlaylist.id}));
    }else{
      return refToast.current.show({sticky: true, severity: 'warn', summary: `Wait ${usersId.userName}!`, detail: "You must have at least one song"});
    }
  }else{
    return refToast.current.show({sticky: true, severity: 'error', summary: "We're sorry!", detail: "Something went wrong, pleasee try again later..."});
  }
};


// HANDLE TYPEAHEAD
const handleSelected = (el) =>{
  dispatch(editPSongsState(el));
};


  useEffect(() => {
    if(playlists.length){
      playlists.map(el => {
        if(el.id === Number(id)){
          setUserPlaylist(el);
          setNewTracks(el.tracks);
        }
      })
    }
  }, [id, playlists]);


  useEffect(() => {

    let sortedSongs = songs.sort(function (a, b) {
      return ('' + a.name).localeCompare(b.name);
    });

    setSongsSorted(sortedSongs);

  }, [songs]);

  useEffect(() => {
    if(songsSorted.length){
      let options = [];
      songsSorted.map((el, index) => {
        options.push({
          id: el.id,
          songId: el.songId,
          label: el.artists[0].name + " • " + el.name,
          name: el.name,
          audioPreview: el.audioPreview,
          audioFull: el.audioFull,
          image: el.image,
          artists: el.artists,
          popularity: el.popularity,
          explicit: el.explicit
        });
      });
      setOptionsSearch(options);
    }
  }, [songsSorted]);

  useEffect(() => {
    if(message === "User playlist updated"){
      refToast.current.show({lifeTime: 2000, severity: 'success', summary: "Great!", detail: "Your playlist has been updated!"});
      setTimeout(()=>{
        navigate("/myPlaylist");
        dispatch(resetMessageState());
      },2100)
    }else if(message === "Playlist not found"){
      refToast.current.show({sticky: true, severity: 'error', summary: "We're sorry!", detail: "Something went wrong, please try again later..."});
    }
  }, [message]);

  return ( 
    <div>
      {
        (userPlaylist && userPlaylist.name) &&
          <div className={styles.wrapper}>
            <Toast ref={refToast} position='top-left'></Toast>
            <div className={styles.goBack} onClick={()=> navigate("/myPlaylist")}>
              <i className="fa-solid fa-chevron-left fa-md"></i>
            </div>
            {
              playing && 
                  <audio ref={refAudio} loop={true}>
                      <source src={playing?.audio}/>
                  </audio>
            }
            <div className={styles.left}>
              <div className={styles.leftContainer}>
                {/* LEFT FIRST SECTION */}
                <div className={styles.pImg}>
                  <img src={userPlaylist?.image} alt="abc" />
                </div>
      
                {/* LEFT SEC SECTION */}
                <div className={styles.pUser}>
                  <div className={styles.userDTop}>
                    <div className={styles.span1}>
                      <span>Your Playlist • </span>
                      <span>{newTracks.length} Songs</span>
                    </div>
                    <div className={styles.span2}>
                      <span>{userPlaylist?.name}</span>
                    </div>
                  </div>
                  <div className={styles.userD}>
                    <div className={styles.avatar}>
                      <img src={usersId.avatar} alt="abc" />
                    </div>
                    <div className={styles.span3}>
                      <span>By {usersId.userName}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.leftBottom}>
                {
                  newTracks.length && 
                  newTracks.map((el, index) => {
                    return(
                      <div className={styles.playlistModalCard}>
                          <div className={styles.deleteTrack} onClick={(e)=> handleDeleteTrack(el.id)}>
                            <i className="fa-solid fa-xmark fa-xs"></i>
                          </div>
                          <div className={styles.favorites}>
                              {
                                  playing && playing.id === el.id &&
                                  <div class="loading-wave">
                                      <div class="loading-bar"></div>
                                      <div class="loading-bar"></div>
                                      <div class="loading-bar"></div>
                                      <div class="loading-bar"></div>
                                  </div>
                              }
                          </div>
                          <div className={styles.playlistModalDetails} style={{borderBottom: userPlaylist[0]?.tracks.length !== index + 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                              <div className={styles.playDiv}>
                                  <img src={el.image} alt="abc" width={40}/>
                                  <div className={styles.play}>
                                      {
                                          playing && playing.playing && playing.id === el.id ? (
                                              <i className="fa-solid fa-pause fa-xl" onClick={(e)=> handlePauseTrack(el)}></i>
                                          ):(
                                              <i className="fa-solid fa-play fa-xl ms-1" onClick={(e)=> handlePlayTrack(el)}></i>
                                          )
                                      }
                                  </div>
                              </div>
                              <div className='d-flex flex-column ms-4 gap-2'>
                                  <span>{el.trackName ? (el.trackName.length > 29 ? el.trackName.slice(0, 29) + "…" : el.trackName) : el.name.length > 29 ? el.name.slice(0, 29) + "…" : el.name}</span>
                                  <span>{el.artists.map((artist, index) => {
                                      if(index === el.artists.length - 1){
                                          return artist.name
                                      }else{
                                          return artist.name + " • "
                                      }
                                  }).toString().replaceAll(",", "").length > 33 ? (
                                      el.artists.map((artist, index) => {
                                          if(index === el.artists.length - 1){
                                              return artist.name
                                          }else{
                                              return artist.name + " • "
                                          }
                                      }).toString().replaceAll(",", "").slice(0, 32) + "…"
                                  ):(
                                      el.artists.map((artist, index) => {
                                          if(index === el.artists.length - 1){
                                              return artist.name
                                          }else{
                                              return artist.name + " • "
                                          }
                                      })
                                  )}
                                  </span>
                              </div>
                          </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className={styles.right}>
                <div className={styles.rightTitle}>
                  <span>Add new songs!</span>
                  <i className="fa-solid fa-caret-down fa-bounce ms-2" style={{color:"lightgrey"}}></i>
                </div>
                <div className={styles.search}>
                  <div className={styles.searchBar}>
                    <Typeahead
                      id="pagination-example"
                      placeholder='What do you want to listen today?'
                      onChange={(selected) => handleSelected(selected)}
                      options={optionsSearch}
                    />
                  </div>
                </div>
                <div className={styles.songsContainer}>
                  {
                    !editPlaylistSongs.length && songsSorted?.length &&
                    songsSorted.map((el, index) => {
                      return(
                        <div className={styles.playlistModalCard}>
                            {
                              newTracks.filter(track => track.id === el.id).length > 0 ? (
                              <div className={styles.trackAdded}>
                                <i className="fa-solid fa-md fa-circle-check"></i>
                              </div>
                              ):(
                                <div className={styles.addTrack} onClick={(e)=> handleAddTrack(el)}>
                                  <i className="fa-solid fa-md fa-circle-plus"></i>
                                </div>
                              )
                            }
                            <div className={styles.favorites}>
                                {
                                    playing && playing.id === el.id &&
                                    <div class="loading-wave">
                                        <div class="loading-bar"></div>
                                        <div class="loading-bar"></div>
                                        <div class="loading-bar"></div>
                                        <div class="loading-bar"></div>
                                    </div>
                                }
                            </div>
                            <div className={styles.playlistModalDetails} style={{borderBottom: userPlaylist[0]?.tracks.length !== index + 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                                <div className={styles.playDiv}>
                                    <img src={el.image} alt="abc" width={40}/>
                                    <div className={styles.play}>
                                        {
                                            playing && playing.playing && playing.id === el.id ? (
                                                <i className="fa-solid fa-pause fa-xl" onClick={(e)=> handlePauseTrack(el)}></i>
                                            ):(
                                                <i className="fa-solid fa-play fa-xl ms-1" onClick={(e)=> handlePlayTrack(el)}></i>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='d-flex flex-column ms-4 gap-2'>
                                    <span>{el.trackName ? (el.trackName.length > 29 ? el.trackName.slice(0, 29) + "…" : el.trackName) : el.name.length > 29 ? el.name.slice(0, 29) + "…" : el.name}</span>
                                    <span>{el.artists.map((artist, index) => {
                                        if(index === el.artists.length - 1){
                                            return artist.name
                                        }else{
                                            return artist.name + " • "
                                        }
                                    }).toString().replaceAll(",", "").length > 33 ? (
                                        el.artists.map((artist, index) => {
                                            if(index === el.artists.length - 1){
                                                return artist.name
                                            }else{
                                                return artist.name + " • "
                                            }
                                        }).toString().replaceAll(",", "").slice(0, 32) + "…"
                                    ):(
                                        el.artists.map((artist, index) => {
                                            if(index === el.artists.length - 1){
                                                return artist.name
                                            }else{
                                                return artist.name + " • "
                                            }
                                        })
                                    )}
                                    </span>
                                </div>
                            </div>
                        </div>
                      )
                    })
                  }
                  {
                    editPlaylistSongs.length && 
                    editPlaylistSongs.map((el, index) => {
                      return(
                        <div className={styles.playlistModalCard}>
                            {
                              newTracks.filter(track => track.id === el.id).length > 0 ? (
                              <div className={styles.trackAdded}>
                                <i className="fa-solid fa-md fa-circle-check"></i>
                              </div>
                              ):(
                                <div className={styles.addTrack} onClick={(e)=> handleAddTrack(el)}>
                                  <i className="fa-solid fa-md fa-circle-plus"></i>
                                </div>
                              )
                            }
                            <div className={styles.favorites}>
                                {
                                    playing && playing.id === el.id &&
                                    <div class="loading-wave">
                                        <div class="loading-bar"></div>
                                        <div class="loading-bar"></div>
                                        <div class="loading-bar"></div>
                                        <div class="loading-bar"></div>
                                    </div>
                                }
                            </div>
                            <div className={styles.playlistModalDetails} style={{borderBottom: userPlaylist[0]?.tracks.length !== index + 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                                <div className={styles.playDiv}>
                                    <img src={el.image} alt="abc" width={40}/>
                                    <div className={styles.play}>
                                        {
                                            playing && playing.playing && playing.id === el.id ? (
                                                <i className="fa-solid fa-pause fa-xl" onClick={(e)=> handlePauseTrack(el)}></i>
                                            ):(
                                                <i className="fa-solid fa-play fa-xl ms-1" onClick={(e)=> handlePlayTrack(el)}></i>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='d-flex flex-column ms-4 gap-2'>
                                    <span>{el.trackName ? (el.trackName.length > 29 ? el.trackName.slice(0, 29) + "…" : el.trackName) : el.name.length > 29 ? el.name.slice(0, 29) + "…" : el.name}</span>
                                    <span>{el.artists.map((artist, index) => {
                                        if(index === el.artists.length - 1){
                                            return artist.name
                                        }else{
                                            return artist.name + " • "
                                        }
                                    }).toString().replaceAll(",", "").length > 33 ? (
                                        el.artists.map((artist, index) => {
                                            if(index === el.artists.length - 1){
                                                return artist.name
                                            }else{
                                                return artist.name + " • "
                                            }
                                        }).toString().replaceAll(",", "").slice(0, 32) + "…"
                                    ):(
                                        el.artists.map((artist, index) => {
                                            if(index === el.artists.length - 1){
                                                return artist.name
                                            }else{
                                                return artist.name + " • "
                                            }
                                        })
                                    )}
                                    </span>
                                </div>
                            </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className={styles.updateBtn}>
                  <button onClick={handleUpdatePlaylist}>Update</button>
                </div>
            </div>
          </div>
      }
      {
        !userPlaylist && 
        <div className='d-flex justify-content-center align-items-center w-100' style={{backgroundColor:"#1f1f1f", height: "100vh"}}>
          <TailSpin
                height="100"
                width="100"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
      }
    </div>
   );
}
 
export default EditPlaylit;