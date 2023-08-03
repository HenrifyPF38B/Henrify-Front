import { useSelector } from 'react-redux';
import style from './InfoUsers.module.css'
import Card from '../Card/Card';
import { FaUsers } from 'react-icons/fa';

const InfoUsers = () => {
  const users = useSelector(state => state.users)
  console.log(users)
  return (
    <div className={style.contain}>
      <div className={style.content}>
          <Card icon={<FaUsers/>} title={'TOTAL USERS'} number={'0'}/>
        </div>
    </div>
  )
}

export default InfoUsers;