import style from "./Create.module.css";
import camera from "../../components/assets/camera.svg";
import close from "../../components/assets/remove.svg";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import back from "../../components/assets/back.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import song from "../../components/assets/ari.jpeg";
import add from "../../components/assets/add.svg";
import playlist from "../../components/assets/about2.png";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSongs,
  filterSongs,
  getSongs,
} from "../../redux/Actions/SongsActions";
import { Typeahead } from "react-bootstrap-typeahead";
import { createUserPlaylist, favsUser } from "../../redux/Actions/UsersActions";
import SongCard from "../../components/Cards/songCard";
import SongsPlaylist from "../../components/Cards/UserPlaylist/songsPlaylist";
import Pagination from "../../components/Pagination/Pagination";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 
import { resetFilteredSongs, resetMessageState } from "../../redux/Actions/StateActions";
import { ImageModal } from "../../modals/createModal";
import img1 from "../../components/assets/img1.jpg";
import img2 from "../../components/assets/img2.jpg";
import img3 from "../../components/assets/img3.jpg";
import img4 from "../../components/assets/img4.jpg";
import img5 from "../../components/assets/img5.jpg";
import img6 from "../../components/assets/img6.jpg";
import img7 from "../../components/assets/img7.jpg";
import img8 from "../../components/assets/img8.jpg";
import img9 from "../../components/assets/img9.jpg";
import img10 from "../../components/assets/imgX.jpg";
import img11 from "../../components/assets/imgA.jpg";
import img12 from "../../components/assets/imgB.jpg";
import img13 from "../../components/assets/imgC.jpg";
import img14 from "../../components/assets/imgD.jpg";
import img15 from "../../components/assets/imgE.jpg";
import img16 from "../../components/assets/imgF.jpg";
import img17 from "../../components/assets/imgG.jpg";
import img18 from "../../components/assets/imgH.jpg";
import img19 from "../../components/assets/imgI.jpg";
import img20 from "../../components/assets/imgJ.jpg";
import Swal from 'sweetalert2'
import '@sweetalert2/themes/dark/dark.css';
import { editPSongsState } from "../../redux/Actions/PlaylistsActions";


const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
  img11, img12, img13, img14, img15, img16, img17, img18, img19, img20];




const Create = () => {

  const refSearchBar = useRef();
  const refAudio = useRef();
  const refToast = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { songs, filteredSongs, userFavs, usersId, message, editPlaylistSongs } = state;

  const [optionsSearch, setOptionsSearch] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [randomSongs, setRandomSongs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [input, setInput] = useState("");
  const [playing, setPlaying] = useState(false);
  const [sortedSongs, setSortedSongs] = useState([]);

  // Modal States
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpenCam, setIsModalOpenCam] = useState(false);
  const [selectedImageParsed, setSelectedImageParsed] = useState("");

  // Title States
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  //**************SONGS - RANDOM **********/

  useEffect(() => {
    if (songs.length > 0) {
      let shuffledSongs = songs.sort(() => 0.5 - Math.random());
      let selectedRandomSongs = shuffledSongs.slice(0, 4);
      setRandomSongs(selectedRandomSongs);
      let sortedSongs = songs.sort(function (a, b) {
        return ('' + a.name).localeCompare(b.name);
      });
  
      setSortedSongs(sortedSongs);
    }
  }, [songs]);

  useEffect(() => {
    console.log(songs);
    let options = [];
    songs.map((el, index) => {
      options.push({
        id: el.id,
        label: el.artists[0].name + " • " + el.name,
        name: el.name,
        audioPreview: el.audioPreview,
        audioFull: el.audioFull,
        image: el.image,
        artists: el.artists,
        songId: el.songId,
        popularity: el.popularity,
        explicit: el.explicit,
      });
    });
    setOptionsSearch(options);
  }, [songs]);

  useEffect(() => {
    console.log(selectedSongs);
  }, [selectedSongs]);

  const handleAddToPlaylist = (song) => {
    
    if (selectedSongs.length < 20) {
      if (!selectedSongs.some((selected) => selected.id === song.id)) {
        setSelectedSongs((prevSongs) => [...prevSongs, song]);
      }
    } else {
      if (!selectedSongs.some((selected) => selected.id === song.id)) {
        setIsModalOpen(true);
      }
    }
  };

  const handleRemoveSong = (songId) => {
    setSelectedSongs((prevSongs) =>
      prevSongs.filter((selected) => selected.songId !== songId)
    );
  };

  // CREATE PLAYLIST FUNCTINOALITY
  const handleSubmit = (e) => {
    e.preventDefault();
    if(input.length === 0){
      // Alerta
      return refToast.current.show({sticky: true, severity: 'warn', summary: "Wait!", detail: "Please complete all fields!"});
    }else if(selectedSongs.length === 0){
      return refToast.current.show({sticky: true, severity: 'warn', summary: "Wait!", detail: "Please complete all fields!"});
    }else if(selectedImageParsed.length === 0){
      return refToast.current.show({sticky: true, severity: 'warn', summary: "Wait!", detail: "Please complete all fields!"});
    }else if(input.length > 0 && selectedSongs.length > 0 && selectedImageParsed.length > 0){
      // Creamos la playlist
      let newPlaylist = {
        playlistId: `${usersId.id}${input}`,
        type: "playlist",
        owner: `${usersId.userName}`,
        belongsTo: usersId.id,
        tracks: selectedSongs,
        image: `/images/${selectedImageParsed}.jpg`,
        price: 23,
        name: input
      };
      dispatch(createUserPlaylist(newPlaylist));
    
    }
  };
  
  // SEGUN LA RESPUESTA DEL BACK, TIRAMOS UNA ALERTA
  useEffect(() => {
    if(message === "User playlist created"){
      refToast.current.show({life: 3000, severity: 'success', summary: "Great!", detail: "Your Playlist has been created!"});
      dispatch(resetMessageState());
      // dispatch(resetFilteredSongs());
      setTimeout(()=>{
        navigate("/myPlaylist");
      },3100)
    }else if(message === "User playlist already exists"){
      refToast.current.show({life: 3000, severity: 'error', summary: "We're sorry!", detail: "You already have a Playlist with that name"});
      dispatch(resetMessageState());
    };
  }, [message]);


  // TITLE
  const titles = [
    "Create your own playlist!",
    "Choose your favorite songs",
    "Give style to your music",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prevTitleIndex) => (prevTitleIndex + 1) % titles.length);
      setCharIndex(0);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCharIndex((prevCharIndex) => prevCharIndex + 1);
    }, 200);
    return () => clearInterval(timer);
  }, [titleIndex]);


  //********************** PAGINATION SONGS API *********** */

  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 4;

  const nextPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastSelectedSong = currentPage * songsPerPage;
  const indexOfFirstSelectedSong = indexOfLastSelectedSong - songsPerPage;
  const currentSelectedSongs = selectedSongs.slice(
    indexOfFirstSelectedSong,
    indexOfLastSelectedSong
  );
  const lastSelectedSongsPage = Math.ceil(selectedSongs.length / songsPerPage);

  // ************ PAGINATION FAVORITES **********************//
  const [favCurrentPage, setFavCurrentPage] = useState(1);
  const favSongsPerPage = 4;

  const indexOfLastFavSong = favCurrentPage * favSongsPerPage;
  const indexOfFirstFavSong = indexOfLastFavSong - favSongsPerPage;
  const currentFavSongs = userFavs.slice(
    indexOfFirstFavSong,
    indexOfLastFavSong
  );
  const lastFavSongsPage = Math.ceil(userFavs.length / favSongsPerPage);

  const favNextPage = (event) => {
    event.preventDefault();
    setFavCurrentPage((prevPage) => prevPage + 1);
  };

  const favPrevPage = (event) => {
    event.preventDefault();
    setFavCurrentPage((prevPage) => prevPage - 1);
  };


  // HANDLE CAMERA CLICK
  const handleCameraClick = () => {
    setIsModalOpenCam(true);
  };

  // MY PLAYLIST

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
        let filter = selectedSongs.filter(track => track.id !== id);
        setSelectedSongs(filter);
        setPlaying(false);
      }else if(result.isDenied){
        return;
      }
    })
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


// FAVORITES HANDLE TRACK
const handleAddTrack = (el) =>{
  console.log(el);
  setSelectedSongs([
    ...selectedSongs,
    el
  ])
};

// SEARCH
const handleSelected = (el) =>{
  setPlaying(false);
  dispatch(editPSongsState(el));
};

  return (
    <div className={style.container}>
      {
        playing && 
            <audio ref={refAudio} loop={true}>
                <source src={playing?.audio}/>
            </audio>
      }
      <Toast ref={refToast} position='top-left'></Toast>
      <div className={style.backImg} onClick={()=> navigate("/myPlaylist")}>
        <i className="fa-solid fa-caret-left fa-2xl" style={{color:"whitesmoke"}}></i>
      </div>
      <form onSubmit={(e)=> e.preventDefault()} className={style.form}>
        <div className={style.titu}>
          <h2 className={style.title}>{titles[titleIndex].substring(0, charIndex)}</h2>
        </div>
        <div
          className={style.backContainer}
          onClick={() => navigate("/myPlaylist")}
        >
        </div>
        <div className={style.topContainer}>
          <div className={style.containerCamCont}>
            <div className={style.containerCam}>      
              <ImageModal
                images={images}
                className="imgMo"
                isOpen={isModalOpenCam}
                onImageClick={(imageSrc) => {
                  let imgData = imageSrc.split("/")[3].slice(0, 4);
                  setSelectedImage(imageSrc);
                  setSelectedImageParsed(imgData);
                  setIsModalOpenCam(false);
                }}
                onClose={() => setIsModalOpenCam(false)}
              />
              {selectedImage ? (
                <div className="modalCam">
                  <div className="imgModalContainer">
                    <img className="imgModal" src={selectedImage} alt="Selected" />
                  </div>
                  <div className="btnImageModalContainer">
                    <button className="btnImageModal" onClick={() => {setSelectedImage(null) ; setSelectedImageParsed("")}}>
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className={style.camarita}
                  id="camarita"
                  onClick={handleCameraClick}
                >
                  <span className={style.textCamera}>Add photo</span>
                  <img className={style.imgCamera} src={camera} alt="abc" />
                </div>
              )}
              {/* NAME */}
              <div className="myPlaylistInputContainer">
                <input 
                  className="myPlaylistInput"
                  type="text"
                  name="name"
                  placeholder="Name your Playlist..."
                  onChange={(e)=> setInput(e.target.value)}
                  value={input}
                />
              </div>
              <div className={style.createBtn}>
                <button onClick={handleSubmit}>Create Playlist</button>
              </div>
            </div>
          </div>
          <div className={style.playlistInfo}>
              <div className={style.pInfoTitle}>
                <span>{input.length > 0 ? `${input} Tracks` : "Your Playlist Tracks"}</span>
              </div>
              {
                selectedSongs.length > 0 ? (
                  <div className={style.songsContainer}>
                    {
                      selectedSongs.map((el, index) => {
                        return(
                          <div className={style.playlistModalCard}>
                              <div className={style.deleteTrack} onClick={(e)=> handleDeleteTrack(el.id)}>
                                <i className="fa-solid fa-xmark fa-xs"></i>
                              </div>
                              <div className={style.musicPlaying}>
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
                              <div className={style.playlistModalDetails} style={{borderBottom: selectedSongs.length !== index + 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                                  <div className={style.playDiv}>
                                      <img src={el.image} alt="abc" width={40}/>
                                      <div className={style.play}>
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
                  
                ):(
                  <div className={style.empty}>
                    <div className={style.emptyIcon}>
                      <i className='bx bxl-deezer bx-lg'></i>
                    </div>
                    <span>You don't have any tracks yet!</span>
                    <div className={style.createPlaylist} >
                      <button onClick={()=> refSearchBar.current?.scrollIntoView({ behavior: 'smooth' })}>Add Tracks</button>
                    </div>
                  </div>
                )
              }
          </div>
        </div>
        
      </form>
      <div className={style.boxName} ref={refSearchBar}>
        <div className={style.favoritesN}>
            <div className={style.favoritesNTitle}>
              <span>
                Choose Tracks From Your Favorites
              </span>
              {/* <i className="fa-solid fa-heart fa-sm"></i> */}
            </div>
            <div className={style.favoritesNSongs}>
              {
                songs.length > 0 && userFavs.length > 0 ? (
                  userFavs.map((song, index) => {
                    return songs.map(el => {
                      if(el.songId === song){
                        return(
                          <div className={style.playlistModalCard}>
                              {
                                selectedSongs.filter(track => track.id === el.id).length > 0 ? (
                                <div className={style.trackAdded}>
                                  <i className="fa-solid fa-md fa-circle-check"></i>
                                </div>
                                ):(
                                  <div className={style.addTrack} onClick={(e)=> handleAddTrack(el)}>
                                    <i className="fa-solid fa-md fa-circle-plus"></i>
                                  </div>
                                )
                              }
                              <div className={style.musicPlaying}>
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
                              <div className={style.playlistModalDetails} style={{borderBottom: userFavs.length !== index + 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                                  <div className={style.playDiv}>
                                      <img src={el.image} alt="abc" width={40}/>
                                      <div className={style.play}>
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
                      }
                    })
                  })
                ):(
                  <div className={style.emptyFavs}>
                      <i class='bx bxs-heart bx-tada bx-lg'></i>
                      <span>{`Hey ${usersId.userName}, looks like you don't have any tracks in your favorites!`}</span>
                  </div>
                )
              }
            </div>
        </div>
        <div className={style.searchN}>
            <div className={style.searchContainer}>  
              <div className={style.searchBarN} id="create-playlist-typeahead">
                <Typeahead
                  id="pagination-example"
                  placeholder='Search Tracks In Our Library'
                  onChange={(selected) => handleSelected(selected)}
                  options={optionsSearch}
                />
              </div>
            </div>
            <div className={style.songsContainerN}>
            {
                    !editPlaylistSongs.length && sortedSongs.length &&
                    sortedSongs.map((el, index) => {
                      return(
                        <div className={style.playlistModalCard}>
                            {
                              selectedSongs.filter(track => track.id === el.id).length > 0 ? (
                              <div className={style.trackAdded}>
                                <i className="fa-solid fa-md fa-circle-check"></i>
                              </div>
                              ):(
                                <div className={style.addTrack} onClick={(e)=> handleAddTrack(el)}>
                                  <i className="fa-solid fa-md fa-circle-plus"></i>
                                </div>
                              )
                            }
                            <div className={style.musicPlaying}>
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
                            <div className={style.playlistModalDetails} style={{borderBottom: sortedSongs.length !== index + 1 ? "1px solid rgba(0, 0, 0, 0.1)" : "none"}}>
                                <div className={style.playDiv}>
                                    <img src={el.image} alt="abc" width={40}/>
                                    <div className={style.play}>
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
                        <div className={style.playlistModalCard}>
                            {
                              selectedSongs.filter(track => track.id === el.id).length > 0 ? (
                              <div className={style.trackAdded}>
                                <i className="fa-solid fa-md fa-circle-check"></i>
                              </div>
                              ):(
                                <div className={style.addTrack} onClick={(e)=> handleAddTrack(el)}>
                                  <i className="fa-solid fa-md fa-circle-plus"></i>
                                </div>
                              )
                            }
                            <div className={style.musicPlaying}>
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
                            <div className={style.playlistModalDetails} style={{borderBottom:"none"}}>
                                <div className={style.playDiv}>
                                    <img src={el.image} alt="abc" width={40}/>
                                    <div className={style.play}>
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
        {/* <div className={style.favTit}>
          <h3 className={style.title2}>Your favorites songs</h3>
        </div>
        <div className={style.favorites}>
          {currentFavSongs.length > 0 &&
            songs.map((song, index) => {
              if (currentFavSongs.includes(song.songId)) {
                return (
                  <div>
                    <SongCard
                      key={index}
                      artist={song.artists.map((artist, index) => {
                        if (index === song.artists.length - 1) {
                          return artist.name;
                        } else {
                          return artist.name + " • ";
                        }
                      })}
                      song={song.name}
                      songId={song.songId}
                      id={song.id}
                      img={song.image}
                      audio={song.audioPreview}
                      audioFull={song.audioFull}
                      isFavoriteView={true}
                      handleAddToPlaylist={() => handleAddToPlaylist(song)}
                      handleRemoveSong={handleRemoveSong}
                    />
                  </div>
                );
              }
              return null;
            })}
        </div>
        <div className={style.pagFavs}>
          <Pagination
            currentPage={favCurrentPage}
            lastPage={lastFavSongsPage}
            prevPage={favPrevPage}
            nextPage={favNextPage}
          />
        </div>
        <h3 ref={refSearchBar} className={style.title2}>Search by songs...</h3>
        <div className={style.searchSong}>
          <Typeahead
            id="pagination-example"
            placeholder="Select songs"
            onChange={(selected) => {
              if (selected.length > 0) {
                const songSelected = optionsSearch.find(
                  (option) => option.id === selected[0].id
                );
                handleAddToPlaylist(songSelected);
              }
            }}
            options={optionsSearch}
          />
        </div>
        <div className={style.boxSelect}>
          <div className={style.selectedSong}>
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <div className={style.songCard} key={song.id}>
                  <SongsPlaylist
                    key={song.id}
                    artist={song.artists.map((artist, index) => {
                      if (index === song.artists.length - 1) {
                        return artist.name;
                      } else {
                        return artist.name + " • ";
                      }
                    })}
                    song={song.name}
                    songId={song.songId}
                    id={song.id}
                    img={song.image && song.image}
                    audio={song.audioPreview}
                    audioFull={song.audioFull}
                    handleRemoveSong={handleRemoveSong}
                    selectedSongs={selectedSongs}
                    setSelectedSongs={setSelectedSongs}
                    handleAddToPlaylist={() => handleAddToPlaylist(song)}
                  />
                </div>
              ))
            ) : randomSongs.length > 0 ? (
              randomSongs.map((song) => (
                <div className={style.songCard} key={song.id}>
                  <SongsPlaylist
                    artist={song.artists.map((artist, index) => {
                      if (index === song.artists.length - 1) {
                        return artist.name;
                      } else {
                        return artist.name + " • ";
                      }
                    })}
                    song={song.name}
                    songId={song.songId}
                    id={song.id}
                    img={song.image && song.image}
                    audio={song.audioPreview}
                    audioFull={song.audioFull}
                    handleRemoveSong={handleRemoveSong}
                    selectedSongs={selectedSongs}
                    setSelectedSongs={setSelectedSongs}
                    handleAddToPlaylist={() => handleAddToPlaylist(song)}
                  />
                </div>
              ))
            ) : (
              <p>No songs available</p>
            )}
          </div>

        </div> */}
      </div>

      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="modalText">You've reached the limit</span>
            <p className="modalTextt">
              You can't add more than 20 songs to your playlist.
            </p>
            <button className="btnModal" onClick={() => setIsModalOpen(false)}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
