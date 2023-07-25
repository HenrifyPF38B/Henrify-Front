import React, { useContext, useEffect, useState } from 'react'
import styles from "./Playlist.module.css"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PlaylistContext } from '../../contexts/playlistContext';
import { useSelector } from 'react-redux';


const Playlist = () => {

  

  const data = useContext(PlaylistContext);
  const { setPlayerOpen } = data;
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { playlists } = state;
  const { id } = useParams();

  const [playlistData, setPlaylistData] = useState([]);
  const [dataWithPreview, setDataWithPreview] = useState([]);

  const handlePlayRandom = () =>{
    // SI NO ES MEMBER
    let songsWithPreview = [];
    playlistData[0].tracks.map(el => {
      if(el.trackPreview){
        songsWithPreview.push(el);
      }
    });
    let randomNumber = Math.floor(Math.random() * songsWithPreview.length);
    setPlayerOpen({data: songsWithPreview, index: randomNumber, audio: songsWithPreview[randomNumber].trackPreview, img: songsWithPreview[randomNumber].image.url, song: songsWithPreview[randomNumber].trackName, artist: songsWithPreview[randomNumber].artists.map((artist, index) => {
      if(index === songsWithPreview[randomNumber].artists.length - 1){
        return artist.name
      }else{
        return artist.name + " • "
      }
    })});

    // IF MEMBER
    /*
    setPlayerOpen({data: playlistData[0].tracks, audio: playlistData[0].tracks[randomNumber].trackFull, img: playlistData[0].tracks[randomNumber].image.url, song: playlistData[0].tracks[randomNumber].trackName, artist: playlistData[0].tracks[randomNumber].artists.map((artist, index) => {
      if(index === playlistData[0].tracks[randomNumber].artists.length - 1){
        return artist.name
      }else{
        return artist.name + " • "
      }
    })});
    */
  };


  useEffect(() => {
    window.scrollTo(0, 0);

  }, []);

  useEffect(() => {
    
    let findPlaylist = playlists.filter(el => el.id === id);
    
    setPlaylistData(findPlaylist);

    let songsWithPreview = [];
    findPlaylist[0].tracks.map(el => {
      if(el.trackPreview){
        songsWithPreview.push(el);
      }
    });

    // ESTO NOS SIRVE PARA EL REPRODUCTOR
    // PARA SKIPEAR LAS CANCIONES SIN PREVIEW TRACK
    songsWithPreview.map((el, index) => {
      el.location = index;
    });

    
    setDataWithPreview(songsWithPreview);

  }, [id]);

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.goBack} onClick={()=> navigate(-1)}>
          <i className="fa-solid fa-arrow-left fa-xl"></i>
        </div>
        <div className={styles.img}>
          <img src={playlistData[0]?.image} alt="abc" />
        </div>
        <div className={styles.details}>
          <span>Playlist</span>
          <h1>{playlistData[0]?.name}</h1>
          <div className={styles.icons}>
            <div className={styles.play} onClick={handlePlayRandom}>
              <i className="fa-solid fa-shuffle fa-2xl"></i>
            </div>
            <div className={styles.fav}>
              <i className="fa-solid fa-heart" style={{color:"whitesmoke"}}></i>
              {/* <i className="fa-regular fa-heart" style={{color:"whitesmoke"}}></i> */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.down}>
        <table  className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th><i className="fa-regular fa-clock"></i></th>
            </tr>
          </thead>
          <tbody>
              {
                playlistData.length && playlistData[0].tracks.map((el, index) =>{
                  // El modal tiene reproduccion automatica, es decir reproduce la cancion siguiente.
                  // Pero hay canciones que no tienen previewTrack. El problema era que activamos  el modal  del player
                  // pasandole la informacion de la track al modal mediante playerOpen al hacer click en una tr.
                  // Pero necesitaba pasarle el mismo index que tiene el array filtradao con sololas canciones que tienen preview (dataWithPreview)
                  // Por eso mediante findTrack, le paso a playerOpen, la posicion que el track tendria en el array con solo tracks con previewTrack.
                  let findTrack = dataWithPreview.filter(track => track.trackName === el.trackName); 
                  
                  return(
                    <tr key={index}>
                      <td style={{color:"#777777"}}>{index + 1}</td>
                      <td className={styles.tableTitle} onClick={()=> setPlayerOpen({originalData: playlistData[0].tracks, data: dataWithPreview, originalIndex: index, index: findTrack[0].location, audio: el.trackPreview, img: el.image.url, song: el.trackName, artist: el.artists.map((artist, index) => {
                        if(index === el.artists.length - 1){
                          return artist.name
                        }else{
                          return artist.name + " • "
                        }
                      }) })}>
                        <div>
                          <img src={el.image.url} alt="abc" />
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
                          <i className="fa-solid fa-heart p-2" onClick={(e)=> e.stopPropagation()}></i>
                          <div className="dropdown playlist">
                            <i className="fa-solid fa-list-ul p-2" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                            <div class="dropdown-menu mt-2 me-5" aria-labelledby="dropdownMenuButton">
                                <div className="dropdown-item">
                                  <input type="checkbox" id='1'/>
                                  <label htmlFor="1">Gym Playlist</label>
                                </div>
                                <div className="dropdown-item">
                                  <input type="checkbox" id='2'/>
                                  <label htmlFor="2">Party Playlist</label>
                                </div>
                                <div className="dropdown-item">
                                  <input type="checkbox" id='2'/>
                                  <label htmlFor="2">Study Playlist</label>
                                </div>
                            </div>
                          </div>
                          <span>3:07</span>
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
   );
}
 
export default Playlist;