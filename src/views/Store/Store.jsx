import React, { useEffect, useState } from 'react'
import DropdownMenu from '../../components/dropdownMenu/dropdownMenu';
import styles from "./Store.module.css"
import SongCard from '../../components/Cards/songCard';
import AlbumCard from '../../components/Cards/albumCard';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import { useDispatch, useSelector } from "react-redux";
import { filterSongs, getSongs } from '../../redux/Actions/SongsActions';


const Store = () => {

  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { songs, filteredSongs } = state;

  const [optionsSearch, setOptionsSearch] = useState([]);

  useEffect(() => {
    dispatch(getSongs());
  }, []);

  useEffect(() => {
    let options = [];
    songs.map((el, index) => {
      options.push({
        id: index,
        label: el.artists + " - " + el.name,
        name: el.name,
        artists: el.artists,
        audio: el.audio,
        image: el.image
      });
    });
    setOptionsSearch(options);
  }, [songs]);

  return ( 
    <div className={styles.wrapper}>
    
      <aside className={styles.sideBar}>
        <DropdownMenu />
      </aside>    
       <div className={styles.panel}>
        <h2 className={styles.title}>Our Store</h2>
        {/* <h2 className={styles.banner}>What do you want to hear today?</h2> */}
      <div className='d-flex align-items-center justify-content-center'>
        <div className={styles.searchBar}>
          <Typeahead
            placeholder='What do you want to listen today?'
            onChange={(selected) => dispatch(filterSongs(selected))}
            options={optionsSearch}
          />
        </div>
      </div>
      <div className={styles.cards}>
        {
          filteredSongs && filteredSongs.length ?
            filteredSongs.map((el, index) => {
              return(
                <SongCard
                  key={index}
                  artist={el.artists}
                  song={el.name}
                  img={el.image}
                  audio={el.audio}
                />
              )
            })
          :
            songs.map((el, index) => {
              return(
                <SongCard
                  key={index}
                  artist={el.artists}
                  song={el.name}
                  img={el.image}
                  audio={el.audio}
                />
              )
            })
        }
      </div>
    </div>
    </div> 
   );
}
 
export default Store;