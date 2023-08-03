import { useSelector } from 'react-redux';
import style from './InfoUsers.module.css'
import Card from '../Card/Card';
import { FaUsers } from 'react-icons/fa';

const InfoUsers = () => {
  const users = useSelector(state => state.users)
  return (
    <div className={style.contain}>
      <div className={style.content}>
          <h1>USERS</h1>
          <Card icon={<FaUsers/>} title={'TOTAL USERS'} number={'30'}/>
        </div>
    </div>
  )
}

export default InfoUsers;