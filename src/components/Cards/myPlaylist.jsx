import React from "react";
import { Link } from "react-router-dom";
import styles from "./myPlaylist.module.css";
import img from "../assets/dddd.png";
import arrow from "../assets/arrow.svg";
import { useState } from "react";

const MyPlaylist = () => {
 // const [menuAbierto, setMenuAbierto] = useState(false);

  const dummy = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4,
  ];

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Your gallery, your music</h2>
      <Link to='/create' className={styles.create}>Create</Link>
      <div className={styles.container1}>
        {dummy.map((el, index) => {
          return (
            <div className={styles.cardsContainer}>
              <div className={styles.image}>
                <img src={img} alt="playlist" />
                <div className="dropdown">
                  <i className="fa-solid fa-ellipsis fa-2xl myplaylist-menu" style={{color:"#1f1f1f"}} id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"/>
                  <div class="dropdown-menu mt-2" aria-labelledby="dropdownMenuLink">
                    <a className="dropdown-item" href="#">Edit</a>
                    <a className="dropdown-item" href="#">Rename</a>
                    <a className="dropdown-item" href="#">Delete</a>
                  </div>
                </div>
              </div>
              <span className={styles.span}>Playlist #{index + 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPlaylist;
