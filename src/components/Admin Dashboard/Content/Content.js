import { Outlet } from 'react-router-dom';
import Aside from '../Aside/Aside';
import Nav from '../NavBar/Nav'
import style from './Content.module.css'

const Content = () => {
  return(
    <div className={style.content}>
      <Nav/>
      <Aside/>
      <Outlet/>
    </div>
  )
}

export default Content;