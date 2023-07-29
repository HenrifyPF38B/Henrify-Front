import React, { useEffect, useState } from "react";
import DropdownMenu from "../../components/dropdownMenu/dropdownMenu";
import styles from "./Store.module.css";
import SongCard from "../../components/Cards/songCard";
import AlbumCard from "../../components/Cards/albumCard";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead"; // ES2015
import { useDispatch, useSelector } from "react-redux";
import { filterSongs, getSongs } from "../../redux/Actions/SongsActions";
import Pagination from "../../components/Pagination/Pagination";

const Store = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { songs, filteredSongs } = state;

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

  const lastPage = Math.ceil(songs.length / songsPerPage);
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
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
          {!filteredSongs.length && (
             <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
          )}         
        </div>
        <div className={styles.cards}>
          {filteredSongs?.length ? (
            <SongCard
              artist={filteredSongs[0].artists.map((artist, index) => {
                if (index === filteredSongs[0].artists.length - 1) {
                  return artist.name;
                } else {
                  return artist.name + " • ";
                }
              })}
              song={filteredSongs[0].name}
              id={filteredSongs[0].id}
              img={filteredSongs[0].image && filteredSongs[0].image}
              audio={filteredSongs[0].audio}
              audioFull={filteredSongs[0].audioFull}
            />
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
                  img={el.image && el.image}
                  audio={el.audioPreview}
                  audioFull={el.audioFull}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
