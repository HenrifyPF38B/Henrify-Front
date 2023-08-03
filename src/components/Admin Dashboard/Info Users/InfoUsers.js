import { useSelector } from 'react-redux';
import style from './InfoUsers.module.css'

const InfoUsers = () => {
  const users = useSelector(state => state.users)
  return (
    <div className={style.contain}>
      <div className={style.content} id='users'>
          <h1>USERS</h1>
          <div className={style.cartita}>
            <div className={style.icon}><i class='fa-solid fa-user'></i> 20</div>
            <h3 className={style.title}>Total Users</h3>
          </div>
        </div>
    </div>
  )
}

export default InfoUsers;