import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSongsById } from '../../../redux/Actions/SongsActions'

const SongDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const songsId = useSelector((state) => state.songsId)
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <div>
      <h2>Song Detail</h2>
      {songsId && (
        <div>
          <img src={songsId.data.image} alt={songsId.data.name} />
          <h3>{songsId.data.name}</h3>
          <p>
            Artists:{' '}
            {songsId.data.artists.map((artist) => artist.name).join(', ')}
          </p>
          <p>Explicit: {songsId.data.explicit ? 'Yes' : 'No'}</p>
          <p>Popularity: {songsId.data.popularity}</p>
          <audio controls>
            <source src={songsId.data.audioFull} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  )
}

export default SongDetail
