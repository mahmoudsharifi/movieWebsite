import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { Row, Col } from 'react-bootstrap'
export const MovieCard = ({ movie, handleAddToFavorites }) => {
  const navigate = useNavigate()

  return (
    <Card className='movie-card'>
      <Card.Body>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Col sm={24} md={8} lg={8}>
            <img
              src={movie.ImagePath}
              className='movie-card-image'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              alt='ok'
            />
          </Col>
          <Col sm={24} md={8} lg={8}>
            <Card.Title
              style={{
                textAlign: 'center',
                color: 'black',
                marginTop: '1rem',
                fontSize: '1.5rem',
              }}
            >
              {movie.Title}
            </Card.Title>
          </Col>
          <Col sm={24} md={8} lg={8}>
            <Button
              variant='secondary'
              style={{
                width: '100%',
                color: 'black',
                backgroundColor: '#e3f2fd',
                border: 'none',
              }}
              onClick={() => {
                handleAddToFavorites(movie.id)
              }}
              className='mt-2 mr-4'
            >
              Add to Favorites
            </Button>
          </Col>
          <Col sm={24} md={8} lg={8}>
            <Button
              variant='secondary'
              style={{
                width: '100%',
                color: 'black',
                backgroundColor: '#e3f2fd',
                border: 'none',
              }}
              onClick={() => {
                navigate(`/movie/${movie.id}`)
              }}
              className='mt-2 ml-4'
            >
              View Details
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  )
}
