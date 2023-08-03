import Aside from '../Aside/Aside';
import InfoUsers from '../Info Users/InfoUsers';
import InfoSongs from '../Info Songs/InfoSongs';
import InfoAlbums from '../Info Albums/InfoAlbums';
import Nav from '../NavBar/Nav'
import style from './Content.module.css'

const Content = () => {
  return(
    <div className={style.content}>
      <Nav/>
      <Aside/>
      <InfoUsers/>
      <InfoSongs/>
      <InfoAlbums/>
    </div>
  )
}

export default Content;