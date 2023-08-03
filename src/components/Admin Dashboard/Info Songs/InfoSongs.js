import { useSelector } from 'react-redux'
import style from './InfoSongs.module.css'
const InfoSongs = () => {
  const songs = useSelector(state => state.songs)
  return (
    <div className={style.contain}>
      <div className={style.content}>
        <h1>SONGS</h1>
      </div>
    </div>
  )
}

export default InfoSongs;