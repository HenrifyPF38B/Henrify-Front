import { Outlet } from 'react-router-dom';
import Aside from '../Aside/Aside';
import Nav from '../NavBar/Nav'
import style from './Content.module.css'
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
    </div>
  )
}

export default Content;