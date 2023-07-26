import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./playModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext';

const PlayModal = () => {

  const dataContext = useContext(PlaylistContext);
  const { playerOpen, setPlayerOpen, playerHidden, setPlayerHidden } = dataContext;
  const { originalData, data, originalIndex, index, audio, img, song, artist } = playerOpen;
  const refAudio = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [loopActive, setLoopActive] = useState(false);
  const [shuffleActive, setShuffleActive] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [memberSongDetails, setMemberSongDetails] = useState({originalIndex, audio, img, song, artist});
  const [songDetails, setSongDetails] = useState({index, audio, img, song, artist});
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
      refAudio.current.volume = 0.2;
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
      index, audio, img, song, artist
    });
    setTimeout(()=>{
      refAudio.current.play();
    },200)
  }, [index, audio, img, song, artist]);


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
    if(!loopActive && shuffleActive){
      let randomNumber = Math.floor(Math.random() * data.length);

      setSongDetails({
        index: data[randomNumber].index,
        audio: data[randomNumber].trackPreview,
        img: data[randomNumber].image.url,
        song: data[randomNumber].trackName,
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
    if(!loopActive && !shuffleActive){
      if(data[songDetails.index + 1]){
        // Significa que existe una cancion despues de la actual
        setSongDetails({
          index: songDetails.index + 1,
          audio: data[songDetails.index + 1].trackPreview,
          img: data[songDetails.index + 1].image.url,
          song: data[songDetails.index + 1].trackName,
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
          audio: data[0].trackPreview,
          img: data[0].image.url,
          song: data[0].trackName,
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

    if(originalData[memberSongDetails].originalIndex + 1){
      // SI HAY UNA CANCION DESPUES DE LA ACTUAL REPRODUCE LA SIGUIENTE
       
      // Si no esta el loop activado y el modo aleatorio tambien:
      if(!loopActive && !shuffleActive){
        setMemberSongDetails({
          index: memberSongDetails.index + 1,
          audio: originalData[songDetails.index + 1].trackFull,
          img: originalData[songDetails.index + 1].image.url,
          song: originalData[songDetails.index + 1].trackName,
          artist: originalData[songDetails.index + 1].artists.map((artist, index) => {
            if(index === originalData[songDetails.index + 1].artists.length - 1){
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

      // Si el loop esta desactivado y el aleatorio activado
      if(!loopActive && shuffleActive){
        let randomNumber = Math.floor(Math.random() * originalData.length);

        setMemberSongDetails({
          index: originalData[randomNumber].index,
          audio: originalData[randomNumber].trackFull,
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

      // Por defecto, si el loop esta activado ignora cualquier codigo y reinicia la cancion


    }else{
      // SI NO HAY UNA CANCION DESPUES, VUELVE AL PRINCIPIO
      setSongDetails({
        index: originalData[0].index,
        audio: originalData[0].trackPreview,
        img: originalData[0].image.url,
        song: originalData[0].trackName,
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
    }
  };

  // NEXT & PREV FOR NON MEMBERS
  const handleNextSong = () =>{
    // Si esta en modo aleatorio al clickear el boton:
    if(!loopActive && shuffleActive){
      let Y = Math.floor(Math.random() * data.length);
      
      setSongDetails({
        index: Y,
        audio: data[Y].trackPreview,
        img: data[Y].image.url,
        song: data[Y].trackName,
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
    if(!loopActive && !shuffleActive){
      if(data[songDetails.index + 1]){
        // Si hay una cancion despues de la actual:
        let Y = songDetails.index + 1;
        setSongDetails({
          index: Y,
          audio: data[Y].trackPreview,
          img: data[Y].image.url,
          song: data[Y].trackName,
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
          audio: data[0].trackPreview,
          img: data[0].image.url,
          song: data[0].trackName,
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
  
  };

  const handlePrevSong = () =>{

    if(!loopActive && shuffleActive){
      let Y = Math.floor(Math.random() * data.length);
      
      setSongDetails({
        index: Y,
        audio: data[Y].trackPreview,
        img: data[Y].image.url,
        song: data[Y].trackName,
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

    if(!loopActive && !shuffleActive){
      if(data[songDetails.index - 1]){
        // Si hay una cancion en la posicion anterior a la actual:
        let Y = songDetails.index - 1;
        setSongDetails({
          index: Y,
          audio: data[Y].trackPreview,
          img: data[Y].image.url,
          song: data[Y].trackName,
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
          audio: data[Y].trackPreview,
          img: data[Y].image.url,
          song: data[Y].trackName,
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
  };

  return ( 
      <article className={`playerArticle ${playerHidden ? "hide"  : ""}`}>
        {/* Renderizar una etiqueta audio para members, y otra para no members. */}
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
        <div className={styles.div}>
        <div className={`whenPlayerHide ${playerHidden && "active"}`} onClick={()=> setPlayerHidden(false)}>
          <i className="fa-solid fa-headphones fa-2xl"></i>
        </div>
        <div className='w-30'>
          <div className={styles.left}>
            <div className='position-relative'>
              <img src={songDetails.img} alt="abc" />
              <div className={styles.close} onClick={()=> setPlayerOpen(false)}>
                <i className="fa-solid fa-xmark fa-lg"></i>
              </div>
            </div>
            <div className='d-flex flex-column align-items-start mx-3 flex-grow-1' style={{gap:"3px"}}>
              <span style={{color:"whitesmoke", fontSize:"14px"}}>{songDetails.song?.length > 29 ? songDetails.song.slice(0, 28) + "…" : songDetails.song}</span>
              <span style={{color:"#777777", fontSize:"12px"}}>{songDetails.artist?.toString().replaceAll(",", "").length > 37 ? songDetails.artist.toString().replaceAll(",", "").slice(0, 36) + "…" : songDetails.artist}</span>
            </div>
            <div className='d-flex align-items-center'>
              <i className="fa-regular fa-heart me-2 fa-lg" style={{color:"whitesmoke"}}></i>
              <i className="fa-solid fa-minimize" style={{color:"whitesmoke"}} onClick={()=> setPlayerHidden(true)}></i>
            </div>
          </div>
        </div>
          <div className={styles.middle}>
            <div className={styles.middleTop}>
              <i className="fa-solid fa-shuffle fa-lg" style={{color: shuffleActive ? "white" : "#777777"}} onClick={()=> setShuffleActive(!shuffleActive)}></i>
              <i className="fa-solid fa-backward-step fa-lg" onClick={handlePrevSong}></i>
              <div className={styles.play}>
                <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play ms-1"}`} onClick={tooglePlayPause}></i>
              </div>
              <i className="fa-solid fa-forward-step fa-lg" onClick={handleNextSong}></i>
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
              <i className="fa-solid fa-ellipsis-vertical fa-lg"></i>
            </div>
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