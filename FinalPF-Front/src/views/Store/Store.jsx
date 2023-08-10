import React, { useContext, useEffect, useState } from 'react'
import DropdownMenu from '../../components/dropdownMenu/dropdownMenu';
import styles from "./Store.module.css"
import SongCard from '../../components/Cards/songCard';
import AlbumCard from '../../components/Cards/albumCard';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015
import { useDispatch, useSelector } from "react-redux";
import { filterSongs, getSongs } from '../../redux/Actions/SongsActions';
import Pagination from "../../components/Pagination/Pagination";
import { PlaylistContext } from '../../contexts/playlistContext';


const Store = () => {

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { songs, filteredSongs } = state;

  const dataContext = useContext(PlaylistContext);
  const { alphabet, letter, explicit, popularity, artists } = dataContext;

  const [optionsSearch, setOptionsSearch] = useState([]);
  
  // PAGINADO

  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 9;

  const nextPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage - 1);
  };

  let lastPage = 0
  let currentSongs = 0
  let currentSongsFilter = 0
  let { filteredSongsArtist, filteredSongsPopularity, filteredSongsExplicit } = state;
  
  if (!filteredSongs.length && !filteredSongsArtist.length && !filteredSongsPopularity.length && !filteredSongsExplicit.length) {
    lastPage = Math.ceil(songs.length / songsPerPage);
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    //verificar para filteredSongs
    currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
    
  } else {
    lastPage = Math.ceil(filteredSongs.length / songsPerPage);
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    //verificar para filteredSongs
     currentSongsFilter = filteredSongs.slice(indexOfFirstSong, indexOfLastSong);
  }
 


  useEffect(() => {
    window.scrollTo(0, 0);
    // dispatch(getSongs());
  }, []);

  useEffect(() => {
    //console.log(songs);
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
  }, [songs, filteredSongs]);

  return (
    <div className={styles.wrapper}>
      <aside className={styles.sideBar}>
        <DropdownMenu />
      </aside>
      <div className={styles.panel}>
        <h2 className={styles.title}>Our Songs</h2>
        {/* <h2 className={styles.banner}>What do you want to hear today?</h2> */}
        <div className="d-flex align-items-center justify-content-center">
          <div className={styles.searchBar}>
            <Typeahead
              placeholder="What do you want to listen today?"
              onChange={(selected) => dispatch(filterSongs(selected))}
              options={optionsSearch}
            />
          </div>
        </div>
        <div className={styles.pag}>
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
        <div className={styles.cards}>
          {filteredSongs?.length ? (
            currentSongsFilter.map((el) => {
              return (
                <SongCard
                  artist={el.artists.map((artist, index) => {
                    if (index === el.artists.length - 1) {
                      return artist.name;
                    } else {
                      return artist.name + " • ";
                    }
                  })}
                  song={el.name}
                  songId={el.songId}
                  id={el.id}
                  img={el.image && el.image}
                  audio={el.audioPreview}
                  audioFull={el.audioFull}
                  el={el}
                />
              );
            })
          ) : !filteredSongs.length &&
            (alphabet || explicit || popularity || artists || letter) ? (
            <div></div>
          ) : (
            currentSongs?.map((el, index) => {
              return (
                <SongCard
                  key={index}
                  artist={el.artists.map((artist, index) => {
                    if (index === el.artists.length - 1) {
                      return artist.name;
                    } else {
                      return artist.name + " • ";
                    }
                  })}
                  song={el.name}
                  id={el.id}
                  img={el.image}
                  audio={el.audioPreview}
                  audioFull={el.audioFull}
                  songId={el.songId}
                  explicit={el.explicit}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
 
export default Store;