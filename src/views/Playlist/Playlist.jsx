import React from 'react'
import styles from "./Playlist.module.css"


const Playlist = () => {

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.img}>
          <img src="/images/dababy.jpeg" alt="abc" />
        </div>
        <div className={styles.details}>
          <span>Playlist</span>
          <h1>RapCaviar</h1>
          <div className={styles.icons}>
            <div className={styles.play}>
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
                    <tr key={index}>
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
                      <td style={{color:"#777777"}} className='text-center'>3:07</td>
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