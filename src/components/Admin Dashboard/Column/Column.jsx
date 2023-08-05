import style from "./Column.module.css";
import { BsInfoLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { deleteSongs } from "../../../redux/Actions/SongsActions";
import { deleteAlbums } from "../../../redux/Actions/AlbumsActions";
import { deleteUsers } from "../../../redux/Actions/UsersActions";

const Column = ({ title, content, prop, model }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  const handleIconClick = (id) => {
    navigate(`/admin/users/${id}`)
  }

  const handlerClick = (model, id) => {
    if (model === "songs") {
      dispatch(deleteSongs(id));
    } else if (model === "albums") {
      dispatch(deleteAlbums(id));
    } else if (model === "users") {
      dispatch(deleteUsers(id));
    }
  };
  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>
      {prop === "edit" ? (
        <div className={style.content}>
          {content?.map((value, i) => {
            return (
              <div className={style.value} key={i}>
                <button className={style.btnIcon} onClick={() => handleIconClick(value.id)}>
                  <BsInfoLg className={style.icon} />
                </button>
                <FaTrashCan
                  onClick={() => handlerClick(model, value.id)}
                  className={style.iconTrash}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className={style.content}>
          {content?.map((value, i) => {
            return (
              <div className={style.value} key={i}>
                {prop === "explicit" ? (
                  value.explicit === true ? (
                    <span className={style.deleted}>yes</span>
                  ) : (
                    <span className={style.active}>no</span>
                  )
                ) : (
                  ""
                )}
                {prop === "deleted" ? (
                  value.deleted === true ? (
                    <span className={style.disabled}>Disabled</span>
                  ) : (
                    <span className={style.active}>Active</span>
                  )
                ) : (
                  value[prop]
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Column;
