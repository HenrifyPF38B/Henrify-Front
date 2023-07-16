import React from 'react'
import styles from "../views/About/About.module.css"

const MemberTemplate = ({name, description, linkGit, linkIg, linkLn, linkUrl, isActive }) => {
  const picPath = () =>{
    if(name === "Ignacio"){
      return "/images/nachoPic.jpeg"
    };
    if(name === "Barbara"){
      return "/images/barbiePic.jpeg"
    };
    if(name === "Gabriela"){
      return "/images/gabiPic.jpeg"
    };
    if(name === "Diego"){
      return "/images/diegoPic.jpeg"
    };
    if(name === "Rocio"){
      return "/images/rocioPic.jpeg"
    };
    if(name === "Sofia"){
      return "/images/sofiaPic.jpeg"
    };
    if(name === "Jaider"){
      return "/images/jaiderPic.jpeg"
    };
    
  };
  return ( 
        <div className={`card-label ${isActive === name ? "active" : ""}`}>
          <div className={styles.slideCard}>
            <div className={styles.slideImage}>
              <img src={picPath()} alt="abc" />
            </div>
            <div className={styles.slideInfo}>
                <span className={styles.slideName}>{name}</span>
                <span className={styles.slideDescription}>{description}</span>
                <div className={styles.slideDetails}>
                  <span>Full Stack Developer</span>
                </div>
                {/* ACTIONS */}
                <div className={styles.slideLinks}>
                  <i className="fa-brands fa-github" onClick={()=> window.open(linkGit, "_blank")}></i>
                  <i className="fa-brands fa-instagram  fa-xl" onClick={()=> window.open(linkIg, "_blank")}></i>
                  <i className="fa-brands fa-linkedin-in" onClick={()=> window.open(linkLn, "_blank")}></i>
                  <i className="fa-solid fa-link" onClick={()=> window.open(linkUrl, "_blank")}></i>
                </div>
            </div>
          </div>
        </div>
   );
}
 
export default MemberTemplate;