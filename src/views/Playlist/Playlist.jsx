import React, { useContext, useEffect } from 'react'
import styles from "./Playlist.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { PlaylistContext } from '../../contexts/playlistContext';


const Playlist = () => {

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const data = useContext(PlaylistContext);
  const { setPlayerOpen } = data;
  const navigate = useNavigate();


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.goBack} onClick={()=> navigate(-1)}>
          <i className="fa-solid fa-arrow-left fa-xl"></i>
        </div>
        <div className={styles.img}>
          <img src="/images/dababy.jpeg" alt="abc" />
        </div>
        <div className={styles.details}>
          <span>Playlist</span>
          <h1>RapCaviar</h1>
          <div className={styles.icons}>
            <div className={styles.play} onClick={()=> setPlayerOpen(true)}>
              <i className="fa-solid fa-play fa-2xl"></i>
            </div>
            <div className={styles.fav}>
              <i className="fa-solid fa-heart" style={{color:"whitesmoke"}}></i>
              {/* <i className="fa-regular fa-heart" style={{color:"whitesmoke"}}></i> */}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.down}>
        <table  className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th><i className="fa-regular fa-clock"></i></th>
            </tr>
          </thead>
          <tbody>
              {
                dummy.map((el, index) =>{
                  return(
                    <tr key={index} onClick={()=> setPlayerOpen(true)}>
                      <td style={{color:"#777777"}}>{index + 1}</td>
                      <td className={styles.tableTitle}>
                        <div>
                          <img src="/images/lil.jpeg" alt="abc" />
                        </div>
                        <div>
                          <span>DaBaby</span>
                          <span>Boogeyman</span>
                        </div>
                      </td>
                      <td style={{color:"#777777"}}>
                        <div className='d-flex align-items-center justify-content-end gap-20'>
                          <i className="fa-solid fa-heart" onClick={(e)=> e.stopPropagation()}></i>
                          <div className="dropdown playlist">
                            <i className="fa-solid fa-list-ul" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                            <div class="dropdown-menu mt-2 me-5" aria-labelledby="dropdownMenuButton" onClick={(e)=> e.stopPropagation()}>
                                <div className="dropdown-item">
                                  <input type="checkbox" id='1'/>
                                  <label htmlFor="1">Gym Playlist</label>
                                </div>
                                <div className="dropdown-item">
                                  <input type="checkbox" id='2'/>
                                  <label htmlFor="2">Party Playlist</label>
                                </div>
                                <div className="dropdown-item">
                                  <input type="checkbox" id='2'/>
                                  <label htmlFor="2">Study Playlist</label>
                                </div>
                            </div>
                          </div>
                          <span>3:07</span>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
          </tbody>
        </table>
      </div>
    </div>
   );
}
 
export default Playlist;