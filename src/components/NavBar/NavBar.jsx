import { Link } from "react-router-dom";
import style from './NavBar.module.css';
import icono from '../assets/nav.jpg';

const NavBar = () => {
  return (
    <div className={style.contenedor}>
      <img className={style.icon} src={icono} alt="" />      
      <Link className={style.menu} to="/home">Home</Link>
      <Link className={style.menu} to="/about">About</Link>
      <Link className={style.menu} to="/album">Albums</Link>
      <img className={style.icon2} src={icono} alt="" /> 
   </div>
  )
}

export default NavBar;