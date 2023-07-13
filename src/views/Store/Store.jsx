import React from 'react'
import DropdownMenu from '../../components/dropdownMenu/dropdownMenu';
import styles from "./Store.module.css"
import TopRatedCard from '../../components/Cards/topRatedCard';

const Store = () => {


  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return ( 
    <div className={styles.wrapper}>
      <aside className={styles.sideBar}>
        <DropdownMenu />
      </aside>
      <div className={styles.cards}>
        {
          quantity.map((el, index) => {
            return(
              <TopRatedCard
                type="Song"
                key={index}
                owner="Barbie"
                playlist="7 Rings"
              />
            )
          })
        }
      </div>
    </div>
   );
}
 
export default Store;