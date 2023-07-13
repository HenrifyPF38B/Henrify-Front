import style from "./dropdownMenu.module.css";
//import dash from "../assets/dashboard.svg";
import not from "../assets/notamusica.svg";
import arrow from "../assets/arrow.svg";


const DropdownMenu = () => {
  const genderHandleClick = () => {
    const genderList = document.getElementById("genderList");
    const isListShown = genderList.style.height !== "0px";

    if (isListShown) {
      genderList.style.height = "0";
    } else {
      genderList.style.height = genderList.scrollHeight + "px";
    }
  };
  const modHandleClick = () => {
    const modList = document.getElementById("modList");
    const isListShown = modList.style.height !== "0px";

    if (isListShown) {
      modList.style.height = "0";
    } else {
      modList.style.height = modList.scrollHeight + "px";
    }
  };
  const themesHandleClick = () => {
    const themesList = document.getElementById("themesList");
    const isListShown = themesList.style.height !== "0px";

    if (isListShown) {
      themesList.style.height = "0";
    } else {
      themesList.style.height = themesList.scrollHeight + "px";
    }
  };
  const decadeHandleClick = () => {
    const decadeList = document.getElementById("decadeList");
    const isListShown = decadeList.style.height !== "0px";

    if (isListShown) {
      decadeList.style.height = "0";
    } else {
      decadeList.style.height = decadeList.scrollHeight + "px";
    }
  };
  const specialHandleClick = () => {
    const specialList = document.getElementById("specialList");
    const isListShown = specialList.style.height !== "0px";

    if (isListShown) {
      specialList.style.height = "0";
    } else {
      specialList.style.height = specialList.scrollHeight + "px";
    }
  };

  return (

    <div className={style.nav}>
      <ul className={style.list}>
        <li className={style.list_item}>
          <h4 className={style.tit}>
            Advanced Search
          </h4>
        </li>

        <li className={style.list_item}>
          <div
            className={`${style.list_button} 
            ${style.list_buttonClick}`}
            onClick={genderHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <a href="#" className={style.nav_link}>
              Genders
            </a>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="genderList">
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Electrónica
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Rock
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Hiphop
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Country
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Indie
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Cumbia
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Reggaeton
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Pop
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                R&B
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Soul
              </a>
            </li>
          </ul>
        </li>

        <li className={style.list_item}>
          <div
            className={`${style.list_button} 
            ${style.list_buttonClick}`}
            onClick={modHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <a href="#" className={style.nav_link}>
              Feelings
            </a>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="modList">
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Alegre
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Sentimental
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Ensueño
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Animada
              </a>
            </li>
           
          </ul>
        </li>

        <li className={style.list_item}>
          <div
            className={`${style.list_button} 
            ${style.list_buttonClick}`}
            onClick={decadeHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <a href="#" className={style.nav_link}>
              Decade
            </a>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="decadeList">
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                60s
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
               70s
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
               80s
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                90s
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                2000-2010
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                2020 +
              </a>
            </li>
            
          </ul>
        </li>
        <li className={style.list_item}>
          <div
            className={`${style.list_button}
             ${style.list_buttonClick}`}
            onClick={themesHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <a href="#" className={style.nav_link}>
              Themes
            </a>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="themesList">
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Tema:
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                 Tema:
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                 Tema:
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                 Tema:
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                 Tema:
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                 Tema:
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                 Tema:
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                 Tema:
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Tema:
              </a>
            </li>
          </ul>
        </li>

        <li className={style.list_item}>
          <div
            className={`${style.list_button}
             ${style.list_buttonClick}`}
            onClick={specialHandleClick}
          >
            <img src={not} className={style.list__img} alt="icon" />
            <a href="#" className={style.nav_link}>
             Our selection
            </a>
            <img src={arrow} className={style.list__arrow} alt="arrow icon" />
          </div>

          <ul className={style.list__show} id="specialList">
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Concentration
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                More Soul
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Hard Work
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Party night
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Mates y music
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Feelings chill
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Training
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                Vacations
              </a>
            </li>
            <li className={style.list__inside}>
              <a
                href="#"
                className={`${style.nav__link} ${style.nav__linkinside}`}
              >
                In the morning
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default DropdownMenu;
