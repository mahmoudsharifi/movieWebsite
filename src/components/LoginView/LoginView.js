import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginHandler = (e) => {
    e.preventDefault()

    const data = {
      Username: username,
      Password: password,
    }

    // make request to api
    fetch('https://movies-api-sharifi.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      return response.json().then((data) => {
        if (response.ok) {
          console.log(data)

          // store token in local storage
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data.user))
          onLoggedIn(data.user, data.token)
          navigate('/')
        } else {
          console.log(data)
          if (data.errors) {
            alert(data.errors[0].msg)
          } else alert(data.message)
        }
      })
    })

    console.log(data)
  }
  return (
    <Card
      style={{
        width: '40%',
        margin: '0 auto',
        padding: '20px 40px',
      }}
    >
      <Form>
        <h3
          style={{
            textAlign: 'center',
          }}
        >
          Login
        </h3>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type='text'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='formPassword'>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <br />

        <Button
          variant='primary'
          type='submit'
          onClick={loginHandler}
          style={{
            width: '100%',
          }}
        >
          Login
        </Button>
      </Form>
    </Card>
  )
}
