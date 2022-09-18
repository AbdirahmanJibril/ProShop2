import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  getUserProfile,
  clearUserDetail,
} from '../reducers/userReducers/userDetailSlice'
import {
  updateUserProfileReset,
  updateUserProfile,
} from '../reducers/userReducers/UpdateUserDetails'

import Message from '../components/Message'
import { logout } from '../reducers/userReducers/userLoginSlice'

const Profile = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [err, setErr] = useState('')

  const dispatch = useDispatch()

  const userProfile = useSelector(state => state.userProfile)
  const { error, user } = userProfile

  const updatedUserProfile = useSelector(state => state.updateUserProfile)
  const { status } = updatedUserProfile

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!userInfo || status === 'UPDATE_USER_PROFILE_SUCCESS') {
      dispatch(logout())
      dispatch(clearUserDetail())
      navigate('/login')
    } else if (!user || !user.name) {
      dispatch(updateUserProfileReset())
      dispatch(getUserProfile('profile'))
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, navigate, userInfo, user.name, user, status])

  const submitHandler = e => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setErr('Password must match')
      setMessage('')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
      setMessage('Profile updated')
      setErr('')
    }
  }

  return (
    <div>
      <Row className='justify-content-center'>
        <Col md={8}>
          <Alert variant='danger'>Profile update will cause logout</Alert>
          {message && message.length > 0 ? (
            <Message variant='success'>{message}</Message>
          ) : (
            ''
          )}

          {err && err.length > 0 ? (
            <Message variant='danger'>{err}</Message>
          ) : (
            ''
          )}

          {error && <Message variant='danger'>{error}</Message>}

          <h2>My Profile</h2>
          <Form
            onSubmit={submitHandler}
            style={{ textAlign: 'left', fontWeight: '900' }}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                value={name}
                onChange={e => setName(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group id='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                value={confirmPassword}
                onChange={e =>
                  setConfirmPassword(e.target.value)
                }></Form.Control>
            </Form.Group>

            <Button type='submit' variant='dark'>
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}
export default Profile
