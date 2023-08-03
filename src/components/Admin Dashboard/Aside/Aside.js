import style from './Aside.module.css'
import { useNavigate } from "react-router-dom";
 

const Aside = () => {
  const navigate = useNavigate()

  return (
    <div className={style.content}>
      <div className={style.home} onClick={() => {navigate('/home')}}><i class='fa-solid fa-home'/> GO HOME</div>
      <div className={style.containEdits}>
        <a href='#users' className={style.edits}><i class='fa-solid fa-edit'/> USERS</a>
        <a href='#albums' className={style.edits}><i class='fa-solid fa-edit'/> ALBUMS</a>
        <a href='#songs' className={style.edits}><i class='fa-solid fa-edit'/> SONGS</a>
      </div>
    </div>
  )
}

export default Aside;