import style from './Card.module.css'

const Card = ({icon, title, number}) => {
  return (
    <div className={style.container}>
      <div className={style.info}>
        <div className={style.content}>
          <div className={style.icon}>{icon}</div>
          <h2 className={style.number}>{number}</h2>
        </div>
      </div>
      <h3 className={style.title}>{title}</h3>
    </div>
  )
}

export default Card;