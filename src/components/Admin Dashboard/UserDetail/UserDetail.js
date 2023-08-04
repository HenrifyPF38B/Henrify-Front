import { useParams } from 'react-router-dom'
import style from './UserDetail.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUsersById } from '../../../redux/Actions/UsersActions'
import { useState } from 'react'
import {
  AiFillCheckCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'

const UserDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const usersId = useSelector((state) => state.usersId)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    dispatch(getUsersById(id))
  }, [dispatch, id])

  // Manejo de datos no disponibles
  if (!usersId) {
    return <div>Loading...</div>
  }
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }
  const fechaISO = usersId.memberExpire
  const fecha = new Date(fechaISO)

  const opcionesFecha = { day: '2-digit', month: 'long', year: 'numeric' }
  const opcionesHora = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }

  const fechaFormateada = fecha.toLocaleString(undefined, opcionesFecha)
  const horaFormateada = fecha.toLocaleString(undefined, opcionesHora)

  return (
    <div className={style.userDetailContainer}>
      <h1 className={style.userInformation}>
        <CiUser /> User information
      </h1>
      <div className={style.headerDetail}>
        <div className={style.nameUser}>
          {usersId.userName && <h1> User: {usersId.userName}</h1>}
          {usersId.id && <h6> Id: {usersId.id}</h6>}
        </div>
        {usersId.avatar && (
          <img
            className={style.imageAvatar}
            src={usersId.avatar}
            alt="User Avatar"
          />
        )}
      </div>
      <div className={style.inputData}>
        {usersId.email && <h6>Email: {usersId.email}</h6>}
        {usersId.password && (
          <div className={style.passwordContainer}>
            <h6 className={style.passwordTitle}>Password </h6>
            <div className={style.password}>
              {showPassword && <h6> {usersId.password}</h6>}
              <button
                className={style.btnPassword}
                onClick={toggleShowPassword}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className={style.inputData}>
        {usersId.firstName && <h6>First Name: {usersId.firstName}</h6>}
        {usersId.lastName && <h6>Last Name: {usersId.lastName}</h6>}
      </div>
      {(usersId.memberExpire || usersId.googleUser) && (
        <div className={style.inputData}>
          {usersId.googleUser && (
            <h6>
              Login with google:
              <AiFillCheckCircle className={style.icon} />
            </h6>
          )}
          {usersId.memberExpire && (
            <h6>
              Member Expire: {fechaFormateada} - {horaFormateada}
            </h6>
          )}
        </div>
      )}
    </div>
  )
}

export default UserDetail
