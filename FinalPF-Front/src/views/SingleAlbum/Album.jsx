import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./Album.module.css"
import { PlaylistContext } from '../../contexts/playlistContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAlbums } from '../../redux/Actions/AlbumsActions';
import { getSpotifyToken } from '../../spotifyHandler/spotify';
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";    
import { addToFav, favsUser, removeFromFav } from '../../redux/Actions/UsersActions';
import { TailSpin } from 'react-loader-spinner';

const SingleAlbum = () => {

  const refToast = useRef();

  const dispatch = useDispatch();
  const data = useContext(PlaylistContext);
  const { setPlayerOpen, setOpenAddToPlaylist } = data;
  const navigate = useNavigate();

  const state = useSelector(state => state);
  const { albums, userFavs, usersId } = state;
  const { id } = useParams();

  const [playlistData, setPlaylistData] = useState([]);
  const [dataWithPreview, setDataWithPreview] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);

  const [artistImg, setArtistImg] = useState(null);
  const [albumRelease, setAlbumRelease] = useState(null);
  const [albumDuration, setAlbumDuration] = useState(0);

  const handlePlayRandom = () =>{

    if(usersId.member){
      // IF MEMBER
      let randomNumber = Math.floor(Math.random() * playlistData[0].tracks.length);

    setPlayerOpen({albumType:"album", id: playlistData[0].tracks[randomNumber].id, originalIndex: playlistData[0].tracks[randomNumber].location, originalData: playlistData[0].tracks, audioFull: playlistData[0].tracks[randomNumber].trackFull, img: playlistData[0].image, song: playlistData[0].tracks[randomNumber].trackName, artist: playlistData[0].tracks[randomNumber].artists.map((artist, index) => {
      if(index === playlistData[0].tracks[randomNumber].artists.length - 1){
        return artist.name
      }else{
        return artist.name + " • "
      }
    })});
    }else{
      let songsWithPreview = [];
      playlistData[0].tracks.map(el => {
        if(el.trackPreview){
          songsWithPreview.push({...el, image: {url: playlistData[0].image}});
        }
      });
      let randomNumber = Math.floor(Math.random() * songsWithPreview.length);
      
      if(songsWithPreview.length > 0){
        
        setPlayerOpen({id: playlistData[0].tracks[randomNumber].id, albumType:"album", data: songsWithPreview, index: randomNumber, audio: songsWithPreview[randomNumber].trackPreview, img: playlistData[0].image, song: songsWithPreview[randomNumber].trackName, artist: songsWithPreview[randomNumber].artists.map((artist, index) => {
          if(index === songsWithPreview[randomNumber].artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        })});
      }else{
        refToast.current.show({sticky: true, severity: 'info', summary: "We're sorry!", detail: "This album is only available for Members!"});
      }
    }
    
  };

  const handleOpenPlayer = (el, index, findTrack) =>{
    if(usersId.member){
      if(el.trackFull){
        setPlayerOpen({albumType:"album", id: el.id, originalData: playlistData[0].tracks, data: dataWithPreview, originalIndex: index, audio: el.trackPreview, audioFull: el.trackFull, img: playlistData[0]?.image, song: el.trackName, artist: el.artists.map((artist, index) => {
          if(index === el.artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        }) })
      }else{
        refToast.current.show({sticky: true, severity: 'info', summary: "We're sorry!", detail: "This song is not currently available!"});
      }
    }else{
      if(el.trackPreview){
        setPlayerOpen({albumType:"album", id: el.id, originalData: playlistData[0].tracks, data: dataWithPreview, originalIndex: index, index: findTrack[0].location, audio: el.trackPreview, img: playlistData[0]?.image, song: el.trackName, artist: el.artists.map((artist, index) => {
          if(index === el.artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        }) })
      }else{
        // Si no tiene preview la cancion, sale la alerta
        refToast.current.show({sticky: true, severity: 'info', summary: "We're sorry!", detail: "This song's preview is not available!"});
      }
    }
  }

  const millisecondsToMinutesSeconds = (milliseconds) =>{
    // Convert milliseconds to seconds
    const totalSeconds = Math.floor(milliseconds / 1000);
  
    // Calculate minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
  
    return `${minutes} min, ${seconds} sec`;
  };

  const handleAddFav = (e) =>{
    // setInFavs(!inFavs);
    if(usersId.id){
      dispatch(favsUser(usersId?.id, playlistData[0]?.albumId));
      if(e.target.dataset.id === "add"){
          dispatch(addToFav(playlistData[0]?.albumId));
      }else{
          dispatch(removeFromFav(playlistData[0]?.albumId))
      }
    }else{
      return refToast.current.show({sticky: true, severity: 'info', summary: "We're sorry!", detail: "Please login to access this functionality!"});
    }
};

const handleAddFavRows = (e, id) =>{
  // setInFavs(!inFavs);
  if(usersId.id){
    dispatch(favsUser(usersId?.id, id));
    if(e.target.dataset.id === "add"){
        dispatch(addToFav(id));
    }else{
        dispatch(removeFromFav(id))
    }
  }else{
    return refToast.current.show({sticky: true, severity: 'info', summary: "We're sorry!", detail: "Please login to access this functionality!"});
  }
};


  useEffect(() => {
    dispatch(getAlbums())
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    
    if(albums.length){
      setPageLoading(false);
      let findPlaylist = albums.filter(el => el.id.toString() === id);
      
      setPlaylistData(findPlaylist);
      
      // Esto de abajo es porque hay algunas canciones sin preview, entonces filtro 
      // para pasarle al player solo las canciones con preview, para que skipee las que no tienen
      let songsWithPreview = [];
      findPlaylist[0].tracks.map(el => {
        if(el.trackPreview){
          songsWithPreview.push({...el, image: {url: findPlaylist[0].image}});
        }
      });
  
      // ESTO NOS SIRVE PARA EL REPRODUCTOR
      // PARA SKIPEAR LAS CANCIONES SIN PREVIEW TRACK
      songsWithPreview.map((el, index) => {
        el.location = index;
      });
  
      
      setDataWithPreview(songsWithPreview);
    }
  }, [id, albums]);

  useEffect(() => {

    if(playlistData.length){
      getSpotifyToken()
      .then(token => {
        let artParams = {
          "Authorization":`Bearer ${token}`,
          "Content-type":"application/json"
        };

        // Con este fetch obtenemos la imagen del artista al que pertence el album.
        fetch(`https://api.spotify.com/v1/artists/${playlistData[0].artists[0].id}`, {
          method:"GET",
          headers: artParams
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => setArtistImg(json.images[0].url));
        

        // Con este fetch obtenemos la fecha del release_date de los albums.
        fetch(`https://api.spotify.com/v1/albums/${playlistData[0].albumId}`, {
          method:"GET",
          headers: artParams
        })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => setAlbumRelease(json.release_date.split("-")[0]));
        

        // Los track de albums, vienen si la duration del track, con este fetch lo obtenemos.
        let total = 0;
        playlistData[0].tracks.map(el => {
          fetch(`https://api.spotify.com/v1/tracks/${el.id}`, {
            method:"GET",
            headers: artParams
          })
          .then(res => res.ok ? res.json() : Promise.reject(res))
          .then(json => {
            total += json.duration_ms;
          })
          .finally(()=> setAlbumDuration(total))
        });

        
      })
      
    }
  }, [playlistData]);

  return ( 
    <div>
      {
        pageLoading ? (
          <div className={styles.loading}>
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
        ):(
          <div className={styles.wrapper}>
            <Toast ref={refToast} position='top-left' style={{}}></Toast>
            <div className={styles.top}>
              <div className={styles.goBack} onClick={()=> navigate(-1)}>
                <i className="fa-solid fa-arrow-left fa-xl"></i>
              </div>
              <div className={styles.img}>
                <img src={playlistData[0]?.image} alt="abc" />
              </div>
              <div className={styles.details}>
                <span>Album</span>
                <h1>{playlistData[0]?.name}</h1>
                <div className={styles.bottom}>
                  <div className='me-2'>
                    <img src={artistImg && artistImg} alt="" />
                  </div>
                  <span>{playlistData[0]?.artists[0]?.name} •&nbsp;</span>
                  <span> {albumRelease && albumRelease} •&nbsp;</span>
                  <span> {playlistData[0]?.tracks.length} songs •&nbsp;</span>
                  <span>{millisecondsToMinutesSeconds(albumDuration)}</span>
                </div>
                
              </div>
            </div>
            <div className={styles.down}>
              <div className='d-flex align-items-start justify-content-start pb-4'>
                <div className={styles.icons}>
                  <div className={styles.play} onClick={handlePlayRandom}>
                    <i className="fa-solid fa-shuffle fa-2xl"></i>
                  </div>
                  <div className={styles.fav}>
                    {
                        userFavs.includes(playlistData[0]?.albumId) ? (
                            <i className="fa-solid fa-heart" data-id="remove" style={{color: "#E1402E"}} onClick={handleAddFav}></i>
                        ):(
                            <i className="fa-solid fa-heart" data-id="add" style={{color: "whitesmoke"}} onClick={handleAddFav}></i>
                        )
                    }
                  </div>
                </div>
              </div>
              <table  className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                    {
                      playlistData[0]?.tracks.map((el, index) =>{
                        let findTrack = dataWithPreview.filter(track => track.trackName === el.trackName); 
      
                        return(
                          <tr key={index}>
                            <td style={{color:"#777777"}}>{index + 1}</td>
                            <td className={styles.tableTitle} onClick={(e)=> handleOpenPlayer(el, index, findTrack)}>
                              <div>
                                <img src={playlistData[0].image} alt="abc" />
                              </div>
                              <div>
                                <span>{el.trackName}</span>
                                <span>{el.artists.map((artist, index) => {
                                    if(index === el.artists.length - 1){
                                      return artist.name
                                    }else{
                                      return artist.name + " • "
                                    }
                                  })}
                                </span>
                              </div>
                            </td>
                            <td style={{color:"#777777"}}>
                              <div className='d-flex align-items-center justify-content-end gap-20'>
                                {
                                    userFavs.includes(el.id) ? (
                                        <i className="fa-solid fa-heart p-2" data-id="remove" onClick={(e)=> handleAddFavRows(e, el.id)}></i>
                                    ):(
                                        <i className="fa-regular fa-heart p-2" data-id="add" onClick={(e)=> handleAddFavRows(e, el.id)}></i>
                                    )
                                }
                                
                                <i className="fa-solid fa-list-ul p-2" onClick={()=> setOpenAddToPlaylist({audioPreview: el.trackPreview, songId: el.id, audioFull: el.trackFull, artists: el.artists, name: el.trackName, image: playlistData[0].image})}></i>
                              
                              </div>
                            </td>
                          </tr>
                        )
                      })
                    }
                </tbody>
              </table>
            </div>
          </div>
        )
      }
    </div>
   );
}
 
export default SingleAlbum;