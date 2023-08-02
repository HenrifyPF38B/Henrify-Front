import style from './InfoAlbums.module.css'
import { useLocation } from 'react-router-dom'

const InfoAlbums = () => {
  const location = useLocation()
  const hash = location.hash

  return (
    <div className={style.contain}>
      {hash === '#albums' 
      ? <div className={style.content} id='albums'>
          <h1>ALBUMS</h1>
        </div> 
      : ''  
    }
    </div>
  )
}

export default InfoAlbums;