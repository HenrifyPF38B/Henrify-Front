import style from "./Column.module.css";
import { BsInfoLg } from 'react-icons/bs'
import { FaTrashCan } from 'react-icons/fa6'

const Column = ({ title, content, data, prop }) => {
  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>
      {prop === 'edit' ? (
        <div className={style.content}>
          {content?.map((value, i) => {
            return (
              <div className={style.value} key={i}>
                <BsInfoLg className={style.icon}/>
                <FaTrashCan className={style.iconTrash}/>
              </div>
            )
          })}
        </div>
      ) : (
        <div className={style.content}>
          {content?.map((value, i) => {
            return (
              <div className={style.value} key={i}>
                {prop === 'deleted'  ? (value === true ? <span className={style.disabled}>Disabled</span> : <span className={style.active}>Active</span> ): value[prop] }
                
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Column;
