import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderList, clearOrderList } from '../reducers/OrderListSlice'
import { getOrderDetails } from '../reducers/orderDetailReducer'

const OrderList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const orderSuccess = useSelector(state => state.viewOrderDetail)
  const { orderDetail } = orderSuccess

  const showOrderList = useSelector(state => state.Orders)
  const { orders } = showOrderList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (!orders || (orders && orders.length === 0)) {
      if (userInfo && userInfo.isAdmin) {
        dispatch(getOrderList())
      } else {
        navigate('/login')
      }
    }
  }, [dispatch, navigate, userInfo, orders])

  const vieworder = id => {
    dispatch(getOrderDetails(id))
    navigate(`/viewOrder/${id}`)
  }

  const orderDeleteHandler = id => {
    ///
  }
  return (
    <>
      <h1>ORDERS</h1>

      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
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
              <td>{order.user && order.user.name}</td>
              <td>{order.createdAt.substring(0, 10)}</td>
              <td>${order.totalPrice}</td>
              <td>
                {order.isPaid ? (
                  order.paidAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  order.deliveredAt.substring(0, 10)
                ) : (
                  <i className='fas fa-times' style={{ color: 'red' }}></i>
                )}
              </td>
              <td>
                {/* <LinkContainer to={`/viewOrder/${order._id}`}> */}
                <Button
                  variant='light'
                  className='btn-sm'
                  onClick={() => vieworder(order._id)}>
                  Details
                </Button>
                {/* </LinkContainer> */}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default OrderList
