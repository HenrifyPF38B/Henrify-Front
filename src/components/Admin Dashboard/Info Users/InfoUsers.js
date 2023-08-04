import { useSelector } from 'react-redux';
import style from './InfoUsers.module.css'
import Card from '../Card/Card';
import Column from '../Column/Column';
import { FaUsers, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import { LuSettings2 } from 'react-icons/lu'

const InfoUsers = () => {
  const users = useSelector(state => state.users)

  return (
    <div className={style.contain}>
      <div className={style.content}>
          <Card icon={<FaUsers/>} title={'TOTAL USERS'} number={users.total}/>
          <Card icon={<FaUserCheck/>} title={'ACTIVE USERS'} number={users.activos}/>
          <Card icon={<FaUserTimes/>} title={'DISABLED USERS'} number={users.desactivados}/>
      </div>
      <div className={style.table}>
        <Column title={'id'} prop={'id'} content={users.data}/>
        <Column title={'user name'} prop={'userName'} content={users.data}/>
        <Column title={'email'} prop={'email'} content={users.data}/>
        <Column title={'status'} prop={'deleted'} content={users.data}/>
        <Column title={ <LuSettings2/> } prop={'edit'} content={users.data}  model={"users"}/>
      </div>
    </div>
  )
}

export default InfoUsers;