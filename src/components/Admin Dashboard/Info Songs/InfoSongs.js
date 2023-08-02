import style from './InfoSongs.module.css'
import { useLocation } from 'react-router-dom'

const InfoSongs = () => {
  const location = useLocation()
  const hash = location.hash

  return (
    <div className={style.contain}>
      {hash === '#songs' 
      ? <div className={style.content} id='songs'>
          <h1>SONGS</h1>
        </div> 
      : ''  
    }
    </div>
  )
}

export default InfoSongs;