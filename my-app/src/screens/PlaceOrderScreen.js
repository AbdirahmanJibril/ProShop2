import React from 'react'
import {
  Alert,
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../reducers/orderReucer'
import { getOrderDetails } from '../reducers/orderDetailReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { removeFromCart } from '../reducers/cartReducer'

const PlaceOrderScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cart = useSelector(state => state.cart)

  const shipping = useSelector(state => state.shipping)
  const { Shipping } = shipping

  const payment = useSelector(state => state.payment)
  const { Payment } = payment
  const confirmedOrder = useSelector(state => state.createdOrder)
  const { order } = confirmedOrder

  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  const shippingPrice = itemsPrice > 100 ? 100 : 0
  const taxPrice = (itemsPrice * 0.15).toFixed(2)

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2)

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }

  const placeOrdreHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: Shipping,
        paymentMethod: payment.Payment,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      })
    )
  }
  if (confirmedOrder.status === 'SUCCESS') {
    dispatch(getOrderDetails(order._id))
  }
  const goToPayment = () => {
    navigate(`/viewOrder/${order._id}`)
  }

  return (
    <>
      <Container style={{ textAlign: 'left' }}>
        <CheckoutSteps step1 step2 step3 step4 />
        {confirmedOrder.status === 'SUCCESS' && (
          <Alert variant='info'>Order create success</Alert>
        )}
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>Shipping</h3>
                <p>
                  {Shipping.address},{Shipping.postalCode},{Shipping.city},
                  {Shipping.country}
                </p>
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>Payment Method</h3>
                <div style={{ fontWeight: 900 }}> {Payment}</div>
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Order Items</h3>
                {cart.cartItems.length === 0 && (
                  <Message>Your cart is Empty</Message>
                )}

                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={4}>
                          <Link to={`/product/${item.product}`}>
                            <div style={{ fontWeight: 900 }}>{item.name}</div>
                          </Link>
                        </Col>
                        <Col>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                        <Col>
                          <Button variant='light' type='button'></Button>
                        </Col>
                        <Col>
                          <Button
                            variant='light'
                            type='button'
                            onClick={() => removeFromCartHandler(item.product)}>
                            <FontAwesomeIcon
                              icon='fa-regular fa-trash-can'
                              size='lg'
                            />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>Order Summary</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>{shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>{taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>{totalPrice}</Col>
                  </Row>
                </ListGroup.Item>

                <div className='d-grid gap-2'>
                  <Button
                    type='button'
                    variant='dark'
                    className='btn-block'
                    onClick={placeOrdreHandler}
                    disabled={
                      cart.cartItems.length === 0 ||
                      confirmedOrder.status === 'SUCCESS'
                    }>
                    Place Order
                  </Button>
                </div>
                {confirmedOrder.status === 'SUCCESS' && (
                  <div className='d-grid py-2 gap-2'>
                    <Button
                      type='button'
                      variant='dark'
                      className='btn-block'
                      onClick={goToPayment}>
                      Order payment
                    </Button>
                  </div>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PlaceOrderScreen
