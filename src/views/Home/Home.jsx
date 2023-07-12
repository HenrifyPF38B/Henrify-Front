import React, {useContext} from 'react'
import styles from "./Home.module.css";
import TopRatedCard  from "../../components/Cards/topRatedCard"
import { PlaylistContext } from "../../contexts/playlistContext";
import PlaylistModal from "../../modals/playlistModal";

const Home = () => { 

  const testCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 2, 3, 4, 5];
  const data = useContext(PlaylistContext);
  const { modalOpen, setModalOpen } = data;

  return (
    <div className={styles.container}>
      {
       modalOpen && <PlaylistModal setModalOpen={setModalOpen}/>
      }
      <h1 className={styles.name}>Soul Life</h1>
      <div className={styles.container2}>
        <h2 className={styles.h2}>Lo más escuchado</h2>
        <div className={styles.cardsWrapper}>
          {
            testCards.map((el, index) =>{
              return(
                <TopRatedCard
                  key={index}
                  artist={"Drake"}
                  song={"Jimmy Cooks"}
                />
              )
            })
          }
        </div>
      </div>
      <aside>
        <h2 className={styles.temas}>Todos los temas</h2>
        <div className={styles.container3}>
          <h3>Un espacio para escuchar lo que pide tu día</h3>
        </div>
      </aside>
    </div>
  );
};

export default Home;
