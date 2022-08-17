import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ListGroup, Row, Alert } from 'react-bootstrap'

import { getOrderStatus } from '../reducers/OrderStatusSlice'

const OrderStatus = () => {
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getOrderStatus(params.id))
  }, [dispatch, params.id])

  const order = useSelector(state => state.orderStatus)

  return (
    <>
      <h1 style={{ margin: '20px auto' }}>ORDER STATUS</h1>

      <Row>
        <h1 style={{ margin: '20px auto' }}>Order {order.orderState._id}</h1>
        <ListGroup>
          <ListGroup.Item>
            <h1>Delivery </h1>
            {order.orderState.isDelivered ? (
              <Alert variant='success'>
                <h5> Delivered on</h5> {order.orderState.deliveredAt}
              </Alert>
            ) : (
              <Alert variant='danger'>
                <h5>Not Delivered</h5>
              </Alert>
            )}
          </ListGroup.Item>
          <ListGroup.Item>
            <h2>Payment Method</h2>
            <div>
              <h5>Payment Method: {order.orderState.paymentMethod}</h5>
            </div>
            {order.orderState.isPaid ? (
              <Alert variant='success'>
                <h5>Paid at </h5>
                {order.orderState.paidAt}
              </Alert>
            ) : (
              <Alert variant='danger'>
                <h5>Not Paid</h5>
              </Alert>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </>
  )
}

export default OrderStatus
