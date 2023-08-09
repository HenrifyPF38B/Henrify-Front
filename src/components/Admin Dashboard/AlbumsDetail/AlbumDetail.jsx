import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getAlbumsById } from '../../../redux/Actions/AlbumsActions'
import style from './AlbumDetail.module.css'
import {
  BsArrowLeftCircle,
  BsFillCaretDownFill,
  BsFillCaretUpFill,
} from 'react-icons/bs'
import { IoIosAlbums } from 'react-icons/io'
import { MdAudiotrack } from 'react-icons/md'

const AlbumDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const albums = useSelector((state) => state.albumsId)
  const albumsId = albums.data
  const [isLoading, setIsLoading] = useState(true)
  const [openTrackIndex, setOpenTrackIndex] = useState(null)

  useEffect(() => {
    setIsLoading(true)

    dispatch(getAlbumsById(id))
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching song data:', error)
        setIsLoading(false)
      })
  }, [dispatch, id])

  if (isLoading) {
    return <div className={style.loading}>Loading...</div>
  }

  if (!albumsId) {
    return <div>Data not available.</div>
  }
  return (
    <div className={style.containerAlbum}>
      <div className={style.containerIcon}>
        <Link to="/admin/albums" className={style.iconArrow}>
          <BsArrowLeftCircle />
        </Link>
      </div>
      <div className={style.deletedName}>
        <h1 className={style.albumDetail}>
          <IoIosAlbums /> Album Detail
        </h1>
        <div
          style={{
            border: albumsId?.deleted ? 'solid 3px red' : 'solid 3px green',
            padding: '10px',
            color: albumsId?.deleted ? 'red' : 'green',
            fontWeight: 'bold',
          }}
        >
          {!albumsId?.deleted ? 'Album enabled' : 'Album disabled'}
        </div>
      </div>
      <div className={style.albumName}>
        <h1>{albumsId?.name}</h1>
        <img
          src={albumsId?.image}
          alt={albumsId?.name}
          className={style.imgAlbum}
        />
      </div>
      <div className={style.divArtist}>
        <h6>
          <b>Artist: </b>
          {albumsId?.artists[0]?.name}
        </h6>
        <h6>
          <b>Price: </b>${albumsId?.price}
        </h6>
        <h6>
          <b>Stock: </b>
          {albumsId?.stock}
        </h6>
      </div>
      <div className={style.tracks}>
        <h3 className={style.nameTracks}>
          <MdAudiotrack />
          Tracks
        </h3>
        <ul className={style.albumList}>
          {albumsId?.tracks?.map((track, index) => (
            <li key={index} className={style.list}>
              <div
                className={style.track}
                onClick={() =>
                  setOpenTrackIndex(openTrackIndex === index ? null : index)
                }
                style={{ cursor: 'pointer' }}
              >
                {openTrackIndex === index ? (
                  <BsFillCaretUpFill />
                ) : (
                  <span>
                    <BsFillCaretDownFill />
                  </span>
                )}
                {track.trackName}
                {openTrackIndex === index && (
                  <div>
                    <audio controls>
                      <source src={track.trackFull} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AlbumDetail
