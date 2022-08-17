import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CartHeader from './CartHeader'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { logout } from '../reducers/userReducers/userLoginSlice'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)

  const { userInfo } = userLogin

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mx-auto'>
              <Nav.Item>
                {' '}
                <Nav.Link href='/cart'>
                  <CartHeader />
                </Nav.Link>
              </Nav.Item>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <NavDropdown.Item href='/profile'> Profile</NavDropdown.Item>

                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Item>
                  <Nav.Link href='/login'>
                    <i className='fa-solid fa-arrow-right-to-bracket fa-2x'></i>{' '}
                    Sing in
                  </Nav.Link>
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
