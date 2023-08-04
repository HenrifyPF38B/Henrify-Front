import { useSelector } from 'react-redux'
import style from './InfoSongs.module.css'
import Card from '../Card/Card'
import { GiMusicalNotes } from 'react-icons/gi'
import { IoMdMusicalNotes } from 'react-icons/io'

const InfoSongs = () => {
  const songs = useSelector(state => state.songs)
  return (
    <div className={style.contain}>
      <div className={style.cardContainer}>
        <Card icon={<GiMusicalNotes/>} title={'TOTAL SONGS'} number={songs.total} />
        <Card icon={<IoMdMusicalNotes/>} title={'EXPLICIT SONGS'} number={songs.totalExplicit} />
      </div>
      <div className={style.tabla}>
        
      </div>
    </div>
  )
}

export default InfoSongs;