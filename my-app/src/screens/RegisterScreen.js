import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../reducers/userReducers/userRegisterSlice'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)

  const location = useLocation()

  const redirect = location ? location.search.split('=')[1] : '/'
  const user = useSelector(state => state.userRegister)
  const { status, error, userInfo } = user

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/')
    }
  }, [userInfo, redirect, navigate])

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('passwords must match')
      navigate('/register')
    } else {
      dispatch(register(name, email, password))
    }
  }
  return (
    <Row className='justify-content-md-center'>
      <Col sm={12} md={6}>
        {message && <message variant='danger'>{message}</message>}
        {error && <Message variant='danger'>{error}</Message>}
        {status === 'REGISTER REQUEST' && <Loader />}
        <h1>Sign in</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group id='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={e => setName(e.target.value)}></Form.Control>
          </Form.Group>
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
          <Form.Group id='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Comfirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}></Form.Control>
          </Form.Group>
          <div className='d-grid gap-2'>
            <Button type='submit' variant='dark'>
              Sing Up
            </Button>
          </div>
          <Row className='py-3'>
            <Col>
              Have account?
              <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                Login here
              </Link>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  )
}

export default RegisterScreen
