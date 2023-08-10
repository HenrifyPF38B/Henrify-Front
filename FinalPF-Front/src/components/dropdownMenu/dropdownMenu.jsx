import style from "./dropdownMenu.module.css";
//import dash from "../assets/dashboard.svg";
import not from "../assets/notamusica.svg";
import arrow from "../assets/arrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { filterSongs, filterSongsByAlphabet, filterSongsByArtist, filterSongsByExplicit, filterSongsByPopularity } from "../../redux/Actions/SongsActions";
import { PlaylistContext } from "../../contexts/playlistContext";

const compare = (a, b) => {
  return ('' + a.name).localeCompare(b.name);
}

const compareDesc = (a, b) => {
  return ('' + b.name).localeCompare(a.name);
}

const DropdownMenu = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let { songs, filteredSongs } = state;

  const dataContext = useContext(PlaylistContext);
  const {
    alphabet,
    setAlphabet,
    letter,
    setLetter,
    artists,
    setArtists,
    popularity,
    setPopularity,
    explicit,
    setExplicit,
  } = dataContext;

  const genderHandleClick = () => {
    const genderList = document.getElementById("genderList");
    const isListShown = genderList.style.height !== "0px";

    if (isListShown) {
      genderList.style.height = "0";
    } else {
      genderList.style.height = genderList.scrollHeight + "px";
    }
  };
  const modHandleClick = () => {
    const modList = document.getElementById("modList");
    const isListShown = modList.style.height !== "0px";

    if (isListShown) {
      modList.style.height = "0";
    } else {
      modList.style.height = modList.scrollHeight + "px";
    }
  };
  const themesHandleClick = () => {
    const themesList = document.getElementById("themesList");
    const isListShown = themesList.style.height !== "0px";

    if (isListShown) {
      themesList.style.height = "0";
    } else {
      themesList.style.height = themesList.scrollHeight + "px";
    }
  };
  const decadeHandleClick = () => {
    const decadeList = document.getElementById("decadeList");
    const isListShown = decadeList.style.height !== "0px";

    if (isListShown) {
      decadeList.style.height = "0";
    } else {
      decadeList.style.height = decadeList.scrollHeight + "px";
    }
  };
  const specialHandleClick = () => {
    const specialList = document.getElementById("specialList");
    const isListShown = specialList.style.height !== "0px";

    if (isListShown) {
      specialList.style.height = "0";
    } else {
      specialList.style.height = specialList.scrollHeight + "px";
    }
  };

  let { filteredSongsArtist, filteredSongsPopularity, filteredSongsExplicit } =
    state;

  const limpiarListado = () => {
    if (setPopularity !== null) setPopularity(null);
    if (setExplicit !== null) setExplicit(null);
    if (setAlphabet !== null) setAlphabet(null);
    if (setLetter !== null) setLetter(null);
    //Reset Estados
    let reset = [];
    dispatch(filterSongsByArtist(reset));
    dispatch(filterSongsByPopularity(reset));
    dispatch(filterSongsByExplicit(reset));
  };

  const limpiarListadoPopularity = () => {
     if (setExplicit !== null) setExplicit(null);
     if (setAlphabet !== null) setAlphabet(null);
     if (setLetter !== null) setLetter(null);
       let reset = [];
       dispatch(filterSongsByPopularity(reset));
       dispatch(filterSongsByExplicit(reset));
      
  }
  // HANDLERS de los filtros
  const handleArtist = (e) => {
    let selectedArtist = e.target.dataset.id;
    limpiarListado();
    if (artists === selectedArtist) {
      setArtists(null);
      selectedArtist = "";
    } else {
      setArtists(selectedArtist);
    }
    applyFilterArtist(selectedArtist);
  };

  const handlePopularity = (e) => {
    let selectedPopularity = e.target.dataset.id;
    limpiarListadoPopularity()

    if (popularity === selectedPopularity) {
      setPopularity(null);
      selectedPopularity = "";
      
    } else {
      setPopularity(selectedPopularity);
    }
    applyFilterPopularity(selectedPopularity);
  };

  const handleExplicit = (e) => {
    let selectedExplicit = e.target.dataset.id;
    let reset = [];
    dispatch(filterSongsByExplicit(reset));

    if (explicit === e.target.dataset.id) {
      setExplicit(null);
      selectedExplicit = "";
      
    } else {
      setExplicit(selectedExplicit);
    }
    
    applyFilterExplicit(selectedExplicit);
  };

  const handleAlphabet = (e) => {
    let selectedAlphabet = e.target.dataset.id;
    if (alphabet === selectedAlphabet) {
      setAlphabet(null);
      selectedAlphabet = "";
    } else {
      setAlphabet(selectedAlphabet);
    }

    applyFilterAlphabet(selectedAlphabet);
  };

  const handleLetter = (e) => {
    let selectedLetter = e.target.dataset.id;
    if (letter === selectedLetter) {
      setLetter(null);
      selectedLetter = "";
    } else {
      setLetter(selectedLetter);
    }
    applyFilterByLetter(selectedLetter);
  };

  //Funciones para Filtrar

  //Filtrar Artist
  const applyFilterArtist = (selectedArtist) => {
    let filtered = [...songs];
    if (selectedArtist) {
      filtered = filtered.filter((song) =>
        song.artists.some((artistObj) => artistObj.name === selectedArtist)
      );
    }

    dispatch(filterSongsByArtist(filtered));
    dispatch(filterSongs(filtered));
  };

  //Filtrar Popularity
  const applyFilterPopularity = (popularitySelected) => {
    let filtered = [];
    !filteredSongsArtist.length
      ? (filtered = [...songs])
      : (filtered = [...filteredSongsArtist]);

    if (popularitySelected) {
      filtered = filtered.filter((song) => {
        const parsedPopularity = parseInt(song.popularity);
        if (
          popularitySelected === "verylow" &&
          parsedPopularity >= 81 &&
          parsedPopularity <= 100
        ) {
          return true;
        } else if (
          popularitySelected === "low" &&
          parsedPopularity >= 61 &&
          parsedPopularity <= 80
        ) {
          return true;
        } else if (
          popularitySelected === "regular" &&
          parsedPopularity >= 41 &&
          parsedPopularity <= 60
        ) {
          return true;
        } else if (
          popularitySelected === "high" &&
          parsedPopularity >= 21 &&
          parsedPopularity <= 40
        ) {
          return true;
        } else if (
          popularitySelected === "veryhigh" &&
          parsedPopularity >= 1 &&
          parsedPopularity <= 20
        ) {
          return true;
        }

        return false;
      });
    }

    dispatch(filterSongsByPopularity(filtered));
    dispatch(filterSongs(filtered));
  };

  //Filtrar EXPLICIT
  const applyFilterExplicit = (selectedExplicit) => {
    let filtered = [];
     if (!filteredSongsArtist.length && !filteredSongsPopularity.length)
      filtered = [...songs];
    if (!filteredSongsArtist.length && filteredSongsPopularity.length)
      filtered = [...filteredSongsPopularity];
    if (filteredSongsArtist.length && !filteredSongsPopularity.length) {
      filtered = [...filteredSongsArtist]
      setPopularity(null)
    }
      
    if (filteredSongsArtist.length && filteredSongsPopularity.length)
      filtered = [...filteredSongsPopularity]; 
    if (filteredSongsPopularity.length)
      filtered = [...filteredSongsPopularity]; 
      
    if (selectedExplicit) {
      if (selectedExplicit === "explicit") {
        filtered = filtered.filter((song) => song.explicit === true);
      } else if (selectedExplicit === "nonexplicit") {
        filtered = filtered.filter((song) => song.explicit === false);
      }
    }
    dispatch(filterSongsByExplicit(filtered));
    dispatch(filterSongs(filtered));
  };

  //Filtrar ALPHABET
  const applyFilterAlphabet = (selectedAlphabet) => {
    let filtered = [];

    if (
      !filteredSongsArtist.length &&
      !filteredSongsPopularity.length &&
      !filteredSongsExplicit.length
    )
      filtered = [...songs];
    if (
      !filteredSongsArtist.length &&
      filteredSongsPopularity.length &&
      !filteredSongsExplicit.length
    ) {
      setExplicit(null);
      filtered = [...filteredSongsPopularity];
    }
      
    if (
      filteredSongsArtist.length &&
      !filteredSongsPopularity.length &&
      !filteredSongsExplicit.length
    ) {
      setPopularity(null)
      setExplicit(null)
      filtered = [...filteredSongsArtist];
    }
      
    if (
      filteredSongsArtist.length &&
      filteredSongsPopularity.length &&
      !filteredSongsExplicit.length
    )
    {
      setExplicit(null)
      filtered = [...filteredSongsPopularity];
      }
      
    if (
      filteredSongsArtist.length &&
      filteredSongsPopularity.length &&
      filteredSongsExplicit.length
    )
      filtered = [...filteredSongsExplicit];
    if (filteredSongsExplicit.length)
      filtered = [...filteredSongsExplicit];

    console.log("Artist: " + filteredSongsArtist.length);
    console.log("Popularity: " + filteredSongsPopularity.length);
    console.log("Explicit: " + filteredSongsExplicit.length);

    if (selectedAlphabet) {
      if (selectedAlphabet === "asc") {
        filtered = filtered.sort(compare);
      } else if (selectedAlphabet === "desc") {
        filtered = filtered.sort(compareDesc);
      }
    }

    dispatch(filterSongsByAlphabet(filtered));
    dispatch(filterSongs(filtered));
  };

  //Filtrar By Letter
  const applyFilterByLetter = (selectedLetter) => {
    let filtered = [...songs];

    if (selectedLetter) {
      filtered = filtered.filter((song) =>
        song.name.startsWith(selectedLetter)
      );
    }

    dispatch(filterSongs(filtered));
  };

  //Reset ALL Filter
  const handleResetFilter = () => {
    //Reset selección de listas
    setArtists(null);
    setPopularity(null);
    setExplicit(null);
    setAlphabet(null);
    setLetter(null);

    //Reset Estados
    let reset = [];
    dispatch(filterSongsByArtist(reset));
    dispatch(filterSongsByPopularity(reset));
    dispatch(filterSongsByExplicit(reset));
    let filtered = [...songs];
    dispatch(filterSongs(filtered));
  };

  return (
    <div className={style.nav}>
      <button className={style.allSongs_btn} onClick={handleResetFilter}>
        All Songs
      </button>

      <ul className={style.list}>
        <li className={style.list_item}>
          {/* <h4 className={style.tit}>
            Advanced Search
          </h4> */}
        </li>

        {/* OUR SELECTION */}
        <li className={style.list_item}>
          <div
            className={`${style.list_button} 
            ${style.list_buttonClick}`}
            onClick={modHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <span className={style.nav_link}>Our Selection</span>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="modList">
            <li className={style.list__inside}>
              <span
                data-id="Mau y Ricky"
                onClick={handleArtist}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  artists === "Mau y Ricky" && "filterSelected"
                }`}
              >
                Mau y Ricky
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Duki"
                onClick={handleArtist}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  artists === "Duki" && "filterSelected"
                }`}
              >
                Duki
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Bad Bunny"
                onClick={handleArtist}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  artists === "Bad Bunny" && "filterSelected"
                }`}
              >
                Bad Bunny
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Ice Spice"
                onClick={handleArtist}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  artists === "Ice Spice" && "filterSelected"
                }`}
              >
                Ice Spice
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Rels B"
                onClick={handleArtist}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  artists === "Rels B" && "filterSelected"
                }`}
              >
                Rels B
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Dua Lipa"
                onClick={handleArtist}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  artists === "Dua Lipa" && "filterSelected"
                }`}
              >
                Dua Lipa
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Nicki Minaj"
                onClick={handleArtist}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  artists === "Nicki Minaj" && "filterSelected"
                }`}
              >
                Nicki Minaj
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Peso Pluma"
                onClick={handleArtist}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  artists === "Peso Pluma" && "filterSelected"
                }`}
              >
                Peso Pluma
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="KAROL G"
                onClick={handleArtist}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  artists === "KAROL G" && "filterSelected"
                }`}
              >
                KAROL G
              </span>
            </li>
          </ul>
        </li>

        {/* POPULARITY */}
        <li className={style.list_item}>
          <div
            className={`${style.list_button} 
            ${style.list_buttonClick}`}
            onClick={decadeHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <span className={style.nav_link}>Popularity</span>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="decadeList">
            <li className={style.list__inside}>
              <span
                data-id="verylow"
                onClick={handlePopularity}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  popularity === "verylow" && "filterSelected"
                }`}
              >
                Very Low
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="low"
                onClick={handlePopularity}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  popularity === "low" && "filterSelected"
                }`}
              >
                Low
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="regular"
                onClick={handlePopularity}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  popularity === "regular" && "filterSelected"
                }`}
              >
                Regular
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="high"
                onClick={handlePopularity}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  popularity === "high" && "filterSelected"
                }`}
              >
                High
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="veryhigh"
                onClick={handlePopularity}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  popularity === "veryhigh" && "filterSelected"
                }`}
              >
                Very High
              </span>
            </li>
          </ul>
        </li>

        {/* EXPLICIT */}
        <li className={style.list_item}>
          <div
            className={`${style.list_button}
             ${style.list_buttonClick}`}
            onClick={themesHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <span className={style.nav_link}>Explicit</span>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="themesList">
            <li className={style.list__inside}>
              <span
                data-id="explicit"
                onClick={handleExplicit}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  explicit === "explicit" && "filterSelected"
                }`}
              >
                Explicit
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="nonexplicit"
                onClick={handleExplicit}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  explicit === "nonexplicit" && "filterSelected"
                }`}
              >
                Non-Explicit
              </span>
            </li>
          </ul>
        </li>
        {/* ALPHABET */}
        <li className={style.list_item}>
          <div
            className={`${style.list_button} 
            ${style.list_buttonClick}`}
            onClick={genderHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <span className={style.nav_link}>Alphabetically</span>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="genderList">
            <li className={style.list__inside}>
              <span
                data-id="asc"
                onClick={handleAlphabet}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  alphabet === "asc" ? "filterSelected" : ""
                }`}
              >
                A - Z
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="desc"
                onClick={handleAlphabet}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  alphabet === "desc" ? "filterSelected" : ""
                }`}
              >
                Z - A
              </span>
            </li>
          </ul>
        </li>
        {/* BY LETTER */}
        <li className={style.list_item}>
          <div
            className={`${style.list_button} 
            ${style.list_buttonClick}`}
            onClick={specialHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <span className={style.nav_link}>By Letter</span>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="specialList">
            <li className={style.list__inside}>
              <span
                data-id="A"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "A" && "filterSelected"
                }`}
              >
                A
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="B"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "B" && "filterSelected"
                }`}
              >
                B
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="C"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "C" && "filterSelected"
                }`}
              >
                C
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="D"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "D" && "filterSelected"
                }`}
              >
                D
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="E"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "E" && "filterSelected"
                }`}
              >
                E
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="F"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "F" && "filterSelected"
                }`}
              >
                F
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="G"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "G" && "filterSelected"
                }`}
              >
                G
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="H"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "H" && "filterSelected"
                }`}
              >
                H
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="I"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "I" && "filterSelected"
                }`}
              >
                I
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="J"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "J" && "filterSelected"
                }`}
              >
                J
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="K"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "K" && "filterSelected"
                }`}
              >
                K
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="L"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "L" && "filterSelected"
                }`}
              >
                L
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="N"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "M" && "filterSelected"
                }`}
              >
                M
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="N"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "N" && "filterSelected"
                }`}
              >
                N
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="O"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "O" && "filterSelected"
                }`}
              >
                O
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="P"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "desc" && "filterSelected"
                }`}
              >
                P
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Q"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "Q" && "filterSelected"
                }`}
              >
                Q
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="R"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "R" && "filterSelected"
                }`}
              >
                R
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="S"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "S" && "filterSelected"
                }`}
              >
                S
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="T"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "T" && "filterSelected"
                }`}
              >
                T
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="U"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "U" && "filterSelected"
                }`}
              >
                U
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="V"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "V" && "filterSelected"
                }`}
              >
                V
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="W"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "W" && "filterSelected"
                }`}
              >
                W
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="X"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "X" && "filterSelected"
                }`}
              >
                X
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Y"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "Y" && "filterSelected"
                }`}
              >
                Y
              </span>
            </li>
            <li className={style.list__inside}>
              <span
                data-id="Z"
                onClick={handleLetter}
                className={`${style.nav__link} ${style.nav__linkinside} ${
                  letter === "Z" && "filterSelected"
                }`}
              >
                Z
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;