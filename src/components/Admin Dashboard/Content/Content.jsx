import { Outlet, useLocation } from "react-router-dom";
import Aside from "../Aside/Aside";
import Nav from "../NavBar/Nav";
import style from "./Content.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../redux/Actions/UsersActions";
import { getAllAlbums } from "../../../redux/Actions/AlbumsActions";
import { getAllSongs } from "../../../redux/Actions/SongsActions";
import InfoUsers from "../Info Users/InfoUsers";

const Content = () => {
  const location = useLocation().pathname;
  console.log(location);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getAllAlbums());
    dispatch(getAllSongs());
  }, []);

  return (
    <div className={style.content}>
      <Nav />
      <Aside />
      {location === "/admin" ? <InfoUsers /> : <Outlet />}
    </div>
  );
};

export default Content;
