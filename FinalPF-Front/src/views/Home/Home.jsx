import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import { PlaylistContext } from "../../contexts/playlistContext";
import PlaylistModal from "../../modals/playlistModal";
import drake from "../../components/assets/quiente.jpg";
import { useNavigate } from 'react-router-dom';
import DropdownMenu from '../../components/dropdownMenu/dropdownMenu';
import PlaylistCard from "../../components/Cards/playlistCard";
import AlbumCard from "../../components/Cards/albumCard";
import SongCard from "../../components/Cards/songCard";
import anuncio from '../../components/assets/anuncio.png';
import video from "../../components/assets/pinky.mp4"
import { useDispatch, useSelector } from "react-redux";
import { getSongs } from "../../redux/Actions/SongsActions";
import { getAlbums } from "../../redux/Actions/AlbumsActions";
import { Typeahead } from "react-bootstrap-typeahead";
import { Toast } from 'primereact/toast';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css"; 


const Home = () => {

  const refToast = useRef();
  const testCards = [1, 2, 3, 4];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { songs, albums, playlists } = state;

  const data = useContext(PlaylistContext);
  const { modalOpen, setModalOpen, setPlayerOpen } = data;


  const refSlider = useRef();

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;
  const toRotate = [
    "Welcome to Soul Music!",
    "Life is better with music!",
    "Listen your favorite songs!",
  ];
  const [popOpen, setPopOpen] = useState(false);
  const [optionsSearch, setOptionsSearch] = useState([]);


  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  useEffect(() => {

    let options = [];
    songs.map((el, index) => {
      options.push({
        id: el.id,
        songId: el.songId,
        label: el.artists[0].name + " • " + el.name,
        name: el.name,
        audioPreview: el.audioPreview,
        audioFull: el.audioFull,
        image: el.image,
        el: el,
        artist: el.artists.map((artist, index) => {
          if(index === el.artists.length - 1){
            return artist.name
          }else{
            return artist.name + " • "
          }
        })
      });
    });
    setOptionsSearch(options);
  }, [songs]);

  
  const handleSelected = (selected) =>{
    if(selected.length){
      if(selected[0].audioPreview){
        setPlayerOpen({audioFull: selected[0].audioFull, audio: selected[0].audioPreview, img: selected[0].image, song: selected[0].name, artist: selected[0].artist, type: "song", id: selected[0].songId});
      }else{
        refToast.current.show({sticky: true, severity: 'info', summary: "We're sorry!", detail: "This song's preview is not available!"});
      }
    }
  };

  return (
    <div className="home">
      <Toast ref={refToast} position='top-left'></Toast>
      <div className={styles.welcome}>
        <span className="wrap">{text}</span>
      </div>
      <div className={styles.search}>
        <div className={styles.searchBar}>
          <Typeahead
            id="pagination-example"
            placeholder='What do you want to listen today?'
            onChange={(selected) => handleSelected(selected)}
            options={optionsSearch}
          />
        </div>
      </div>

        <div className={styles.container}>
          {/* POPULAR PLAYLISTS */}
          <div className={styles.container2}>
            <div className={styles.subTitle}>
              <h2 style={{letterSpacing: "1.5px"}}>Popular Playlists</h2>
              <i className="fa-solid fa-square-plus fa-lg me-5" style={{color:"lightgrey"}} onClick={()=> navigate("/seeAll/playlists")}></i>
            </div>
            <div ref={refSlider} className={styles.containerSlider}>
            {
                playlists.length && playlists.map((el, index) =>{
              
                  if(index === 0 || index === 7 || index === 8 || index === 4)
                  return(
                    <PlaylistCard
                      
                      key={index}
                      creator={el.owner}
                      playlist={el.name}
                      image={el.image}
                      id={el.id}
                      playlistId={el.playlistId}
                      price={el.price}
                      el={el}
                    />
                  )
                })
              }
            </div>
          </div>
          {/* FIRTS POP UP */}
          <div className={styles.videoWrapper}>
            <video playsInline autoPlay muted loop>
                <source src={video} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <div className={styles.welcomePop}>
              <div className={styles.leftPop}>
                <div>
                  <p className={styles.popp}>Did you know you can create your own personalized Playlist?</p>
                  <p className={styles.popp}>Just click the button below!</p>
                </div>
                <div className="fa-bounce" onClick={()=> navigate("/myPlaylist")}>
                  <button className={styles.btnpop}>Let's go!</button>
                </div>
              </div>
            </div>
          </div>

          {/* POPULAR SONGS */}
          <div className={styles.container2} style={{marginTop:"7rem"}}>
            <div className={styles.subTitle}>
              <h2 style={{letterSpacing: "1.5px"}}>Popular Songs</h2>
              <i className="fa-solid fa-square-plus fa-lg me-5" style={{color:"lightgrey"}} onClick={()=> navigate("/store")}></i>
            </div>
            <div ref={refSlider} className={styles.containerSlider}>
            <SongCard
              artist={songs[0]?.artists.map((artist, index) => {
                if(index === songs[0]?.artists.length - 1){
                  return artist.name
                }else{
                  return artist.name + " • "
                }
              })}
              song={songs[0]?.name}
              id={songs[0]?.id}
              img={songs[0]?.image}
              audio={songs[0]?.audioPreview}
              audioFull={songs[0]?.audioFull}
              songId={songs[0]?.songId}
              explicit={songs[0]?.explicit}
              el={songs[0]}
            />
            <SongCard
              artist={songs[330]?.artists.map((artist, index) => {
                if(index === songs[330]?.artists.length - 1){
                  return artist.name
                }else{
                  return artist.name + " • "
                }
              })}
              song={songs[330]?.name}
              id={songs[330]?.id}
              img={songs[330]?.image}
              audio={songs[330]?.audioPreview}
              audioFull={songs[330]?.audioFull}
              songId={songs[330]?.songId}
              explicit={songs[330]?.explicit}
              el={songs[330]}
            />
            <SongCard
              artist={songs[375]?.artists.map((artist, index) => {
                if(index === songs[375]?.artists.length - 1){
                  return artist.name
                }else{
                  return artist.name + " • "
                }
              })}
              song={songs[375]?.name}
              id={songs[375]?.id}
              img={songs[375]?.image}
              audio={songs[375]?.audioPreview}
              audioFull={songs[375]?.audioFull}
              songId={songs[375]?.songId}
              explicit={songs[375]?.explicit}
              el={songs[375]}
            />
            <SongCard
              artist={songs[324]?.artists.map((artist, index) => {
                if(index === songs[324]?.artists.length - 1){
                  return artist.name
                }else{
                  return artist.name + " • "
                }
              })}
              song={songs[324]?.name}
              id={songs[324]?.id}
              img={songs[324]?.image}
              audio={songs[324]?.audioPreview}
              audioFull={songs[324]?.audioFull}
              songId={songs[324]?.songId}
              explicit={songs[324]?.explicit}
              el={songs[324]}
            />
            
            
            </div>
          </div>

          <div className={styles.bestSellerWrapper}>
            <div className={styles.bestSellerImg}>
              {/* <img className='me-5' src="/images/star.svg" alt="abc" /> */}
              <div className={styles.landingPanelTitle}>
                <h2>Best Sellers Songs</h2>
              </div>

              {/* <img className='ms-5' src="/images/surprise.svg" alt="abc" /> */}
            </div>
            <div className={styles.prizes}>

                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize1.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src={songs[20]?.image} alt="abc" />
                  </div>
                  
                  <div className={styles.span}>
                    <span>{songs[20]?.artists[0].name}</span>
                    <span>{songs[20]?.name.length > 22 ? songs[20]?.name.slice(0, 22) + "…" : songs[20]?.name}</span>
                  </div>
                </div>
                
                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize2.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src={songs[370]?.image} alt="abc" />
                  </div>
                  
                  <div className={styles.span}>
                    <span>{songs[370]?.artists[0].name}</span>
                    <span>{songs[370]?.name.length > 22 ? songs[370]?.name.slice(0, 22) + "…" : songs[370]?.name}</span>
                  </div>
                </div>
                
                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize3.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src={songs[341]?.image} alt="abc" />
                  </div>
                  
                  <div className={styles.span}>
                    <span>{songs[341]?.artists[0].name}</span>
                    <span>{songs[341]?.name.length > 22 ? songs[341]?.name.slice(0, 22) + "…" : songs[341]?.name}</span>
                  </div>
                </div>
                
                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize4.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src={songs[336]?.image} alt="abc" />
                  </div>
                  
                  <div className={styles.span}>
                    <span>{songs[336]?.artists[0].name}</span>
                    <span>{songs[336]?.name.length > 22 ? songs[336]?.name.slice(0, 22) + "…" : songs[336]?.name}</span>
                  </div>
                </div>
              
            </div>
            
          </div>
        
          {/* POPULAR ALBUMS */}
          <div className={styles.container2} style={{marginTop:"7rem"}}>
            <div className={styles.subTitle}>
              <h2 style={{letterSpacing: "1.5px"}}>Popular Albums</h2>
              <i className="fa-solid fa-square-plus fa-lg me-5" style={{color:"lightgrey"}} onClick={()=> navigate("/seeAll/albums")}></i>
            </div>
            <div ref={refSlider} className={styles.containerSlider}>
            <AlbumCard
              artist={albums[0]?.artists}
              album={albums[0]?.name}
              image={albums[0]?.image}
              id={albums[0]?.id}
              albumId={albums[0]?.albumId}
              price={albums[0]?.price}
              el={albums[0] && albums[0]}
            />
            <AlbumCard
              artist={albums[5]?.artists}
              album={albums[5]?.name}
              image={albums[5]?.image}
              id={albums[5]?.id}
              albumId={albums[5]?.albumId}
              price={albums[5]?.price}
              el={albums[5] && albums[5]}
            />
            <AlbumCard
              artist={albums[2]?.artists}
              album={albums[2]?.name}
              image={albums[2]?.image}
              id={albums[2]?.id}
              albumId={albums[2]?.albumId}
              price={albums[2]?.price}
              el={albums[2] && albums[2]}
            />
            <AlbumCard
              artist={albums[3]?.artists}
              album={albums[3]?.name}
              image={albums[3]?.image}
              id={albums[3]?.id}
              albumId={albums[3]?.albumId}
              price={albums[3]?.price}
              el={albums[3] && albums[3]}
            />
            </div>
          </div>
        </div>
    </div>
  );
};

export default Home;