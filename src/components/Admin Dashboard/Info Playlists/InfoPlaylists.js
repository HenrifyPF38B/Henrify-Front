import style from './InfoPLaylists.module.css'
import { useLocation } from 'react-router-dom'

const InfoPlaylists = () => {
  const location = useLocation()
  const hash = location.hash

  return (
    <div className={style.contain}>
      {hash === '#playlists' 
      ? <div className={style.content} id='playlists'>
          <h1>PLAYLISTS</h1>
        </div> 
      : ''  
    }
    </div>
  )
}

export default InfoPlaylists;