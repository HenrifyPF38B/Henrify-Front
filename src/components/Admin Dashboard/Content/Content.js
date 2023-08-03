import { Outlet } from 'react-router-dom';
import Aside from '../Aside/Aside';
import Nav from '../NavBar/Nav'
import style from './Content.module.css'
import Card from '../Card/Card';
import { FaUsers } from 'react-icons/fa'

const Content = () => {
  return(
    <div className={style.content}>
      <Nav/>
      <Aside/>
      <Outlet/>
      <Card icon={<FaUsers/>} title={'TOTAL USERS'} number={'30'}/>
    </div>
  )
}

export default Content;