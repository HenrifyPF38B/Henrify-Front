import React, {useContext, useEffect, useRef, useState} from 'react'
import styles from "./Home.module.css";
import TopRatedCard  from "../../components/Cards/topRatedCard"
import { PlaylistContext } from "../../contexts/playlistContext";
import PlaylistModal from "../../modals/playlistModal";
import drake from "../../components/assets/quiente.jpg";
import { useNavigate } from 'react-router-dom';
import DropdownMenu from '../../components/dropdownMenu/dropdownMenu';


const Home = () => { 

  const testCards = [1, 2, 3, 4];
  const navigate = useNavigate();
  const data = useContext(PlaylistContext);
  const { modalOpen, setModalOpen } = data;

  const refSlider = useRef();

  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;
  const toRotate = ["Welcome to Soul Life!", "Life is better with music!", "Listen your favorite songs!"];
  const [popOpen, setPopOpen] = useState(false);
  
  
  useEffect(() => {
    let ticker = setInterval(()=>{
      tick();
    },delta);
    return () => {clearInterval(ticker)}
  }, [text]);



  const tick = () =>{
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);
  
    setText(updatedText);

    if(isDeleting){
      setDelta(prevDelta => prevDelta /2)
    };

    if(!isDeleting && updatedText === fullText){
      setIsDeleting(true);
      setDelta(period);
    }else if(isDeleting && updatedText === ""){
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };


  return (
    <div>
      <div className={styles.welcome}>
        <span className="wrap">{text}</span>
      </div>

        <div className={styles.container}>
          {
          modalOpen && <PlaylistModal setModalOpen={setModalOpen}/>
          }
          {/* POPULAR PLAYLISTS */}
          <div className={styles.container2}>
            <div className='d-flex align-items-center justify-content-between'>
              <h2>Popular Playlists</h2>
              <span className={styles.seeAll} onClick={()=> navigate("/seeAll/playlists")}>See all</span>
            </div>
            <div ref={refSlider} className={styles.containerSlider}>
            {
                testCards.map((el, index) =>{
                  return(
                    <TopRatedCard
                      key={index}
                      owner={"Soul Life"}
                      playlist={"Let's Party"}
                    />
                  )
                })
              }
            </div>
          </div>
          {/* FIRTS POP UP */}
          <div className={styles.firstPop}>
              <div className={styles.firstPopLeft}>
                  <p>Did you know you can create your own Playlist? Click the button and see yours!</p>
                  <button className='fa-bounce'>My Playlists</button>
              </div>
              <div style={{marginLeft:"100px"}}>
                <img src="/images/pop1.png" alt="abc" width={400} />
              </div>
          </div>

          {/* POPULAR SONGS */}
          <div className={styles.container2} style={{marginTop:"7rem"}}>
            <div className='d-flex align-items-center justify-content-between'>
              <h2>Popular Songs</h2>
              <span className={styles.seeAll} onClick={()=> navigate("/seeAll/songs")}>See all</span>
            </div>
            <div ref={refSlider} className={styles.containerSlider}>
            {
                testCards.map((el, index) =>{
                  return(
                    <TopRatedCard
                      type="song"
                      key={index}
                      owner={"Soul Life"}
                      playlist={"Let's Party"}
                    />
                  )
                })
              }
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
                    <img src="/images/drakecover.jpeg" alt="abc" />
                  </div>
                  <div className={styles.prizeArtist}>
                    <img src={drake} alt="abc"/>
                  </div>
                  <div className={styles.span}>
                    <span>Drake</span>
                    <span>Knife Talk</span>
                  </div>
                </div>
                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize2.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src="/images/drakecover.jpeg" alt="abc" />
                  </div>
                  <div className={styles.prizeArtist}>
                    <img src={drake} alt="abc"/>
                  </div>
                  <div className={styles.span}>
                    <span>Drake</span>
                    <span>Knife Talk</span>
                  </div>
                </div>
                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize3.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src="/images/drakecover.jpeg" alt="abc" />
                  </div>
                  <div className={styles.prizeArtist}>
                    <img src={drake} alt="abc"/>
                  </div>
                  <div className={styles.span}>
                    <span>Drake</span>
                    <span>Knife Talk</span>
                  </div>
                </div>
                <div className={styles.prizesCard}>
                  <div className={styles.prizeImg}>
                    <img src="/images/prize4.svg" alt="abc" />
                  </div>
                  <div className={styles.cardImg}>
                    <img src="/images/drakecover.jpeg" alt="abc" />
                  </div>
                  <div className={styles.prizeArtist}>
                    <img src={drake} alt="abc"/>
                  </div>
                  <div className={styles.span}>
                    <span>Drake</span>
                    <span>Knife Talk</span>
                  </div>
                </div>
                
                
            </div>
          </div>

          {/* POPULAR ALBUMS */}
          <div className={styles.container2} style={{marginTop:"7rem"}}>
            <div className='d-flex align-items-center justify-content-between'>
              <h2>Popular Albums</h2>
              <span className={styles.seeAll} onClick={()=> navigate("/seeAll/songs")}>See all</span>
            </div>
            <div ref={refSlider} className={styles.containerSlider}>
            {
                testCards.map((el, index) =>{
                  return(
                    <TopRatedCard
                      type="album"
                      key={index}
                      owner={"Soul Life"}
                      playlist={"Let's Party"}
                    />
                  )
                })
              }
            </div>
          </div>
        </div>
    </div>
  );
};

export default Home;
