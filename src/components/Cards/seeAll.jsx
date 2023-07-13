import React from 'react'
import styles from "./seeAll.module.css"
import TopRatedCard from './topRatedCard';
import { useNavigate, useParams } from 'react-router-dom';

const SeeAll = () => {

  const dummy = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7,]
  const navigate = useNavigate();

  const { name } = useParams();

  return ( 
    <div className={styles.wrapper}>
      <div className={styles.goBack} onClick={()=> navigate("/home")}>
        <i className="fa-solid fa-circle-chevron-left fa-2xl"></i>
      </div>
      <h2>Popular {name[0].toUpperCase() + name.slice(1)}</h2>
      <div className={styles.cards}>
        {
          dummy.map((el, index) =>{
            return(
              <TopRatedCard
                key={index}
                owner="Soul Life"
                playlist={"Rap Caviar"}
              />
            )
          })
        }
      </div>
    </div>
   );
}
 
export default SeeAll;