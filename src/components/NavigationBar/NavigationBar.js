import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const NavigationBar = ({ user, onLogout }) => {
  const handleLogout = () => {
    onLogout()
  }

  return (
    <Navbar
      expand='lg'
      className='navbar navbar-expand-lg navbar-light '
      style={{
        backgroundColor: '#e3f2fd',
      }}
    >
      <Navbar.Brand as={Link} to='/' className='p-2'>
        MovieFlixHub
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='navbar-nav' />
      <Navbar.Collapse id='navbar-nav'>
        <Nav className='ml-auto'>
          {user ? (
            <>
              <Nav.Link
                as={Link}
                to='/'
                style={{
                  marginLeft: '20px ',
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to='/profile'
                style={{
                  marginLeft: '20px ',
                }}
              >
                Profile
              </Nav.Link>
              <Nav.Link
                onClick={handleLogout}
                style={{
                  marginLeft: '20px ',
                }}
              >
                Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link
                as={Link}
                to='/login'
                style={{
                  marginLeft: '20px ',
                }}
              >
                Login
              </Nav.Link>
              <Nav.Link
                as={Link}
                to='/signup'
                style={{
                  marginLeft: '20px ',
                }}
              >
                Sign Up
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
