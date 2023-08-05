import style from "./Aside.module.css";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from 'react-icons/ai';
import { MdSettingsSuggest } from 'react-icons/md'

const Aside = () => {
  const navigate = useNavigate();

  return (
    <div className={style.content}>
      <div
        className={style.home}
        onClick={() => {
          navigate("/home");
        }}
      >
        <AiFillHome/>
        GO HOME
      </div>
      <div className={style.containEdits}>
        <div onClick={() => navigate("users")} className={style.edits}>
          <MdSettingsSuggest className={style.icon}/> USERS
        </div>
        <div onClick={() => navigate("albums")} className={style.edits}>
          <MdSettingsSuggest className={style.icon}/> ALBUMS
        </div>
        <div onClick={() => navigate("songs")} className={style.edits}>
          <MdSettingsSuggest className={style.icon}/> SONGS
        </div>
      </div>
    </div>
  );
};

export default Aside;
