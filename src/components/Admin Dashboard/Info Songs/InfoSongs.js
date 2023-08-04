import { useSelector } from 'react-redux'
import style from './InfoSongs.module.css'
import Card from '../Card/Card'
import { GiMusicalNotes } from 'react-icons/gi'
import { IoMdMusicalNotes } from 'react-icons/io'
import { LuSettings2 } from 'react-icons/lu'
import Column from '../Column/Column'

const InfoSongs = () => {
  const songs = useSelector(state => state.songs)

  return (
    <div className={style.contain}>
      <div className={style.content}>
        <Card icon={<GiMusicalNotes/>} title={'TOTAL SONGS'} number={songs.total} />
        <Card icon={<IoMdMusicalNotes/>} title={'EXPLICIT SONGS'} number={songs.totalExplicit} />
      </div>
      <div className={style.table}>
        <Column title={'id'} prop={'id'} content={songs.data}/>
        <Column title={'name'} prop={'name'} content={songs.data}/>
        <Column title={'explicit'} prop={'explicit'} content={songs.data}/>
        <Column title={'popularity'} prop={'popularity'} content={songs.data}/>
        <Column title={'status'} prop={'deleted'} content={songs.data}/>
        <Column title={ <LuSettings2/> } prop={'edit'} content={songs.data} model={"songs"} />
      </div>
    </div>
  )
}

export default InfoSongs;