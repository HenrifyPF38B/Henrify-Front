import { Outlet } from 'react-router-dom';
import Aside from '../Aside/Aside';
import Nav from '../NavBar/Nav'
import style from './Content.module.css'
import Card from '../Card/Card';
import { FaUsers } from 'react-icons/fa'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../../redux/Actions/UsersActions';
import { getAlbums } from '../../../redux/Actions/AlbumsActions';
import { getSongs } from '../../../redux/Actions/SongsActions';

const Content = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers())
    dispatch(getAlbums())
    dispatch(getSongs())
  }, [])

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