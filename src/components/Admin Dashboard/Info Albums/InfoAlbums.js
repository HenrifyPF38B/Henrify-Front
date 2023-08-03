import { useSelector } from 'react-redux';
import style from './InfoAlbums.module.css'

const InfoAlbums = () => {
  const albums = useSelector(state => state.albums)
  return (
    <div className={style.contain}>
      <div className={style.content} id='albums'>
        <h1>ALBUMS</h1>
      </div> 
    </div>
  )
}

export default InfoAlbums;