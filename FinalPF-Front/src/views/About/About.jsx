import React, { useRef, useState } from "react";
import MemberTemplate from "../../templates/membersT";
import { Link } from "react-router-dom";
import styles from './About.module.css';

const About = ({ refPanel, panelUp }) => {
  const refNacho = useRef();
  const refBarbi = useRef();
  const refGabi = useRef();
  const refDiego = useRef();
  const refRocio = useRef();
  const refSofia = useRef();
  const refJaider = useRef();
  const refAlvaro = useRef();

  const members = [
    {
      name: "Barbara",
      description:
        "Barbara, from Argentina. 28 Years Old, Full Stack Developer",
      linkGit: "https://github.com/barbilusenra",
      linkIg: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn: "https://linkedin.com/in/bárbara-lucía-senra",
      linkUrl: "https://github.com/HenrifyPF38B/Henrify-Front",
    },
    {
      name: "Diego",
      description: "Diego, from Colombia. 38 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn: "https://www.linkedin.com/in/diegohurtado-sales-saas",
      linkUrl: "https://github.com/HenrifyPF38B/Henrify-Front",
    },
    {
      name: "Gabriela",
      description:
        "Gabriela, from Venezuela. 18 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkUrl: "https://github.com/HenrifyPF38B/Henrify-Front",
    },
    {
      name: "Ignacio",
      description:
        "Ignacio, from Argentina. 23 Years Old, Full Stack Developer",
      linkGit: "https://github.com/3003mgf",
      linkIg: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn: "https://www.linkedin.com/in/marcelo-cruz-ignacio-gramajo-feijoo-03932b257/",
      linkUrl: "https://mgf-world.netlify.app/",
    },
    {
      name: "Jaider",
      description: "Jaider, from Colombia. 20 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn: "https://www.linkedin.com/in/jaider-nieto-588567238",
      linkUrl: "https://github.com/HenrifyPF38B/Henrify-Front",
    },
    {
      name: "Rocio",
      description: "Rocio, from Peru. 39 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn: "https://www.linkedin.com/in/rocio-cosme-yonemitsu/",
      linkUrl: "https://github.com/HenrifyPF38B/Henrify-Front",
    },
    {
      name: "Sofia",
      description: "Sofia, from Colombia. 20 Years Old, Full Stack Developer",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn: "http://linkedin.com/in/marian-sofia-gutierrez-76b891267",
      linkUrl: "https://github.com/HenrifyPF38B/Henrify-Front",
    },
    {
      name: "Alvaro",
      description: "Alvaro, from Chile. 26 Years Old, Full Stack Developer.",
      linkGit: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkIg: "https://github.com/HenrifyPF38B/Henrify-Front",
      linkLn: "http://linkedin.com/in/alvaro-rivera-fernandez",
      linkUrl: "https://github.com/HenrifyPF38B/Henrify-Front",
    },
  ];

  const [isActive, setIsActive] = useState("Alvaro");
  const [blockByAudio, setBlockByAudio] = useState(false);

  const handleActive = (e) => {
    
    if (!blockByAudio) {
      setBlockByAudio(true);
      setIsActive(e.target.dataset.name);
      

      if(e.target.dataset.name === "Ignacio"){
        refNacho.current.play();
        refNacho.current.addEventListener("ended", (e) => {
          setBlockByAudio(false);
        });
      }

      if(e.target.dataset.name === "Barbara"){
        refBarbi.current.play();
        refBarbi.current.addEventListener("ended", (e) => {
          setBlockByAudio(false);
        });
      }

      if(e.target.dataset.name === "Gabriela"){
        refGabi.current.play();
        refGabi.current.addEventListener("ended", (e) => {
          setBlockByAudio(false);
        });
      }

      if(e.target.dataset.name === "Diego"){
        refDiego.current.play();
        refDiego.current.addEventListener("ended", (e) => {
          setBlockByAudio(false);
        });
      }

      if(e.target.dataset.name === "Rocio"){
        refRocio.current.play();
        refRocio.current.addEventListener("ended", (e) => {
          setBlockByAudio(false);
        });
      }

      if(e.target.dataset.name === "Sofia"){
        refSofia.current.play();
        refSofia.current.addEventListener("ended", (e) => {
          setBlockByAudio(false);
        });
      }

      if(e.target.dataset.name === "Jaider"){
        refJaider.current.play();
        refJaider.current.addEventListener("ended", (e) => {
          setBlockByAudio(false);
        });
      }

      if(e.target.dataset.name === "Alvaro"){
        refAlvaro.current.play();
        refAlvaro.current.addEventListener("ended", (e) => {
          setBlockByAudio(false);
        });
      }
    }
  };

  return (
    <div ref={refPanel} className={styles.landingPanelWrapper} id="landing-panel">
      <audio ref={refNacho} src={`/audio/Ignacio.wav`}></audio>
      <audio ref={refBarbi} src={`/audio/Barbi.wav`}></audio>
      <audio ref={refGabi} src={`/audio/Gabi.wav`}></audio>
      <audio ref={refDiego} src={`/audio/Diego.wav`}></audio>
      <audio ref={refRocio} src={`/audio/Rocio.wav`}></audio>
      <audio ref={refSofia} src={`/audio/Sofia.wav`}></audio>
      <audio ref={refJaider} src={`/audio/Jaider.wav`}></audio>
      <audio ref={refAlvaro} src={`/audio/Alvaro.wav`}></audio>

      <div className={styles.landingPanelTitle}>
        <h2>Who are we?</h2>
      </div>
      <div className={styles.landingContainer}>
        <div className={styles.landingPanelMembers}>
          <ul className="panel-ul">
            <li
              style={{ zIndex: 9 }}
              className={isActive === "Alvaro" ? "active" : ""}
            >
              <span onClick={handleActive} data-name="Alvaro">
                Alvaro
              </span>
            </li>
            <li
              style={{ zIndex: 8 }}
              className={isActive === "Barbara" ? "active" : ""}
            >
              <span onClick={handleActive} data-name="Barbara">
                Barbara
              </span>
            </li>
            <li
              style={{ zIndex: 7 }}
              className={isActive === "Diego" ? "active" : ""}
            >
              <span onClick={handleActive} data-name="Diego">
                Diego
              </span>
            </li>
            <li
              style={{ zIndex: 5 }}
              className={isActive === "Gabriela" ? "active" : ""}
            >
              <span onClick={handleActive} data-name="Gabriela">
                Gabriela
              </span>
            </li>
            <li
              style={{ zIndex: 4 }}
              className={isActive === "Ignacio" ? "active" : ""}
            >
              <span onClick={handleActive} data-name="Ignacio">
                Ignacio
              </span>
            </li>
            <li
              style={{ zIndex: 3 }}
              className={isActive === "Jaider" ? "active" : ""}
            >
              <span onClick={handleActive} data-name="Jaider">
                Jaider
              </span>
            </li>
            <li
              style={{ zIndex: 2 }}
              className={isActive === "Rocio" ? "active" : ""}
            >
              <span onClick={handleActive} data-name="Rocio">
                Rocio
              </span>
            </li>
            <li
              style={{ zIndex: 1 }}
              className={isActive === "Sofia" ? "active" : ""}
            >
              <span onClick={handleActive} data-name="Sofia">
                Sofia
              </span>
            </li>
          </ul>
        </div>
        <div className={styles.landingMembers}>
          <div className={styles.sliderContainer}>
            
            <div className={styles.sliderCards}>
              {members.map((el, index) => {
                return (
                  <MemberTemplate
                    isActive={isActive}
                    key={index}
                    indicator={index + 1}
                    name={el.name}
                    description={el.description}
                    linkGit={el.linkGit}
                    linkIg={el.linkIg}
                    linkLn={el.linkLn}
                    linkUrl={el.linkUrl}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


/*
<input
              onClick={(e) => e.preventDefault()}
              type="radio"
              name="slider"
              id="s1"
              checked={isActive === "Barbara" ? true : false}
            />
            <input
              onClick={(e) => e.preventDefault()}
              type="radio"
              name="slider"
              id="s2"
              checked={isActive === "Diego" ? true : false}
            />
            <input
              onClick={(e) => e.preventDefault()}
              type="radio"
              name="slider"
              id="s3"
              checked={isActive === "Fauter" ? true : false}
            />
            <input
              onClick={(e) => e.preventDefault()}
              type="radio"
              name="slider"
              id="s4"
              checked={isActive === "Gabriela" ? true : false}
            />
            <input
              onClick={(e) => e.preventDefault()}
              type="radio"
              name="slider"
              id="s5"
              checked={isActive === "Ignacio" ? true : false}
            />
            <input
              onClick={(e) => e.preventDefault()}
              type="radio"
              name="slider"
              id="s6"
              checked={isActive === "Jaider" ? true : false}
            />
            <input
              onClick={(e) => e.preventDefault()}
              type="radio"
              name="slider"
              id="s7"
              checked={isActive === "Rocio" ? true : false}
            />
            <input
              onClick={(e) => e.preventDefault()}
              type="radio"
              name="slider"
              id="s8"
              checked={isActive === "Sofia" ? true : false}
            /> */