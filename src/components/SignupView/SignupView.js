import React, { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router'

const SignupView = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const navigate = useNavigate()

  const signupHandler = (e) => {
    e.preventDefault()

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Age: age,
    }

    // make request to api
    fetch('https://movies-api-sharifi.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      response.json().then((data) => {
        if (response.ok) {
          console.log(data)
          alert('You have successfully registered. Please login.')
          navigate('/login')
        } else {
          console.log(data)
          if (data.errors) {
            alert(data.errors[0].msg)
          } else alert(data.message)
        }
      })
    })
  }

  return (
    <Card
      style={{
        width: '40%',
        margin: '0 auto',
        padding: '20px 40px',
      }}
    >
      <h3
        style={{
          textAlign: 'center',
        }}
      >
        Sign up
      </h3>
      <Form>
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

        <Form.Group controlId='formEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId='formAge'>
          <Form.Label>Age:</Form.Label>
          <Form.Control
            type='number'
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <br />
        <Button
          variant='primary'
          type='submit'
          style={{
            width: '100%',
          }}
          onClick={signupHandler}
        >
          Signup
        </Button>
      </Form>
    </Card>
  )
}

export default SignupView
