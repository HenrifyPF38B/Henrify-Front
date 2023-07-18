import React, { useState } from 'react'
import DropdownMenu from '../../components/dropdownMenu/dropdownMenu';
import styles from "./Store.module.css"
import SongCard from '../../components/Cards/songCard';
import AlbumCard from '../../components/Cards/albumCard';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015



const Store = () => {

  const quantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [searchValue, setSearchValue] = useState("");

  const optionsSearch = [
    {id: 1, label: 'Ariana Grande - 7 Rings'},
    {id: 2, label: 'Drake - Jumbotron Shit Poppin'},
    {id: 3, label: "Jack Harlow - What's Poppin"},
    {id: 4, label: "Aqua - Barbie Girl"},
    {id: 1, label: 'Travis Scott - Goosebumps'},
    {id: 2, label: 'Drake - Jimmy Cooks'},
    {id: 3, label: "Drake - God's Plan"},
    {id: 4, label: "Drake - Greece"},
    {id: 1, label: 'DaBaby - Suge'},
    {id: 2, label: 'Lenny Tavarez - La Neta'},
    {id: 3, label: "The Avengers - Pa Mi Remix"},
    {id: 4, label: "The Avengers - Toda Remix"},
  ];


  return ( 
    <div className={styles.wrapper}>
    
      <aside className={styles.sideBar}>
        <DropdownMenu />
      </aside>    
       <div className={styles.panel}>
        <h2 className={styles.title}>Our Store</h2>
        {/* <h2 className={styles.banner}>What do you want to hear today?</h2> */}
      <div className='d-flex align-items-center justify-content-center'>
        <div className={styles.searchBar}>
          <Typeahead
            placeholder='What do you want to listen today?'
            onChange={(selected) => setSearchValue(selected[0].id)}
            options={optionsSearch}
          />
        </div>
      </div>
      <div className={styles.cards}>
        {
          quantity.map((el, index) => {
            return(
              <AlbumCard
                key={index}
                artist="Ariana Grande"
                album="Sweetener"
              />
            )
          })
        }
      </div>
    </div>
    </div> 
   );
}
 
export default Store;