import React, { useEffect } from 'react'
import { Button, Form, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrderList } from '../reducers/MyOrdersReducer'
import { getOrderDetails } from '../reducers/orderDetailReducer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useNavigate } from 'react-router-dom'
import { getUserProfile } from '../reducers/userReducers/userDetailSlice'

const MyOrders = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  console.log(userInfo)
  const orderList = useSelector(state => state.orderList)
  const { orders, status, error: myOrderError } = orderList

  useEffect(() => {
    if (userInfo) {
      dispatch(getMyOrderList())
    } else {
      navigate('/login')
    }
  }, [dispatch])

  const loadOrderDetail = orderId => {
    dispatch(getOrderDetails(orderId))
    navigate(`/viewOrder/${orderId}`)
  }

  return (
    <div>
      {!orders || orders.length === 0 ? (
        <Message variant='danger'>No Orders</Message>
      ) : (
        <Row>
          <h1>MYOrders</h1>
          <Col md={12}>
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
                        {/* <LinkContainer to={`/viewOrder/${order._id}`}> */}
                        <Button
                          onClick={() => loadOrderDetail(order._id)}
                          type='button'
                          className='btn-sm'
                          variant='light'>
                          Details
                        </Button>
                        {/* </LinkContainer> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      )}
    </div>
  )
}

export default MyOrders
