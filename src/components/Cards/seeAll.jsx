import React from 'react'
import styles from "./seeAll.module.css"
import { useNavigate, useParams } from 'react-router-dom';
import PlaylistCard from './playlistCard';
import AlbumCard from './albumCard';
import SongCard from './songCard';

const SeeAll = () => {

  const dummy = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7,]
  const navigate = useNavigate();

  const { name } = useParams();

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
                dummy.map((el, index) =>{
                  return(
                    <PlaylistCard
                      key={index}
                      creator="Soul Life"
                      playlist={"Rap Caviar"}
                    />
                  )
                })
              }
          </div>
        )
      }
      {
        name === "songs" && (
          <div className={styles.cards}>
            {
                dummy.map((el, index) =>{
                  return(
                    <SongCard
                      key={index}
                      artist="Ariana Grande"
                      song={"Thank u, next"}
                    />
                  )
                })
              }
          </div>
        )
      }
      {
        name === "albums" && (
          <div className={styles.cards}>
            {
                dummy.map((el, index) =>{
                  return(
                    <AlbumCard
                      key={index}
                      artist="Soul Life"
                      playlist={"Rap Caviar"}
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