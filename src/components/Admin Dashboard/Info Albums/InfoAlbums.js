import { useSelector } from 'react-redux';
import style from './InfoAlbums.module.css'
import Card from '../Card/Card';
import Column from '../Column/Column';
import { LuSettings2 } from 'react-icons/lu'
import { MdLibraryMusic } from 'react-icons/md'

const InfoAlbums = () => {
  const albums = useSelector(state => state.albums)
  console.log(albums)

  return (
    <div className={style.contain}>
      <div className={style.content}>
          <Card icon={<MdLibraryMusic/>} title={'TOTAL ALBUMS'} number={albums.total}/>
      </div>

      <div className={style.table}>
        <Column title={'id'} prop={'id'} content={albums.data}/>
        <Column title={'name'} prop={'name'} content={albums.data}/>
        <Column title={'price'} prop={'price'} content={albums.data}/>
        <Column title={'stock'} prop={'stock'} content={albums.data}/>
        <Column title={'status'} prop={'deleted'} content={albums.data}/>
        <Column title={ <LuSettings2/> } prop={'edit'} content={albums.data}/>
      </div>
    </div>
  )
}

export default InfoAlbums;