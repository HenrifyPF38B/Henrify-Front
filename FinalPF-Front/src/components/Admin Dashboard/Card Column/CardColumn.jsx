import { useState, useEffect } from "react";
import style from "./CardColumn.module.css";
import { BsInfoLg } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteSongs } from "../../../redux/Actions/SongsActions";
import { deleteAlbums } from "../../../redux/Actions/AlbumsActions";
import { deleteUsers } from "../../../redux/Actions/UsersActions";
import { useNavigate } from "react-router-dom";

const CardColumn = ({ prop, value, i, model }) => {
  const [status, setStatus] = useState(value.deleted);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleIconClick = (id) => {
    navigate(`/admin/${model}/${id}`);
  };

  const handlerClick = (id, model) => {
    if (model === "songs") {
      dispatch(deleteSongs(id));
      window.location.reload()
    } else if (model === "albums") {
      dispatch(deleteAlbums(id));
      window.location.reload()
    } else if (model === "users") {
      dispatch(deleteUsers(id));
      window.location.reload()
    }
  };

  return (
    <div className={style.value} key={i}>
      {prop === "explicit" ? (
        value.explicit === true ? (
          <span className={style.deleted}>yes</span>
        ) : (
          <span className={style.false}>no</span>
        )
      ) : (
        ""
      )}
      {prop === "deleted" ? (
        <span className={style[status]} >{ !status ? "active" : "disabled" }</span>
      ) : (
        value[prop]
      )}
      {prop === "edit" && (
        <div className={style.value} key={i}>
          <BsInfoLg
            onClick={() => handleIconClick(value.id)}
            className={style.icon}
          />
          <FaTrashCan
            onClick={() => {
              handlerClick(value.id, model);
              setStatus(!status);
            }}
            className={style.iconTrash}
          />
        </div>
      )}
    </div>
  );
};

export default CardColumn;
