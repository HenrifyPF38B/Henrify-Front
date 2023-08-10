import React, { useEffect } from 'react'
import styles from "./seeAll.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import PlaylistCard from './playlistCard';
import AlbumCard from './albumCard';
import SongCard from './songCard';
import { useSelector } from 'react-redux';

const SeeAll = () => {

  const dummy = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7,]
  const navigate = useNavigate();
  const state = useSelector(state => state);
  const { albums, playlists } = state;

  const { name } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [name]);

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.goBack} onClick={()=> navigate("/home")}>
        <i className="fa-solid fa-circle-chevron-left fa-2xl"></i>
      </div>
      <h2>Popular {name[0].toUpperCase() + name.slice(1)}</h2>
      {
        name === "playlists" && (
          <div className={styles.cards}>
            {
                playlists.length && playlists.map((el, index) =>{
                  if(el.owner === "Soul Life"){
                    return(
                      <PlaylistCard
                        key={index}
                        creator={el.owner}
                        playlist={el.name}
                        image={el.image ? el.image : el.images}
                        id={el.id ? el.id : el.name}
                        playlistId={el.playlistId}
                        price={el.price}
                        el={el}
                      />
                    )
                  }
                })
              }
          </div>
        )
      }
      
      {
        name === "albums" && (
          <div className={styles.cards}>
            {
                albums.length && albums.map((el, index) =>{
                  return(
                    <AlbumCard
                      key={index}
                      artist={el.artists}
                      album={el.name}
                      image={el.image}
                      id={el.id}
                      albumId={el.albumId}
                      price={el.price}
                      el={el}
                    />
                  )
                })
              }
          </div>
        )
      }
    </div>
   );
}
 
export default SeeAll;