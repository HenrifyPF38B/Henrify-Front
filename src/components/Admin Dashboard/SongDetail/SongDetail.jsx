import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSongsById } from '../../../redux/Actions/SongsActions'
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
      <h2>Song Detail</h2>
      {songsId && (
        <div className={style.song}>
          
          <img src={songsId.image} alt={songsId.name} className={style.imgSong}/>
          <h1>{songsId.name}</h1>
          <p>
            Artists:
            {songsId.artists.map((artist) => artist.name).join(', ')}
          </p>
          <p>Explicit: {songsId.explicit ? 'Yes' : 'No'}</p>
          <p>Popularity: {songsId.popularity}</p>
          <audio controls>
            <source src={songsId.audioFull} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  )
}

export default SongDetail
