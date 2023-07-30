import React, { useEffect, useState } from 'react'
import styles from "./Favorites.module.css"
import SongCard from '../../components/Cards/songCard';
import { useSelector } from 'react-redux';
import AlbumCard from '../../components/Cards/albumCard';
import PlaylistCard from '../../components/Cards/playlistCard';

const Favorites = () => {

  const [section, setSection] = useState("Playlists");

  const state = useSelector(state => state);
  const { usersId, userFavs, songs, playlists, albums } = state;

  const handleSection = (e) =>{
    if(section !== e.target.dataset.id){
      setSection(e.target.dataset.id)
    }
  };

  let validatePlaylists = [];
  let validateSongs = [];
  let validateAlbums = [];
  

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.left}>
        {/* <div className={section === "All" ? styles.favSectionActive : styles.favSection} data-id="All" onClick={handleSection}>
          <span className='me-5'>All</span>
          <div className={styles.favIcon}>
            <i className="fa-solid fa-caret-down"></i>
          </div>
        </div> */}
        <div className={section === "Playlists" ? styles.favSectionActive : styles.favSection} data-id="Playlists" onClick={handleSection}>
          <span className='me-5' data-id="Playlists">Playlists</span>
          <div className={styles.favIcon} data-id="Playlists">
            <i className="fa-solid fa-caret-down" data-id="Playlists"></i>
          </div>
        </div>
        <div className={section === "Songs" ? styles.favSectionActive : styles.favSection} data-id="Songs" onClick={handleSection}>
          <span className='me-5' data-id="Songs">Songs</span>
          <div className={styles.favIcon} data-id="Songs">
            <i className="fa-solid fa-caret-down" data-id="Songs"></i>
          </div>
        </div>
        <div className={section === "Albums" ? styles.favSectionActive : styles.favSection} data-id="Albums" onClick={handleSection}>
          <span className='me-5' data-id="Albums">Albums</span>
          <div className={styles.favIcon} data-id="Albums">
            <i className="fa-solid fa-caret-down" data-id="Albums"></i>
          </div>
        </div>
      </div>
      <div className='d-flex align-items-center w-100 flex-column justify-content-center'>
        <div className={styles.favTitle}></div>
        <div className={styles.right}>
          {
            userFavs.length === 0 &&
            <div className={styles.emptyFavs}>
              <div>
                <i class="fa-solid fa-inbox"></i>
              </div>
              <div>
                <p>You don't have any favorites yet!</p>
              </div>
            </div>
          }
          
          {
            section === "Songs" && userFavs.length > 0 && 
              userFavs.map(el => {
                return songs.map(song => {
                  validateSongs.push(el);
                  if(song.songId === el){
                    console.log(song);
                    return <SongCard
                      artist={song.artists.map((artist, index) => {
                        if(index === song.artists.length - 1){
                          return artist.name
                        }else{
                          return artist.name + " • "
                        }
                      })}
                      song={song.name}
                      id={song.id}
                      img={song.image}
                      audio={song.audioPreview}
                      audioFull={song.audioFull}
                      songId={song.songId}
                    />
                  };
                })
              })
          }
          {
            section === "Playlists" && userFavs.length > 0 &&
            userFavs.map(el => {
                return playlists.map(playlist => {
                  if(playlist.playlistId === el){
                    validatePlaylists.push(el);
                    return <PlaylistCard
                    creator={playlist.owner}
                    playlist={playlist.name}
                    image={playlist.image}
                    id={playlist.id}
                    playlistId={playlist.playlistId}
                  />
                  };
                })
              })
          }
          
          {
            section === "Albums" && userFavs.length > 0 &&
            userFavs.map(el => {
              return albums.map(album => {
                if(album.albumId === el){
                  validateAlbums.push(el);
                  return <AlbumCard
                    artist={album.artists}
                    album={album.name}
                    image={album.image}
                    id={album.id}
                    albumId={album.albumId}
                  />
                };
              })
            })
          }

          {/* {
            section === "Playlists" && validatePlaylists.length === 0 && userFavs.length > 0 &&
            <div className={styles.emptyFavs}>
              <div>
                <i class="fa-solid fa-inbox"></i>
              </div>
              <div>
                <p>No data found</p>
              </div>
            </div>
          }
          {
            section === "Albums" && validateAlbums.length === 0 && userFavs.length > 0 &&
            <div className={styles.emptyFavs}>
              <div>
                <i class="fa-solid fa-inbox"></i>
              </div>
              <div>
                <p>No data found</p>
              </div>
            </div>
          }
          {
            section === "Songs" && validateSongs.length === 0 && userFavs.length > 0 &&
            <div className={styles.emptyFavs}>
              <div>
                <i class="fa-solid fa-inbox"></i>
              </div>
              <div>
                <p>No data found</p>
              </div>
            </div>
          } */}
        </div>
      </div>
    </div>
   );
}
 
export default Favorites;