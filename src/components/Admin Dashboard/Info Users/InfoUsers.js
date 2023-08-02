import style from './InfoUsers.module.css'
import { useLocation } from 'react-router-dom';

const InfoUsers = () => {
  const location = useLocation()
  const hash = location.hash

  return (
    <div className={style.contain}>
      {hash === '#users' 
      ? <div className={style.content} id='users'>
          <h1>USERS</h1>
          <div className={style.cartita}>
            <div className={style.icon}><i class='fa-solid fa-user'></i> 20</div>
            <h3 className={style.title}>Total Users</h3>
          </div>
        </div> 
      : ''
      }
    </div>
  )
}

export default InfoUsers;