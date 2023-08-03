import style from './Aside.module.css'
import { useNavigate } from "react-router-dom";
 

const Aside = () => {
  const navigate = useNavigate()

  return (
    <div className={style.content}>
      <div className={style.home} onClick={() => {navigate('/home')}}><i class='fa-solid fa-home'/> GO HOME</div>
      <div className={style.containEdits}>
        <div onClick={() => navigate('users')} className={style.edits}><i class='fa-solid fa-edit'/> USERS</div>
        <div onClick={() => navigate('albums')} className={style.edits}><i class='fa-solid fa-edit'/> ALBUMS</div>
        <div onClick={() => navigate('songs')} className={style.edits}><i class='fa-solid fa-edit'/> SONGS</div>
      </div>
    </div>
  )
}

export default Aside;