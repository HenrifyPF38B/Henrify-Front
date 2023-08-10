import React, {useContext, useEffect, useRef, useState} from 'react'
import styles from "./playlistModal.module.css";
import { PlaylistContext } from '../contexts/playlistContext';
import { useSelector } from "react-redux";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 

const PlaylistModal = () => {

    const refAudio = useRef();
    const refToast = useRef();
    const dataContext = useContext(PlaylistContext);
    const { setModalOpen, modalOpen, setBuyOpen } = dataContext;
    const state = useSelector(state => state);
    const { playlists, albums, usersId } = state;
    const [playing, setPlaying] = useState(false);


    const [data, setData] = useState([]);

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
        if(data[0].owner === "Soul Life"){
            if(!el.trackPreview){
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

    const closeArticle = () =>{
        setModalOpen(false);
        setPlaying({
            audio: "",
            id: 0,
            playing: false
        });
    };


    useEffect(() => {
        if(modalOpen){
            if(modalOpen.type === "album"){
                let findAlbum = albums.filter(el => el.id === modalOpen.id);
                setData(findAlbum);
            }else{
                let findPlaylist = playlists.filter(el => el.id === modalOpen.id);
                setData(findPlaylist);
                console.log(findPlaylist);
            }
        };
    }, [modalOpen]);



    return ( 
        <article className={styles.playlistModalArticle} onClick={closeArticle}>
            <div onClick={(e)=> e.stopPropagation()}>
                <Toast ref={refToast} position='bottom-left'></Toast>
            </div>
            {
            playing && 
                <audio ref={refAudio} loop={true}>
                    <source src={playing?.audio}/>
                </audio>
            }
            <div className={styles.playlistModalDiv} onClick={(e)=> e.stopPropagation()}>
                {/* Only for members alert */}
               
                
                <div className={styles.albumCover}>
                    <img src={data[0]?.image || data[0]?.images } alt="" />
                </div>
                <div className='d-flex justify-content-center w-100'>
                    <div className={styles.tracks}>
                        <div className='d-flex align-items-center justify-content-center'>
                            <h2 className={styles.playlistTitle}>{data[0]?.name}</h2>
                        </div>
                        <div style={{padding: "1rem 1.7rem"}}>
                            {
                                data[0]?.tracks?.map((el, index) => {
                                    console.log(el);
                                    return(
                                        <div className={styles.playlistModalCard}>
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
                                            <div className={styles.playlistModalDetails} style={{borderBottom: data[0]?.tracks.length !== index + 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                                                <div className={styles.playDiv}>
                                                    <img src={modalOpen.type === "album" ? (data[0]?.image || data[0]?.images) : el.image.url ? el.image.url : el.image} alt="abc" />
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
                </div>
            </div>
        </article> 
     );
}
 
export default PlaylistModal;