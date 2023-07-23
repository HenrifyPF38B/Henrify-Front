import style from "./Create.module.css";
import camera from "../assets/camera.svg";
import close from "../assets/remove.svg";
import React, { useState } from "react";
import { useEffect } from "react";
import back from "../assets/back.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import song from "../assets/ari.jpeg";
import add from "../assets/add.svg";
import playlist from "../assets/about2.png";
import Pagination from "../Pagination/Pagination";


const Create = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const songId = queryParams.get("songId");

  const playlistData = [
    {
      id: 1,
      songName: "Song 1",
      artist: "Artist 1",
    },
    {
      id: 2,
      songName: "Song 2",
      artist: "Artist 2",
    },
    {
      id: 3,
      songName: "Song 3",
      artist: "Artist 3",
    },
    {
      id: 4,
      songName: "Song 4",
      artist: "Artist 4",
    },
    {
      id: 5,
      songName: "Song 5",
      artist: "Artist 5",
    },
    {
      id: 6,
      songName: "Song 6",
      artist: "Artist 6",
    },
    {
      id: 7,
      songName: "Song 7",
      artist: "Artist 7",
    },
    {
      id: 8,
      songName: "Song 8",
      artist: "Artist 8",
    },
    {
      id: 9,
      songName: "Song 9",
      artist: "Artist 9",
    },
    {
      id: 10,
      songName: "Song 10",
      artist: "Artist 10",
    },
    {
      id: 11,
      songName: "Song 11",
      artist: "Artist 11",
    },
    {
      id: 12,
      songName: "Song 12",
      artist: "Artist 12",
    },
    {
      id: 13,
      songName: "Song 13",
      artist: "Artist 13",
    },
    {
      id: 14,
      songName: "Song 14",
      artist: "Artist 14",
    },
    {
      id: 15,
      songName: "Song 15",
      artist: "Artist 15",
    },
    {
      id: 16,
      songName: "Song 16",
      artist: "Artist 16",
    },
    {
      id: 17,
      songName: "Song 17",
      artist: "Artist 17",
    },
    {
      id: 18,
      songName: "Song 18",
      artist: "Artist 18",
    },
    {
      id: 19,
      songName: "Song 19",
      artist: "Artist 19",
    },
    {
      id: 20,
      songName: "Song 20",
      artist: "Artist 20",
    },
  ];

  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
    setSelectedSongs([]);
  }, [songId]);

  const handleAddToPlaylist = (id) => {
    const selectedSong = playlistData.find((item) => item.id === id);
    if (selectedSong) {
      setSelectedSongs((prevSelectedSongs) => [
        ...prevSelectedSongs,
        selectedSong,
      ]);
    }
  };

  const handleRemoveFromPlaylist = (id) => {
    console.log("Trying to remove song with ID:", id);
    setSelectedSongs((prevSelectedSongs) =>
      prevSelectedSongs.filter((song) => song.id !== id)
    );
  };
  // PAGINADO
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 8;

  const nextPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const lastPage = Math.ceil(playlistData.length / songsPerPage);
  const indexOfLastSong = currentPage * songsPerPage;
  const indexOfFirstSong = indexOfLastSong - songsPerPage;
  const currentSongs = playlistData.slice(indexOfFirstSong, indexOfLastSong);


  // IMAGE PREVIEW FUNCIONALITY
  useEffect(() => {
    document.querySelector("#camarita").addEventListener("click", (e) => {
      document.querySelector("#hiddenInput").click();
    });
    document.querySelector("#hiddenInput").addEventListener("change", (e) => {
      Array.from(e.target.files).map((file) => {
        let imageSource = URL.createObjectURL(file);
        let div = document.createElement("div");
        div.id = "imagePreview";
        div.className = "imagePreview";
        let img = document.createElement("img");
        img.src = imageSource;
        let closeButton = document.createElement("img");
        closeButton.src = close;
        closeButton.className = "closePreview";
        closeButton.addEventListener("click", (e) => {
          e.target.parentElement.remove();
        });

        div.appendChild(img);
        div.appendChild(closeButton);

        document
          .querySelector("#camarita")
          .insertAdjacentElement("beforeBegin", div);
        // Aca habia insertado la variable img, entonces no se cargaba la div. Lo cambie a div para que inserte la div.
      });
    });
  }, []);

  return (
    <div className={style.container}>
      <div className={style.titu}>
        <h2 className={style.title}>Create a new playlist</h2>
      </div>
      <div
        className={style.backContainer}
        onClick={() => navigate("/myPlaylist")}
      >
        <img className={style.backImg} src={back} alt="back" />
      </div>
      <div className={style.containerCam}>
        <div className={style.camarita} id="camarita">
          <span className={style.textCamera}>Add photo</span>
          <img className={style.imgCamera} src={camera} alt="abc" />
        </div>
        <input
          type="file"
          accept="images/*"
          id="hiddenInput"
          style={{ visibility: "hidden" }}
        />
      </div>
      <form className={style.form}>
        <div className={style.boxName}>
          <input
            className={style.input}
            type="text"
            name="name"
            placeholder=" Name..."
          ></input>

          <input
            className={style.input2}
            type="text"
            name="name"
            placeholder=" Add an optional description"
          ></input>
          <h3 className={style.title2}>
            What songs would you like to save in your playlist?
          </h3>
          <button className={style.add}>Add your favorites</button>
          
        <div className={style.titulo}>
        <h2>Your favorites songs</h2>
      </div>
          <div className={style.container2}>
        {currentSongs.map((item) => (
          <div className={style.cardsContainer} key={item.id}>
            <img className={style.image} src={playlist} alt="playlist" />
            <img
              className={style.imageAdd}
              src={add}
              alt="add"
              onClick={() => handleAddToPlaylist(item.id)}
            />
            <div className={style.songInfo}>
              <h4>{item.songName}</h4>
              <p>{item.artist}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination
      currentPage={currentPage}
      lastPage={lastPage}
      prevPage={prevPage}
      nextPage={nextPage}
      />
      <div className={style.boxSelect}>
          <div className={style.selectedSong}>
            {selectedSongs.length > 0 ? (
              <div className={style.container2}>
                {selectedSongs.map((song) => (
                  <div className={style.songs} key={song.id}>
                    <img className={style.imageSelected} src={playlist} alt="playlist" />
                    <h4 className={style.songtit}>{song.songName}</h4>
                    <p className={style.songart}>{song.artist}</p>
                    <button
                    className={style.removeButton} 
                    onClick={() => handleRemoveFromPlaylist(song.id)}
                  >
                  x
                  </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className={style.notfound}>No song selected</p>
            )}
          </div>
          </div>
          <h3 className={style.title2}>Search by name...</h3>
          <select className={style.input} defaultValue={"default"} name="song">
            <option value="default" disabled>
              All
            </option>
            <option>Sea of problems</option>
            <option>Daylight</option>
            <option>Flowers</option>
            <option>Peaches</option>
            <option>I wanna be yours</option>
            <option>Clouds</option>
            <option>Calm Down</option>
            <option>Here with me</option>
            <option>SNAP</option>
            <option>As it was</option>
            <option>Sunroof</option>
            <option>Players</option>
            <option>Those Eyes</option>
            <option>Sunsetz</option>
            <option>Pieces</option>
            <option>Atlantis</option>
            <option>505</option>
            <option>Memories</option>
            <option>Love of my life</option>
            <option>Sweet</option>
            <option>august</option>
            <option>Timezone</option>
            <option>Sea of problems</option>
            <option>Daylight</option>
            <option>Flowers</option>
            <option>Peaches</option>
            <option>I wanna be yours</option>
            <option>Clouds</option>
            <option>Calm Down</option>
            <option>Here with me</option>
            <option>SNAP</option>
            <option>As it was</option>
            <option>Sunroof</option>
            <option>Players</option>
            <option>Those Eyes</option>
            <option>Sunsetz</option>
            <option>Pieces</option>
            <option>Atlantis</option>
            <option>505</option>
            <option>Memories</option>
            <option>Love of my life</option>
            <option>Sweet</option>
            <option>august</option>
            <option>Timezone</option>
          </select>
          {/* 
        <input type='file' multiple id='add-new-photo' name='images[]'></input> */}
        </div>
      </form>
    </div>
  );
};

export default Create;
