import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./playModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext';
import { useDispatch, useSelector } from 'react-redux';
import { addToFav, favsUser, removeFromFav } from '../redux/Actions/UsersActions';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 


const PlayModal = () => {

  const refToast = useRef();
  const state = useSelector(state => state);
  const { userFavs, usersId } = state;
  const dispatch = useDispatch();
  const dataContext = useContext(PlaylistContext);
  const { playerOpen, setPlayerOpen, playerHidden, setPlayerHidden } = dataContext;
  const { originalData, data, originalIndex, index, audio, audioFull, img, song, artist, type, albumType, id } = playerOpen;
  const refAudio = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [loopActive, setLoopActive] = useState(false);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [memberSongDetails, setMemberSongDetails] = useState({index: originalIndex, audioFull, img, song, artist});
  const [songDetails, setSongDetails] = useState({index, audio, img, song, artist, id});
  // Lo pongo en songDetails, para poder cambiar el audio cuando termine de reproducirse una cancion
  
  // Tiempo total formateado
  const [duration, setDuration] = useState(0);

  // Tiempo actual formateado
  const [currentTime, setCurrentTime] = useState("00:00");

  // Tiempo actual sin formatear (Para input range value)
  const [progressTime, setProgressTime] = useState("0");
  
  // Tiempo total sin formatear (Para input range value)
  const [totalTime, setTotalTime] = useState(0);

  const handleVolume = (e) =>{
    refAudio.current.volume = e.target.value * 0.01;
    setVolume(e.target.value * 0.01);
  };

  const toogleMute = () =>{
    if(muted){
      refAudio.current.volume = volume;
      setMuted(false);
    }else{
      refAudio.current.volume = 0;
      setMuted(true);
    }
  };

  const tooglePlayPause = () =>{
    if(isPlaying){
      refAudio.current.pause();
      setIsPlaying(false);
    }else{
      refAudio.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    console.log(playerOpen);
    if(refAudio){
      refAudio.current.volume = 0.8;
      setIsPlaying(true);
      refAudio.current.play();
    }
  }, [playerOpen]);

  useEffect(() => {
    if(volume === 0){
      setMuted(true);
    }else{
      setMuted(false);
    }
  }, [volume]);

  // Esto lo necesitamoss para poder cambiar de cancion al clickear en una TR de Playlist.jsx
  useEffect(() => {
    setSongDetails({
      index, audio, img, song, artist, id
    });
    setMemberSongDetails({
      index: originalIndex, audioFull, img, song, artist, id
    })
    setTimeout(()=>{
      refAudio.current.play();
    },200)
  }, [index, audio, img, song, artist, id]);


  const timeUpdate = (event) => {
    setProgressTime(event.target.currentTime);
    const minutes = Math.floor(event.target.currentTime / 60);
    const seconds = Math.floor(event.target.currentTime - minutes * 60);
    const currentTime = str_pad_left(minutes,'0',2) + ':' + str_pad_left(seconds,'0',2);
    setCurrentTime(currentTime);
  }
  const str_pad_left = (string,pad,length) => {
      return (new Array(length+1).join(pad)+string).slice(-length);
  }
  
  const formatTime = (time) => {
    let minutes = Math.floor( time / 60 )
    let timeForSeconds = time - ( minutes * 60 ) // seconds without counted minutes 
    let seconds = Math.floor( timeForSeconds )
    let secondsReadable = seconds > 9 ? seconds : `0${seconds}` // To change 2:2 into 2:02
    return `${minutes}:${secondsReadable}`
  }

  // ENDED FOR NON MEMBERS
  const handleOnEnded = () =>{
    // Como hay canciones que no tienen previewTrack, desde Playlist.jsx,
    // Filtro las canciones que si tienen preview, y me paso el array filtrado, mediante playerOpen.
    
    // Si el loop esta desactivado y el aleatorio activado
    if(!loopActive && shuffleActive && !type){
      let randomNumber = Math.floor(Math.random() * data.length);

      setSongDetails({
        index: data[randomNumber].index,
        id: typeof data[randomNumber].id === "number" ? data[randomNumber].songId : data[randomNumber].id,
        audio: data[randomNumber].trackPreview ? data[randomNumber].trackPreview : data[randomNumber].audioPreview,
        img: data[randomNumber].image.url ? data[randomNumber].image.url : data[randomNumber].image,
        song: data[randomNumber].trackName ? data[randomNumber].trackName : data[randomNumber].name,
        artist: data[randomNumber].artists.map((artist, index) => {
          if(index === data[randomNumber].artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        })
      });

      setTimeout(()=> {
        refAudio.current.play();
      }, 200)
    };

    // Si no esta el loop activado y el modo aleatorio tampoco:
    if(!loopActive && !shuffleActive && !type){
      if(data[songDetails.index + 1]){
        // Significa que existe una cancion despues de la actual
        console.log(data[songDetails.index + 1]);
        setSongDetails({
          index: songDetails.index + 1,
          id: typeof data[songDetails.index + 1].id === "number" ? data[songDetails.index + 1].songId : data[songDetails.index + 1].id,
          audio: data[songDetails.index + 1].trackPreview ? data[songDetails.index + 1].trackPreview : data[songDetails.index + 1].audioPreview,
          img: data[songDetails.index + 1].image.url ? data[songDetails.index + 1].image.url : data[songDetails.index + 1].image,
          song: data[songDetails.index + 1].trackName ? data[songDetails.index + 1].trackName : data[songDetails.index + 1].name,
          artist: data[songDetails.index + 1].artists.map((artist, index) => {
            if(index === data[songDetails.index + 1].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });

        setTimeout(()=> {
          refAudio.current.play();
        }, 200)
      
      }else{
        // Significa que no existe una cancion despues de la actual
        setSongDetails({
          index: 0,
          id: typeof data[0].id === "number" ? data[0].songId : data[0].id,
          audio: data[0].trackPreview ? data[0].trackPreview : data[0].audioPreview,
          img: data[0].image.url ? data[0].image.url : data[0].image,
          song: data[0].trackName ? data[0].trackName : data[0].name,
          artist: data[0].artists.map((artist, index) => {
            if(index === data[0].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });
  
        setTimeout(()=> {
          refAudio.current.play();
        }, 200)
        
      };
    };
    
  };

  // ENDED FOR MEMBERS
  const handleOnEndedMember = () =>{

    if(!loopActive && shuffleActive && !type){
      let randomNumber = Math.floor(Math.random() * originalData.length);

      setMemberSongDetails({
        index: originalData[randomNumber].index,
        id: originalData[randomNumber].id,
        audioFull: originalData[randomNumber].trackFull,
        img: originalData[randomNumber].image.url,
        song: originalData[randomNumber].trackName,
        artist: originalData[randomNumber].artists.map((artist, index) => {
          if(index === originalData[randomNumber].artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        })
      });

      setTimeout(()=> {
        refAudio.current.play();
      }, 200)
    };

    // Si no esta el loop activado y el modo aleatorio tampoco:
    if(!loopActive && !shuffleActive && !type){
      if(originalData[memberSongDetails.index + 1]){
        console.log(originalData[memberSongDetails.index + 1]);
        // Significa que existe una cancion despues de la actual
        setMemberSongDetails({
          index: memberSongDetails.index + 1,
          id: typeof originalData[memberSongDetails.index + 1].id === "number" ? originalData[memberSongDetails.index + 1].songId : originalData[memberSongDetails.index + 1].id,
          audioFull: originalData[memberSongDetails.index + 1].trackFull ? originalData[memberSongDetails.index + 1].trackFull : originalData[memberSongDetails.index + 1].audioFull,
          img: originalData[memberSongDetails.index + 1].image.url ? originalData[memberSongDetails.index + 1].image.url : originalData[memberSongDetails.index + 1].image,
          song: originalData[memberSongDetails.index + 1].trackName ? originalData[memberSongDetails.index + 1].trackName : originalData[memberSongDetails.index + 1].name,
          artist: originalData[memberSongDetails.index + 1].artists.map((artist, index) => {
            if(index === originalData[memberSongDetails.index + 1].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });

        setTimeout(()=> {
          refAudio.current.play();
        }, 200)
      
      }else{
        // Significa que no existe una cancion despues de la actual
        setMemberSongDetails({
          index: 0,
          id: typeof originalData[0].id === "number" ? originalData[0].songId : originalData[0].id,
          audioFull: originalData[0].trackFull ? originalData[0].trackFull : originalData[0].audioFull,
          img: originalData[0].image.url ? originalData[0].image.url : originalData[0].image,
          song: originalData[0].trackName ? originalData[0].trackName : originalData[0].name,
          artist: originalData[0].artists.map((artist, index) => {
            if(index === originalData[0].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });
  
        setTimeout(()=> {
          refAudio.current.play();
        }, 200)
        
      };
    };
      
  };

  // NEXT & PREV FOR NON MEMBERS
  const handleNextSong = () =>{
    // Si esta en modo aleatorio al clickear el boton:
    if(!loopActive && shuffleActive && !type){
      let Y = Math.floor(Math.random() * data.length);      setSongDetails({
        index: Y,
        audio: data[Y].trackPreview ? data[Y].trackPreview : data[Y].audioPreview,
        img: data[Y].image.url ? data[Y].image.url : data[Y].image,
        song: data[Y].trackName ? data[Y].trackName : data[Y].name,
        id: typeof data[Y].id === "number" ? data[Y].songId : data[Y].id,
        artist: data[Y].artists.map((artist, index) => {
          if(index === data[Y].artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        })
      });

      setTimeout(()=>{
        refAudio.current.play();
      }, 200);
    };

    // Si ni el loop ni el aleatorio estan activos:
    if(!loopActive && !shuffleActive && !type){
      if(data[songDetails.index + 1]){
        // Si hay una cancion despues de la actual:
        let Y = songDetails.index + 1;
        console.log(data[Y]);

        setSongDetails({
          index: Y,
          audio: data[Y].trackPreview ? data[Y].trackPreview : data[Y].audioPreview,
          img: data[Y].image.url ? data[Y].image.url : data[Y].image,
          id: typeof data[Y].id === "number" ? data[Y].songId : data[Y].id,
          song: data[Y].trackName ? data[Y].trackName : data[Y].name,
          artist: data[Y].artists.map((artist, index) => {
            if(index === data[Y].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });

        setTimeout(()=>{
          refAudio.current.play();
        }, 200);
    
      }else{
        // Si no hay una cancion despues de la actual:
        console.log(data[0]);
        setSongDetails({
          index: 0,
          audio: data[0].trackPreview ? data[0].trackPreview : data[0].audioPreview,
          img: data[0].image.url ? data[0].image.url : data[0].image,
          id: typeof data[0].id === "number" ? data[0].songId : data[0].id,
          song: data[0].trackName ? data[0].trackName : data[0].name,
          artist: data[0].artists.map((artist, index) => {
            if(index === data[0].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });
  
        setTimeout(()=>{
          refAudio.current.play();
        }, 200);
      };
      
    };

    if(type){
      refToast.current.show({sticky: true, severity: 'info', summary: "Hi there!", detail: "This functionality is available only for Playlists"});
    }
  
  };

  const handlePrevSong = () =>{
    
    if(!loopActive && shuffleActive && !type){
      let Y = Math.floor(Math.random() * data.length);
      console.log(data[Y]);
      setSongDetails({
        index: Y,
        audio: data[Y].trackPreview ? data[Y].trackPreview : data[Y].audioPreview,
        img: data[Y].image.url ? data[Y].image.url : data[Y].image,
        id: typeof data[Y].id === "number" ? data[Y].songId : data[Y].id,
        song: data[Y].trackName ? data[Y].trackName : data[Y].name,
        artist: data[Y].artists.map((artist, index) => {
          if(index === data[Y].artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        })
      });

      setTimeout(()=>{
        refAudio.current.play();
      }, 200);
    };

    if(!loopActive && !shuffleActive && !type){
      if(data[songDetails.index - 1]){
        // Si hay una cancion en la posicion anterior a la actual:
        let Y = songDetails.index - 1;
        console.log(data[Y]);
        setSongDetails({
          index: Y,
          audio: data[Y].trackPreview ? data[Y].trackPreview : data[Y].audioPreview,
          img: data[Y].image.url ? data[Y].image.url : data[Y].image,
          song: data[Y].trackName ? data[Y].trackName : data[Y].name,
          id: typeof data[Y].id === "number" ? data[Y].songId : data[Y].id,
          artist: data[Y].artists.map((artist, index) => {
            if(index === data[Y].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });

        setTimeout(()=>{
          refAudio.current.play();
        }, 200);
      }else{
        // Si no hay una cancion antes, reproduce la ultima del array "data":
        let Y = data[data.length-1].location;
        setSongDetails({
          index: Y,
          audio: data[Y].trackPreview ? data[Y].trackPreview : data[Y].audioPreview,
          img: data[Y].image.url ? data[Y].image.url : data[Y].image,
          song: data[Y].trackName ? data[Y].trackName : data[Y].name,
          id: typeof data[Y].id === "number" ? data[Y].songId : data[Y].id,
          artist: data[Y].artists.map((artist, index) => {
            if(index === data[Y].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });
        console.log(songDetails);

        setTimeout(()=>{
          refAudio.current.play();
        }, 200);
      }
    }


    if(type){
      refToast.current.show({sticky: true, severity: 'info', summary: "Hi there!", detail: "This functionality is available only for Playlists"});
    }
  };

  // NEXT & PREV FOR MEMBERS

  const handleNextSongMembers = () =>{
    
    // Si esta en modo aleatorio al clickear el boton:
    if(!loopActive && shuffleActive && !type){
      let Y = Math.floor(Math.random() * originalData.length);
      console.log(originalData[Y]);
      setMemberSongDetails({
        index: Y,
        audioFull: originalData[Y].trackFull ? originalData[Y].trackFull : originalData[Y].audioFull,
        img: albumType ? img : originalData[Y].image.url ? originalData[Y].image.url : originalData[Y].image,
        song: originalData[Y].trackName ? originalData[Y].trackName : originalData[Y].name,
        id: typeof originalData[Y].id === "number" ? originalData[Y].songId : originalData[Y].id,
        artist: originalData[Y].artists.map((artist, index) => {
          if(index === originalData[Y].artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        })
      });

      setTimeout(()=>{
        refAudio.current.play();
      }, 200);
    };

    // Si ni el loop ni el aleatorio estan activos:
    if(!loopActive && !shuffleActive && !type){
      if(originalData[memberSongDetails.index + 1]){
        // Si hay una cancion despues de la actual:
        let Y = memberSongDetails.index + 1;
        console.log(originalData[Y]);
        setMemberSongDetails({
          index: Y,
          audioFull: originalData[Y].trackFull ? originalData[Y].trackFull : originalData[Y].audioFull,
          img: albumType ? img : originalData[Y].image.url ? originalData[Y].image.url : originalData[Y].image,
          id: typeof originalData[Y].id === "number" ? originalData[Y].songId : originalData[Y].id,
          song: originalData[Y].trackName ? originalData[Y].trackName : originalData[Y].name,
          artist: originalData[Y].artists.map((artist, index) => {
            if(index === originalData[Y].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });

        setTimeout(()=>{
          refAudio.current.play();
        }, 200);
    
      }else{
        // Si no hay una cancion despues de la actual:
        setMemberSongDetails({
          index: 0,
          audioFull: originalData[0].trackFull ? originalData[0].trackFull : originalData[0].audioFull,
          img: albumType ? img : originalData[0].image.url ? originalData[0].image.url : originalData[0].image,
          id: typeof originalData[0].id === "number" ? originalData[0].songId : originalData[0].id,
          song: originalData[0].trackName ? originalData[0].trackName : originalData[0].name,
          artist: originalData[0].artists.map((artist, index) => {
            if(index === originalData[0].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });
  
        setTimeout(()=>{
          refAudio.current.play();
        }, 200);
      };
      
    };

    if(type){
      refToast.current.show({sticky: true, severity: 'info', summary: "Hi there!", detail: "This functionality is available only for Playlists"});
    }
  
  };

  const handlePrevSongMembers = () =>{
    console.log(originalData);

    if(!loopActive && shuffleActive && !type){
      let Y = Math.floor(Math.random() * originalData.length);
      
      setMemberSongDetails({
        index: Y,
        audioFull: originalData[Y].trackFull ? originalData[Y].trackFull : originalData[Y].audioFull,
        img: albumType ? img : originalData[Y].image.url ? originalData[Y].image.url : originalData[Y].image,
        id: typeof originalData[Y].id === "number" ? originalData[Y].songId : originalData[Y].id,
        song: originalData[Y].trackName ? originalData[Y].trackName : originalData[Y].name,
        artist: originalData[Y].artists.map((artist, index) => {
          if(index === originalData[Y].artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        })
      });

      setTimeout(()=>{
        refAudio.current.play();
      }, 200);
    };

    if(!loopActive && !shuffleActive && !type){
      if(originalData[memberSongDetails.index - 1]){
        // Si hay una cancion en la posicion anterior a la actual:
        let Y = memberSongDetails.index - 1;
        setMemberSongDetails({
          index: Y,
          audioFull: originalData[Y].trackFull ? originalData[Y].trackFull : originalData[Y].audioFull,
          img: albumType ? img : originalData[Y].image.url ? originalData[Y].image.url : originalData[Y].image,
          song: originalData[Y].trackName ? originalData[Y].trackName : originalData[Y].name,
          id: typeof originalData[Y].id === "number" ? originalData[Y].songId : originalData[Y].id,
          artist: originalData[Y].artists.map((artist, index) => {
            if(index === originalData[Y].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });

        setTimeout(()=>{
          refAudio.current.play();
        }, 200);
      }else{
        // Si no hay una cancion antes, reproduce la ultima del array "data":
       
        setMemberSongDetails({
          index: originalData.length - 1,
          audioFull: originalData[originalData.length-1].trackFull ? originalData[originalData.length-1].trackFull : originalData[originalData.length-1].audioFull,
          img: albumType ? img : originalData[originalData.length-1].image.url ? originalData[originalData.length-1].image.url : originalData[originalData.length-1].image,
          song: originalData[originalData.length-1].trackName ? originalData[originalData.length-1].trackName : originalData[originalData.length-1].name,
          id: typeof originalData[originalData.length-1].id === "number" ? originalData[originalData.length-1].songId : originalData[originalData.length-1].id,
          artist: originalData[originalData.length-1].artists.map((artist, index) => {
            if(index === originalData[originalData.length-1].artists.length - 1){
              return artist.name
            }else{
              return artist.name + " • "
            }
          })
        });

        setTimeout(()=>{
          refAudio.current.play();
        }, 200);
      }
    }


    if(type){
      refToast.current.show({sticky: true, severity: 'info', summary: "Hi there!", detail: "This functionality is available only for Playlists"});
    }
  };

  const handleAddFav = (e) =>{
    // setInFavs(!inFavs);
    if(usersId.id){
      if(usersId.member){
        dispatch(favsUser(usersId?.id, memberSongDetails.id));
        if(e.target.dataset.id === "add"){
            dispatch(addToFav(memberSongDetails.id));
        }else{
            dispatch(removeFromFav(memberSongDetails.id))
        }
      }else if(!usersId.member){
        dispatch(favsUser(usersId?.id, songDetails.id));
        if(e.target.dataset.id === "add"){
            dispatch(addToFav(songDetails.id));
        }else{
            dispatch(removeFromFav(songDetails.id))
        }
      }
    }else{
      refToast.current.show({sticky: true, severity: 'info', summary: "We're sorry!", detail: "Please login to access this functionality!"});
    }
    
};

  return ( 
      <article className={`playerArticle ${playerHidden ? "hide"  : ""}`}>
        <Toast ref={refToast} position='top-left'></Toast>

        {
          usersId.member ? (
            <audio 
              ref={refAudio} 
              src={memberSongDetails.audioFull} 
              // Esto viene desde playlist.jsx, es el audio
    
              onEnded={handleOnEndedMember}
              preload='metadata'
              onDurationChange={(e)=> {setDuration(formatTime(e.currentTarget.duration)) ; setTotalTime(e.currentTarget.duration)}}
              // Con esto obtenes cuanto dura la cancion, la duracion.
    
              onPlay={()=> setIsPlaying(true)}
              // Cuando la cancion esta en play hace eso ˆ
    
    
              onPause={()=> setIsPlaying(false)}
              // En pausa hace eso ˆ
    
    
              loop={loopActive}
              // Esto es paara activar el loop mediante el boton de loop que tiene el player
    
              onTimeUpdate={timeUpdate}
            />
          ):(
            <audio 
              ref={refAudio} 
              src={songDetails.audio} 
              // Esto viene desde playlist.jsx, es el audio
    
              onEnded={handleOnEnded}
              preload='metadata'
              onDurationChange={(e)=> {setDuration(formatTime(e.currentTarget.duration)) ; setTotalTime(e.currentTarget.duration)}}
              // Con esto obtenes cuanto dura la cancion, la duracion.
    
              onPlay={()=> setIsPlaying(true)}
              // Cuando la cancion esta en play hace eso ˆ
    
    
              onPause={()=> setIsPlaying(false)}
              // En pausa hace eso ˆ
    
    
              loop={loopActive}
              // Esto es paara activar el loop mediante el boton de loop que tiene el player
    
              onTimeUpdate={timeUpdate}
            />
          )
        }        
        <div className={styles.div}>
        <div className={`whenPlayerHide ${playerHidden && "active"}`} onClick={()=> setPlayerHidden(false)}>
          <i className="fa-solid fa-headphones fa-2xl"></i>
        </div>
        <div className='w-30'>
          <div className={styles.left}>
            <div className='position-relative'>
              {
                usersId.member ? (
                  <img src={memberSongDetails.img} alt="abc" />
                  ):(
                  <img src={songDetails.img} alt="abc" />
                )
              }
              <div className={styles.close} onClick={()=> setPlayerOpen(false)}>
                <i className="fa-solid fa-xmark fa-lg"></i>
              </div>
            </div>
              {
                usersId.member ? (
                  <div className='d-flex flex-column align-items-start mx-3 flex-grow-1' style={{gap:"3px"}}>
                    <span style={{color:"whitesmoke", fontSize:"14px"}}>{memberSongDetails.song?.length > 29 ? memberSongDetails.song.slice(0, 28) + "…" : memberSongDetails.song}</span>
                    <span style={{color:"#777777", fontSize:"12px"}}>{memberSongDetails.artist?.toString().replaceAll(",", "").length > 37 ? memberSongDetails.artist.toString().replaceAll(",", "").slice(0, 36) + "…" : memberSongDetails.artist}</span>  
                  </div>
                ):(
                  <div className='d-flex flex-column align-items-start mx-3 flex-grow-1' style={{gap:"3px"}}>
                    <span style={{color:"whitesmoke", fontSize:"14px"}}>{songDetails.song?.length > 29 ? songDetails.song.slice(0, 28) + "…" : songDetails.song}</span>
                    <span style={{color:"#777777", fontSize:"12px"}}>{songDetails.artist?.toString().replaceAll(",", "").length > 37 ? songDetails.artist.toString().replaceAll(",", "").slice(0, 36) + "…" : songDetails.artist}</span>  
                  </div>
                )
              }
            <div className='d-flex align-items-center'>
              {
                  usersId.member ? (
                    <div>
                      {userFavs.includes(memberSongDetails.id) ? (
                        <i className="fa-solid fa-heart me-2" data-id="remove" style={{color: "#E1402E"}} onClick={handleAddFav}></i>
                      ):(
                          <i className="fa-regular fa-heart me-2" data-id="add" style={{color: "whitesmoke"}} onClick={handleAddFav}></i>
                      )}
                    </div>
                  ):(
                    <div>
                      {userFavs.includes(songDetails.id) ? (
                        <i className="fa-solid fa-heart me-2" data-id="remove" style={{color: "#E1402E"}} onClick={handleAddFav}></i>
                      ):(
                          <i className="fa-regular fa-heart me-2" data-id="add" style={{color: "whitesmoke"}} onClick={handleAddFav}></i>
                      )}
                    </div>
                  )
              }
              <i className="fa-solid fa-minimize fa-sm" style={{color:"whitesmoke"}} onClick={()=> setPlayerHidden(true)}></i>
            </div>
          </div>
        </div>
          <div className={styles.middle}>
            <div className={styles.middleTop}>
              <i className="fa-solid fa-shuffle fa-lg" style={{color: shuffleActive ? "white" : "#777777"}} onClick={()=> setShuffleActive(!shuffleActive)}></i>
              {
                usersId.member ? (
                  <i className="fa-solid fa-backward-step fa-lg" onClick={handlePrevSongMembers}></i>
                ):(
                  <i className="fa-solid fa-backward-step fa-lg" onClick={handlePrevSong}></i>
                )
              }
              <div className={styles.play}>
                <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play ms-1"}`} onClick={tooglePlayPause}></i>
              </div>
              {
                usersId.member ? (
                  <i className="fa-solid fa-forward-step fa-lg" onClick={handleNextSongMembers}></i>
                ):(
                  <i className="fa-solid fa-forward-step fa-lg" onClick={handleNextSong}></i>
                )
              }
              <i className="fa-solid fa-rotate-right fa-lg" style={{color: loopActive ? "white" : "#777777"}} onClick={()=> setLoopActive(!loopActive)}></i>
            </div>
            <div className={styles.middleBottom}>
                <span>{currentTime}</span>
                <div className='d-flex justify-content-center flex-grow-1' >
                  <input style={{width:"90%"}} type="range" defaultValue={0} min={0} max={totalTime} value={progressTime} onChange={(e)=> refAudio.current.currentTime = e.target.value} />
                </div>
                <span>{duration}</span>
            </div>
          </div>
          <div className={styles.right}>
            
            <div>
              <i className={`fa-solid fa-lg ${muted ? "fa-volume-xmark" : "fa-volume-high"}`} onClick={toogleMute}></i>
            </div>
            <div>
              <input type="range" defaultValue={80} min={0} max={100} onChange={handleVolume} />
            </div>
          </div>
        </div>
      </article>
   );
}
 
export default PlayModal;