import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'
import { useParams } from 'react-router'

export const MovieView = ({ movies, onBackClick }) => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    fetch(`https://movies-api-sharifi.herokuapp.com/movies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovie(data)
      })
      .catch((error) => {
        console.log('Error fetching user data:', error)
      })
  }, [token, id])

  if (!movie) return <h5>Loading........</h5>
  return (
    <Card className='movie-view'>
      <Card.Img
        style={{ width: '18rem' }}
        src={movie.ImagePath}
        className='movie-image'
      />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>
          <strong>Description: </strong>
          {movie.Description}
        </Card.Text>
        <Card.Text>
          <strong>Genre: </strong>
          {movie.Genres.Name}
        </Card.Text>
        <Card.Text>
          <strong>Director: </strong>
          {movie.Director.Name}
        </Card.Text>
        <Card.Text>
          <strong>Year: </strong>
          {movie.Year}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genres: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Year: PropTypes.number.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
}
