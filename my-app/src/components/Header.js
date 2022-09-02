import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CartHeader from './CartHeader'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'
import { logout } from '../reducers/userReducers/userLoginSlice'
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'
import { clearOrder } from '../reducers/orderReucer'
import { clearCartItems } from '../reducers/cartReducer'
import {
  clearUserDetail,
  getUserProfile,
} from '../reducers/userReducers/userDetailSlice'
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)

  const { userInfo } = userLogin

  const handleLogout = () => {
    dispatch(logout())
    localStorage.clear()
    dispatch(clearUserDetail())
    dispatch(clearOrder())
    dispatch(clearCartItems())
    navigate('/')
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Proshop</Navbar.Brand>
          </LinkContainer>

<<<<<<< HEAD
          <Navbar.Toggle aria-controls='basic-navbar-nav ' />
          <Navbar.Collapse id='basic-navbar-nav '>
            <Nav className='ms-auto'>
=======
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mx-auto'>
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
              <Nav.Item>
                {' '}
                <Nav.Link href='/cart'>
                  <CartHeader />
                </Nav.Link>
              </Nav.Item>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
<<<<<<< HEAD
                  <NavDropdown.Item href='/profile'>
                    My Profile
                  </NavDropdown.Item>

                  <NavDropdown.Item href='/myorders'>
                    My Orders
                  </NavDropdown.Item>
=======
                  <NavDropdown.Item href='/profile'> Profile</NavDropdown.Item>
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7

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
<<<<<<< HEAD
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
