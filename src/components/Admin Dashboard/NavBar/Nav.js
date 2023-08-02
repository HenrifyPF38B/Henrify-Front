import icono from '../../assets/logo.png';
import style from './Nav.module.css'

const AdminDashboard = () => {
  return (
    <div className={style.nav}>
          <img className={style.icon} src={icono} alt="abc"/> 
          <h1 className={style.title}>ADMIN ACCOUNT</h1> 
    </div>
  )
}

export default AdminDashboard;