import { useSelector } from "react-redux";
import style from "./InfoAlbums.module.css";
import Card from "../Card/Card";
import Column from "../Column/Column";
import { LuSettings2 } from "react-icons/lu";
import { MdLibraryMusic } from "react-icons/md";
import { AiOutlineStock } from 'react-icons/ai'
import { TbWashTumbleOff } from 'react-icons/tb'

const InfoAlbums = () => {
  const albums = useSelector((state) => state.allAlbums);
  console.log(albums);

  return (
    <div className={style.contain}>
      <div className={style.content}>
        <Card
          icon={<MdLibraryMusic />}
          title={"TOTAL ALBUMS"}
          number={albums.total}
        />
        <Card
          icon={<AiOutlineStock />}
          title={"TOTAL STOCK"}
          number={albums.totalStock}
        />
        <Card
        icon={<TbWashTumbleOff />}
        title={"DISABLED ALBUMS"}
        number={albums.desactivados}
        />
      </div>

      <div className={style.table}>
        <Column 
          title={"id"} 
          prop={"id"} 
          content={albums.data} 
        />
        <Column 
          title={"name"} 
          prop={"name"} 
          content={albums.data} 
        />
        <Column 
          title={"price"} 
          prop={"price"} 
          content={albums.data} 
        />
        <Column 
          title={"stock"} 
          prop={"stock"} 
          content={albums.data} 
        />
        <Column 
          title={"status"} 
          prop={"deleted"} 
          content={albums.data} 
        />
        <Column
          title={<LuSettings2 />}
          prop={"edit"}
          content={albums.data}
          model={"albums"}
        />
      </div>
    </div>
  );
};

export default InfoAlbums;
