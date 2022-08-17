import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { payOrder } from '../reducers/orderPayReducer'
import { getOrderDetails } from '../reducers/orderDetailReducer'
import { PayPalButton } from 'react-paypal-button-v2'
import { ListGroup, Row, Col, Card, Image, Alert } from 'react-bootstrap'

const Orderdetail2 = () => {
  const params = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderDetails(params.id))
  }, [dispatch, params.id])

  const orderSuccess = useSelector(state => state.viewOrderDetail)
  const { orderDetail } = orderSuccess

  console.log(orderDetail)

  const paidOrder = useSelector(state => state.orderpay)

  const itemsPrice = orderDetail.orderItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  )

  const successPaymentHandler = paymentResult => {
    dispatch(payOrder(orderDetail._id, paymentResult))
    dispatch(getOrderDetails(orderDetail._id))
  }

  return (
    <>
      <Row>
        <h1 style={{ textAlign: 'left', margin: '10px auto' }}>
          Order {orderDetail._id}
        </h1>
        <Col md={8}>
          <ListGroup.Item style={{ textAlign: 'left', margin: '30px auto' }}>
            <h2>Shipping</h2>
            <h5>Name: {orderDetail.user.name}</h5>
            <h5>Email: {orderDetail.user.email}</h5>
            <h5>
              Address: {orderDetail.shippingAddress.address},
              {orderDetail.shippingAddress.city},
              {orderDetail.shippingAddress.postalCode},
              {orderDetail.shippingAddress.country}
            </h5>
          </ListGroup.Item>

          <ListGroup.Item style={{ textAlign: 'left', margin: '30px auto' }}>
            {orderDetail.isDelivered ? (
              <Alert variant='success'>
                Delivered on {orderDetail.deliveredAt}
              </Alert>
            ) : (
              <Alert variant='danger'>Not Delivered</Alert>
            )}
          </ListGroup.Item>

          <ListGroup.Item style={{ textAlign: 'left', margin: '30px auto' }}>
            <h2>Payment Method</h2>
            <div>
              <p>Payment Method: {orderDetail.paymentMethod}</p>
            </div>
            {orderDetail.isPaid ? (
              <Alert variant='success'>Paid at {orderDetail.paidAt}</Alert>
            ) : (
              <Alert variant='danger'>Not Paid</Alert>
            )}
          </ListGroup.Item>
          <ListGroup.Item style={{ textAlign: 'left', margin: '30px auto' }}>
            <h2>Order Items</h2>
            {orderDetail.orderItems.length === 0 ? (
              <Alert>Order is empty</Alert>
            ) : (
              <ListGroup
                variant='flush'
                style={{ textAlign: 'left', margin: '30px auto' }}>
                {orderDetail.orderItems.map((item, index) => (
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
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shippin charge</Col>
                  <Col>${orderDetail.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${orderDetail.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${orderDetail.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!orderDetail.isPaid ? (
                <ListGroup.Item>
                  <PayPalButton
                    options={{
                      'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
                    }}
                    amount={orderDetail.totalPrice}
                    onSuccess={successPaymentHandler}></PayPalButton>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item variant='flush'>
                  <Alert variant='success'>{paidOrder.status}</Alert>
                </ListGroup.Item>
              )}

              {/* {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )} */}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Orderdetail2
