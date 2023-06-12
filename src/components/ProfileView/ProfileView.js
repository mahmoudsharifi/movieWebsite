import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export const ProfileView = ({
  user,
  token,
  movies,
  onLoggedOut,
  onRemoveFavorite,
}) => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    console.log(token)
    fetch(`https://movies-api-sharifi.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        setUserData(data)
        setUsername(data.Username)
        setPassword(data.Password)
        setEmail(data.Email)
        setAge(data.Age)
        setLoading(false)
      })
      .catch((error) => {
        console.log('Error fetching user data:', error)
      })
  }, [user, token])

  const handleUpdate = (e) => {
    e.preventDefault()
    // Make a PUT request to update the user's information
    fetch(`https://movies-api-sharifi.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Username: username,
        Password: password,
        Email: email,
        Age: age,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the user information state variables if needed
        console.log('User information updated:', data)
        alert('Updated Successfully')
        navigate('/login')
      })
      .catch((error) => {
        console.log('Error updating user information:', error)
      })
  }

  const handleDeregister = () => {
    // Make a DELETE request to deregister the user
    fetch(`https://movies-api-sharifi.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // User deregistration successful

          console.log('User deregistered successfully.')
          alert('Delete Successfully')
        } else {
          console.log(response)
          console.log('User deregistration failed.')
        }
      })
      .catch((error) => {
        console.log('Error deregistering user:', error)
      })
  }

  if (!user || loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <Row>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h3>Profile</h3>

          <Button
            variant='danger'
            className='mt-2 mb-3'
            onClick={handleDeregister}
          >
            Delete Account
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId='username'>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='birthday'>
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type='number'
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Form.Group>

            <Button
              variant='primary'
              type='submit'
              className='mt-3'
              style={{
                width: '100%',
              }}
            >
              Update
            </Button>
          </Form>

          <p>Email: {userData.Email}</p>
          <p
            style={{
              fontWeight: 'bold',
            }}
          >
            Favorite Movies:
          </p>
          <ul>
            {user.FavoriteMovies?.length > 0 ? (
              user.FavoriteMovies.map((movieId) => {
                const movie = movies.find((m) => m.id === movieId)
                return (
                  <li
                    key={movie._id}
                    style={{
                      marginBottom: '20px',
                      listStyle: 'none',
                    }}
                  >
                    {movie ? (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <img
                            src={movie.ImagePath}
                            alt='movie poster'
                            style={{
                              width: '150px',
                              height: '150px',
                              marginRight: '20px',
                            }}
                          />
                          <h2> {movie.Title}</h2>
                        </div>

                        <Button
                          variant='danger'
                          size='sm'
                          className='ml-2'
                          onClick={() => onRemoveFavorite(movieId)}
                          style={{
                            marginLeft: '20px ',
                          }}
                        >
                          Remove Favorite Movie
                        </Button>
                      </div>
                    ) : null}
                  </li>
                )
              })
            ) : (
              <li>No favorite movies selected</li>
            )}
          </ul>
        </Col>
      </Row>
    </Container>
  )
}
