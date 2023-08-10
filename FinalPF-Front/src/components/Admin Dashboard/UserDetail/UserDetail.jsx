import { Link, useParams } from 'react-router-dom'
import style from './UserDetail.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  AiFillCheckCircle,
  AiFillEye,
  AiFillEyeInvisible,
} from 'react-icons/ai'
import { CiUser } from 'react-icons/ci'
import { FaShoppingCart } from 'react-icons/fa'
import {
  BsArrowLeftCircle,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
} from 'react-icons/bs'
import { getUsersById } from '../../../redux/Actions/UsersActions'

const UserDetail = () => {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [openCartItemIndex, setOpenCartItemIndex] = useState(null)

  const dispatch = useDispatch()
  const usersId = useSelector((state) => state.usersId)

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }
  const toggleShowCart = () => {
    setShowCart((prevShowCart) => !prevShowCart)
    setOpenCartItemIndex(null)
  }

  useEffect(() => {
    setIsLoading(true)

    dispatch(getUsersById(id))
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching user data:', error)
        setIsLoading(false)
      })
  }, [dispatch, id])

  if (isLoading) {
    return <div className={style.loading}>Loading...</div>
  }

  if (!usersId) {
    return <div>Data not available.</div>
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
      <div className={style.userCart}>
        <Link to="/admin/users" className={style.iconArrow}>
          <BsArrowLeftCircle />
        </Link>
        {usersId.cart && usersId.cart.length > 0 && (
          <button className={style.cartButton} onClick={toggleShowCart}>
            <FaShoppingCart className={style.iconCart} />
          </button>
        )}
      </div>
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
      {showCart && usersId.cart && usersId.cart.length > 0 && (
        <div className={style.cartContainer}>
          <h2>Cart Information</h2>
          {usersId.cart.map((item, index) => (
            <div key={index} className={style.cartItem}>
              <div
                className={`${style.inputData} ${style.cartItemHeader}`}
                style={{ cursor: 'pointer' }}
                onClick={() =>
                  setOpenCartItemIndex(
                    openCartItemIndex === index ? null : index
                  )
                }
              >
                <div className={style.collapseHeader}>
                  {openCartItemIndex === index ? (
                    <BsFillCaretUpFill />
                  ) : (
                    <BsFillCaretDownFill />
                  )}
                  <h6>Name: {item.name}</h6>
                  <h6>Owner: {item.owner}</h6>
                </div>
                {openCartItemIndex === index && (
                  <div className={style.collapseDetails}>
                    <div>
                      <h6>Price: {item.price}</h6>
                      <h6>Quantity: {item.quantity}</h6>
                    </div>
                    <img
                      src={item.image}
                      alt="Album"
                      className={style.albumPhoto}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserDetail
