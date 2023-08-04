import style from "./Column.module.css";
import { BsInfoLg } from 'react-icons/bs'
import { FaTrashCan } from 'react-icons/fa6'
import { useDispatch } from "react-redux";
import { deleteSongs } from "../../../redux/Actions/SongsActions";
import { deleteAlbums  } from "../../../redux/Actions/AlbumsActions";
import { deleteUsers } from "../../../redux/Actions/UsersActions";

const Column = ({ title, content, prop, model }) => {
  const dispatch = useDispatch()

  const handlerClick = (model, id) => {
    if(model === "songs"){
      dispatch(deleteSongs(id))
    }
    else if(model === "albums"){
      dispatch(deleteAlbums(id))
    }
    else if(model === "users"){
      dispatch(deleteUsers(id))

    }
  }
  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>
      {prop === "edit" ? (
        <div className={style.content}>
          {content?.map((value, i) => {
            return (
              <div className={style.value} key={i}>
                <BsInfoLg  className={style.icon}/>
                <FaTrashCan onClick={() => handlerClick(model, value.id) } className={style.iconTrash}/>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={style.content}>
          {content?.map((value, i) => {
            return (
              <div className={style.value} key={i}>
                { prop === 'explicit' ? (value.explicit === true ? 'yes' : 'no') : '' }
                {prop === 'deleted'  ? (value.deleted === true ? <span className={style.disabled}>Disabled</span> : <span className={style.active}>Active</span> ): value[prop]}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Column;
