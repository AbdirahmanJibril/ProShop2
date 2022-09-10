import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { payOrder } from '../reducers/orderPayReducer'
import { clearCartItems } from '../reducers/cartReducer'
import { clearUserDetail } from '../reducers/userReducers/userDetailSlice'
import { getOrderDetails } from '../reducers/orderDetailReducer'
import { PayPalButton } from 'react-paypal-button-v2'
import {
  ListGroup,
  Row,
  Col,
  Card,
  Image,
  Alert,
  Button,
} from 'react-bootstrap'
import { clearOrder } from '../reducers/orderReucer'
import Loader from '../components/Loader'
import { orderPayReset } from '../reducers/orderPayReducer'
import { deliverOrder, orderDeliverReset } from '../reducers/orderDeliverSlice'

const Orderdetail2 = () => {
  const params = useParams()

  const dispatch = useDispatch()

  const orderDeliver = useSelector(state => state.orderdeliver)
  const { Deliver } = orderDeliver

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const orderSuccess = useSelector(state => state.viewOrderDetail)
  const { orderDetail } = orderSuccess

  const itemsPrice = orderSuccess.orderDetail.orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )
  useEffect(() => {
    dispatch(getOrderDetails(params.id))
    if (orderDetail.isDelivered) {
      dispatch(orderPayReset())
      dispatch(orderDeliverReset())
    }
  }, [dispatch, orderDetail.isDelivered, params.id])

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(orderSuccess.orderDetail._id, paymentResult))
    dispatch(getOrderDetails(orderSuccess.orderDetail._id))
    if (paymentResult.status === 'COMPLETED') {
      dispatch(clearCartItems())
      dispatch(clearUserDetail())
      dispatch(clearOrder())
    }
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(orderDetail))
  }
  return (
    <>
      <Row>
        <h1 style={{ textAlign: 'left', margin: '10px auto' }}>
          Order {orderSuccess.orderDetail._id}
        </h1>
        <Col md={8}>
          <ListGroup.Item style={{ textAlign: 'left', margin: '30px auto' }}>
            <h2>Shipping</h2>
            <h5>Name: {orderSuccess.orderDetail.user.name}</h5>
            <h5>Email: {orderSuccess.orderDetail.user.email}</h5>
            <h5>
              Address: {orderSuccess.orderDetail.shippingAddress.address},
              {orderSuccess.orderDetail.shippingAddress.city},
              {orderSuccess.orderDetail.shippingAddress.postalCode},
              {orderSuccess.orderDetail.shippingAddress.country}
            </h5>
          </ListGroup.Item>

          <ListGroup.Item style={{ textAlign: 'left', margin: '30px auto' }}>
            {orderSuccess.orderDetail.isDelivered ? (
              <Alert variant='success'>
                Delivered on {orderSuccess.orderDetail.deliveredAt}
              </Alert>
            ) : (
              <Alert variant='danger'>Not Delivered</Alert>
            )}
          </ListGroup.Item>

          <ListGroup.Item style={{ textAlign: 'left', margin: '30px auto' }}>
            <h2>Payment Method</h2>
            <div>
              <p>Payment Method: {orderSuccess.orderDetail.paymentMethod}</p>
            </div>
            {orderSuccess.orderDetail.isPaid ? (
              <Alert variant='success'>
                Paid at {orderSuccess.orderDetail.paidAt.substring(0, 10)}
              </Alert>
            ) : (
              <Alert variant='danger'>Not Paid</Alert>
            )}
          </ListGroup.Item>
          <ListGroup.Item style={{ textAlign: 'left', margin: '30px auto' }}>
            <h2>Order Items</h2>
            {orderSuccess.orderDetail.orderItems.length === 0 ? (
              <Alert>Order is empty</Alert>
            ) : (
              <ListGroup
                variant='flush'
                style={{ textAlign: 'left', margin: '30px auto' }}>
                {orderSuccess.orderDetail.orderItems.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={4}>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </ListGroup.Item>
        </Col>
        <Col md={4}>
          <Card style={{ textAlign: 'left', margin: '30px auto' }}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shippin charge</Col>
                  <Col>$ {orderSuccess.orderDetail.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {orderSuccess.orderDetail.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>$ {orderSuccess.orderDetail.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {userInfo && !userInfo.isAdmin ? (
                !orderSuccess.orderDetail.isPaid ? (
                  !PayPalButton ? (
                    <Loader />
                  ) : (
                    <ListGroup.Item>
                      <PayPalButton
                        options={{
                          'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
                        }}
                        amount={orderSuccess.orderDetail.totalPrice}
                        onSuccess={successPaymentHandler}></PayPalButton>
                    </ListGroup.Item>
                  )
                ) : (
                  <ListGroup.Item variant='flush'>
                    <Alert variant='success'>
                      <h5>Payment Success</h5>
                    </Alert>
                  </ListGroup.Item>
                )
              ) : (
                ''
              )}

              {Deliver.status === 'LOADING' && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                orderDetail.isPaid &&
                !orderDetail.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}>
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Orderdetail2
