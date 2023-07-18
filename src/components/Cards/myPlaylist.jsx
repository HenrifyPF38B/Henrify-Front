import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./myPlaylist.module.css";
import img from "../assets/dddd.png";
import arrow from "../assets/arrow.svg";
import { useState } from "react";


const MyPlaylist = () => {
 // const [menuAbierto, setMenuAbierto] = useState(false);
const navigate = useNavigate();
  const dummy = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2
  ];

  return (      
    <div className={styles.wrapper}>  
    <div className={styles.titulo}>  
      <h2 className={styles.title}>Your gallery, your music</h2>
      <div className={styles.createContainer}>
      <Link to='/create' className={styles.create}>Add a new playlist</Link>
      </div>
      </div> 
      <div className={styles.container1}>
        {dummy.map((el, index) => {
          return (
            <div className={styles.cardsContainer}>
              <div className={styles.image}>
                <img src={img} alt="playlist" />                 
               </div> 
               <div className={styles.playForListen} onClick={()=> navigate("/playlist")}>
                    <i class="fa-solid fa-play fa-2xl" style={{color:"#ee5700d3"}}></i>
                </div>
               <div className={styles.boxData}>
               <span className={styles.span}>Playlist #{index + 1}</span>
                <div className="dropdown">               
                  <i className="fa-solid fa-ellipsis fa-2xl myplaylist-menu" style={{color:"#ffffff"}} id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                  <div class="dropdown-menu mt-2" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="#">Edit</a>
                    <a className="dropdown-item" href="#">Rename</a>
                    <a className="dropdown-item" href="#">Delete</a>
                  </div>     
            
              </div>
            </div>
            </div>
          );
        })}
      </div>
    </div>
 
  );
};

export default MyPlaylist;
