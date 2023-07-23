import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./playModal.module.css"
import { PlaylistContext } from '../contexts/playlistContext';

const PlayModal = () => {

  const data = useContext(PlaylistContext);
  const { playerOpen, setPlayerOpen } = data;
  const refAudio = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [loopActive, setLoopActive] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  
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

  return ( 
    <article className={styles.article}>
      <audio 
        ref={refAudio} 
        src={playerOpen} 
        preload='metadata'
        onDurationChange={(e)=> {setDuration(formatTime(e.currentTarget.duration)) ; setTotalTime(e.currentTarget.duration)}}
        onPlay={()=> setIsPlaying(true)}
        onPause={()=> setIsPlaying(false)}
        loop={loopActive}
        onTimeUpdate={timeUpdate}
      />
      <div className={styles.div}>

        <div className={styles.left}>
          <div className='position-relative'>
            <img src="/images/lil.jpeg" alt="abc" />
            <div className={styles.close} onClick={()=> setPlayerOpen(false)}>
              <i className="fa-solid fa-xmark fa-lg"></i>
            </div>
          </div>
          <div className='d-flex flex-column align-items-start mx-3' style={{gap:"3px"}}>
            <span style={{color:"whitesmoke", fontSize:"14px"}}>What's Poppin</span>
            <span style={{color:"#777777", fontSize:"12px"}}>Jack Harlow</span>
          </div>
          <div className='d-flex align-items-center'>
            <i className="fa-regular fa-heart me-2 fa-lg" style={{color:"whitesmoke"}}></i>
            <i className="fa-solid fa-minimize" style={{color:"whitesmoke"}}></i>
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.middleTop}>
            <i className="fa-solid fa-shuffle fa-lg"></i>
            <i className="fa-solid fa-backward-step fa-lg"></i>
            <div className={styles.play}>
              <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play ms-1"}`} onClick={tooglePlayPause}></i>
            </div>
            <i className="fa-solid fa-forward-step fa-lg"></i>
            <i className="fa-solid fa-rotate-right fa-lg" style={{color: loopActive ? "white" : "#777777"}} onClick={()=> setLoopActive(!loopActive)}></i>
          </div>
          <div className={styles.middleBottom}>
              <span>{currentTime}</span>
              <div>
                <input type="range" defaultValue={0} min={0} max={totalTime} value={progressTime} />
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