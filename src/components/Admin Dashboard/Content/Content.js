import Aside from '../Aside/Aside';
import InfoAlbums from '../Info Albums/InfoAlbums';
import InfoComments from '../Info Comments/InfoComments';
import InfoMemberships from '../Info Memberchips/InfoMemberships';
import InfoPlaylists from '../Info Playlists/InfoPlaylists';
import InfoSongs from '../Info Songs/InfoSongs';
import InfoUsers from '../Info Users/InfoUsers';
import Nav from '../NavBar/Nav'
import style from './Content.module.css'

const Content = () => {
  return(
    <div className={style.content}>
      <Nav/>
      <Aside/>
      <InfoUsers/>
      <InfoComments/>
      <InfoMemberships/>
      <InfoSongs/>
      <InfoAlbums/>
      <InfoPlaylists/>
    </div>
  )
}

export default Content;