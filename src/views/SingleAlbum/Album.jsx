import React from 'react'
import styles from "./Album.module.css"


const SingleAlbum = () => {

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.img}>
          <img src="/images/certified.webp" alt="abc" />
        </div>
        <div className={styles.details}>
          <span>Album</span>
          <h1>Certified Lover Boy</h1>
          <div className={styles.bottom}>
            <div className='me-2'>
              <img src="/images/drake.jpeg" alt="" />
            </div>
            <span>Drake •&nbsp;</span>
            <span> 2023 •&nbsp;</span>
            <span> {dummy.length} •&nbsp;</span>
            <span> 30 min 20 sec</span>
          </div>
          
        </div>
      </div>
      <div className={styles.down}>
        <div className='d-flex align-items-start justify-content-start pb-4'>
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
                          <img src="/images/diana.jpeg" alt="abc" />
                        </div>
                        <div>
                          <span>Princess Diana</span>
                          <span>Ice Spice, Nicki Minaj</span>
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
 
export default SingleAlbum;