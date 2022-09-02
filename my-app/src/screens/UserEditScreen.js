import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../components/FormContainer'
import { updateUser } from '../reducers/userReducers/UserUpdateSlice'
import { getUserProfile } from '../reducers/userReducers/userDetailSlice'

const UserEditScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userProfile = useSelector(state => state.userProfile)
  const { user } = userProfile

  const params = useParams()
  const userId = params.id
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()

    dispatch(updateUser({ _id: userId, name, email, isAdmin }))

    navigate('/admin/userlist')
  }

  useEffect(() => {
    dispatch(getUserProfile(userId))

    setName(user.name)
    setEmail(user.email)
    setIsAdmin(user.isAdmin)
  }, [
    dispatch,
    navigate,
    userId,
    user._id,
    user.name,
    user.email,
    user.isAdmin,
  ])
  return (
    <>
      {user.status === 'SUCCESS' && (
        <Alert variant='success'>Update success</Alert>
      )}
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={e => setName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='isadmin'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
          </Form.Group>

          <Button type='submit' variant='primary' onClick={submitHandler}>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default UserEditScreen
