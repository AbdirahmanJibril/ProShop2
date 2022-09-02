import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../reducers/userReducers/userLoginSlice'
<<<<<<< HEAD
import { getOrderList } from '../reducers/OrderListSlice'
=======

>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { search } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const redirect = search ? search.split('=')[1] : '/'
  const userLogin = useSelector(state => state.userLogin)
  const { status, error, userInfo } = userLogin

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
<<<<<<< HEAD
    } else {
      navigate('/login')
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = e => {
    e.preventDefault()

    dispatch(login(email, password))
  }
  return (
    <Row className='justify-content-md-center'>
      <Col sm={12} md={6}>
        {error && <Message variant='danger'>{error}</Message>}
        {status === 'loggin in' && <Loader />}
        <h1>Sign in</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group id='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}></Form.Control>
          </Form.Group>
          <Form.Group id='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <div className='d-grid gap-2'>
            <Button type='submit' variant='dark'>
              Sing in
            </Button>
          </div>
          <Row className='py-3'>
            <Col>
              New Customer?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                Register
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default LoginScreen
