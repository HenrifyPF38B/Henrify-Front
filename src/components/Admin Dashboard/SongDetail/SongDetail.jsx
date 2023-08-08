import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSongsById } from '../../../redux/Actions/SongsActions'
import { GiLoveSong } from 'react-icons/gi'
import style from './SongDetail.module.css'

const SongDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const songs = useSelector((state) => state.songsId)
  const [isLoading, setIsLoading] = useState(true)
  const songsId = songs.data
  useEffect(() => {
    setIsLoading(true)
    dispatch(getSongsById(id))
      .then(() => {
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching song data:', error)
        setIsLoading(false)
      })
  }, [dispatch, id])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!songsId) {
    return <div>Data not available.</div>
  }
  console.log(songsId)
  return (
    <div className={style.songContainer}>
      <div className={style.containerBtn}>
        <h1 className={style.songDetail}>
          <GiLoveSong /> Song Detail
        </h1>
        <div
          style={{
            border: songsId.deleted ? 'solid 3px red' : 'solid 3px green',
            padding: '10px',
            color: songsId.deleted ? 'red' : 'green',
            fontWeight: 'bold',
          }}
        >
          {!songsId.deleted ? 'Song enabled' : 'Song disabled'}
        </div>
      </div>
      {songsId && (
        <div className={style.song}>
          <div className={style.nameSong}>
            <h1>{songsId.name}</h1>
            <img
              src={songsId.image}
              alt={songsId.name}
              className={style.imgSong}
            />
          </div>
          <div className={style.details}>
            <div className={style.artistDetail}>
              <h6>
                <b>Artists: </b>
                {songsId.artists.map((artist) => artist.name).join(', ')}
              </h6>
              <h6><b>Explicit: </b>{songsId.explicit ? 'Yes' : 'No'}</h6>
            </div>
            <h6><b>Popularity: </b>{songsId.popularity}</h6>
            <audio controls>
              <source src={songsId.audioFull} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      )}
    </div>
  )
}

export default SongDetail
