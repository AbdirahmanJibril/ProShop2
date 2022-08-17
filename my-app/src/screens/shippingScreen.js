import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { registerShipping } from '../reducers/shippingRducer'

const ShippingScreen = () => {
  const shipping = useSelector(state => state.shipping)
  const { Shipping } = shipping
  const [address, setAddress] = useState(Shipping.address)
  const [city, setCity] = useState(Shipping.city)
  const [postalCode, setPostalCode] = useState(Shipping.postalCode)
  const [country, setCountry] = useState(Shipping.country)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    dispatch(registerShipping({ address, city, postalCode, country }))
    navigate('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />

      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            required
            onChange={e => setAddress(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={e => setCity(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            required
            onChange={e => setPostalCode(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            required
            onChange={e => setCountry(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default ShippingScreen
