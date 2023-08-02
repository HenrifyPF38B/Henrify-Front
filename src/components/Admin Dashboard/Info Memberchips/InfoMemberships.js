import style from './InfoMemberships.module.css'
import { useLocation } from 'react-router-dom'

const InfoMemberships = () => {
  const location = useLocation()
  const hash = location.hash

  return (
    <div className={style.contain}>
      {hash === '#memberships' 
      ? <div className={style.content} id='memberships'>
          <h1>MEMBERSHIPS</h1>
        </div> 
      : ''  
    }
    </div>
  )
}

export default InfoMemberships;