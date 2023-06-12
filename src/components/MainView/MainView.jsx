import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { MovieCard } from '../MovieCard/MovieCard'
import { MovieView } from '../MovieView/MovieView'
import { LoginView } from '../LoginView/LoginView'
import SignupView from '../SignupView/SignupView'
import { NavigationBar } from '../NavigationBar/NavigationBar'
import { ProfileView } from '../ProfileView/ProfileView'

import { Row, Col } from 'react-bootstrap'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

export const MainView = () => {
  // movies data array
  const storedUser = JSON.parse(localStorage.getItem('user'))
  const storedToken = localStorage.getItem('token')
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [user, setUser] = useState(storedUser)
  const [token, setToken] = useState(storedToken)
  const [filteredMovies, setFilteredMovies] = useState(movies)
  const [search, setSearch] = useState('')

  // login function
  const handleLogin = (loggedInUser, loggedInToken) => {
    // Update the user and token states when the user logs in
    setUser(loggedInUser)
    setToken(loggedInToken)
  }

  const handleLogout = () => {
    // Update the user and token states when the user logs out
    setUser(null)
    setToken(null)
    localStorage.clear()
    // navigate('/');
  }

  // API Call
  useEffect(() => {
    console.log(token)
    if (!token) return
    setLoading(true)
    fetch('https://movies-api-sharifi.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) =>
      response
        .json()
        .then((data) => {
          console.log(data)
          const movies = data.map((m) => ({
            id: m._id,
            Title: m.Title,
            Description: m.Description,
            Genre: m.Genres.Name,
            Director: m.Director.firstName + ' ' + m.Director.lastName,
            ImagePath: m.ImagePath,
            Year: m.Year,
          }))

          setMovies(movies)
          setFilteredMovies(movies)
          console.log(movies)
          setLoading(false)
        })
        .catch((err) => console.log(err))
    )
  }, [user, token])

  // search function
  useEffect(() => {
    if (search === '') return setFilteredMovies(movies)
    setFilteredMovies(
      movies.filter((movie) =>
        movie.Title.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, movies])

  const handleAddToFavorites = (movieId) => {
    // Create an updated user object with the new movie added to the favorite movies array
    const updatedUser = {
      ...user,
      FavoriteMovies: [...user.FavoriteMovies, movieId],
    }

    console.log(updatedUser, movieId)

    // Make a PUT request to add the movie to the user's favorite movies
    fetch(
      `https://movies-api-sharifi.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          alert('Added to Favourites')
          return response.json()
        } else {
          throw new Error('Error adding movie to favorites')
        }
      })
      .then((updatedUser) => {
        // Update the user information state variables if needed
        console.log('User information updated:', updatedUser)
        setUser(updatedUser)
      })
      .catch((error) => {
        console.log('Error updating user information:   ', error)
      })
  }

  const handleRemoveFavorite = (movieId) => {
    // Make a DELETE request to remove the specified movie from the user's favorite movies
    fetch(
      `https://movies-api-sharifi.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          // Update the user state by removing the movie from the favorite movies array
          setUser((prevUser) => ({
            ...prevUser,
            FavoriteMovies: prevUser.FavoriteMovies.filter(
              (id) => id !== movieId
            ),
          }))
          console.log('Movie removed from favorites.')
          alert('Removed From Favoruites')
        } else {
          console.log('Error removing movie from favorites.')
        }
      })
      .catch((error) => {
        console.log('Error removing movie from favorites:', error)
      })
  }

  if (loading) {
    return (
      <div>
        <p>Loading.......</p>
      </div>
    )
  }

  return (
    <>
      <BrowserRouter>
        <NavigationBar user={storedUser} onLogout={handleLogout} />
        <div
          style={{
            margin: '20px 20px',
          }}
        >
          <Routes>
            <Route
              path='/'
              element={
                user ? (
                  <Row>
                    <Row>
                      <Col>
                        <input
                          type='text'
                          placeholder='Search Movies Here...'
                          style={{
                            width: '70%',
                            display: 'inline-block',
                            padding: '12px 20px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            boxSizing: 'border-box',
                            margin: '10px auto',
                          }}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </Col>
                    </Row>

                    {filteredMovies.map((movie) => (
                      <Col sm={6} md={4} lg={3} key={movie.id}>
                        <MovieCard
                          movie={movie}
                          handleAddToFavorites={handleAddToFavorites}
                          onRemoveFavorite={handleRemoveFavorite}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Navigate to='/login' />
                )
              }
            />
            <Route
              path='/movie/:id'
              element={
                <MovieView
                  movies={movies}
                  onAddToFavorites={handleAddToFavorites}
                />
              }
            />

            <Route
              path='/login'
              element={<LoginView onLoggedIn={handleLogin} />}
            />

            <Route path='/signup' element={<SignupView />} />

            <Route
              path='/profile'
              element={
                <ProfileView
                  user={user}
                  token={token}
                  movies={movies}
                  onLogout={handleLogout}
                  onRemoveFavorite={handleRemoveFavorite}
                />
              }
            />

            <Route path='*' element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}
