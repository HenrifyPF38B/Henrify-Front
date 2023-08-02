import style from './InfoComments.module.css'
import { useLocation } from 'react-router-dom'

const InfoComments = () => {
  const location = useLocation()
  const hash = location.hash

  return (
    <div className={style.contain}>
      {hash === '#comments' 
      ? <div className={style.content} id='comments'>
          <h1>COMMENTS</h1>
        </div> 
      : ''  
    }
    </div>
  )
}

export default InfoComments;