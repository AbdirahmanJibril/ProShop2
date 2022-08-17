import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../reducers/userReducers/userDetailSlice'
import { updateUserProfile } from '../reducers/userReducers/UpdateUserDetails'
import { getMyOrderList } from '../reducers/MyOrdersReducer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const Profile = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [err, setErr] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const order = useSelector(state => state.orderStatus)

  const userProfile = useSelector(state => state.userProfile)
  const { error, user } = userProfile

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const orderList = useSelector(state => state.orderList)
  const { orders, status, error: myOrderError } = orderList

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserProfile('profile'))
        dispatch(getMyOrderList())
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, userInfo, navigate, user])

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
      <Row>
        <Col md={5}>
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
        <Col md={7}>
          <h2>My Orders</h2>
          {status === 'LOADING' ? (
            <Loader />
          ) : status === 'FAIL' ? (
            <Message variant='danger'>{myOrderError}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/status/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  )
}
export default Profile
