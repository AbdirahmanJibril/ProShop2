import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../reducers/cartReducer'
import { useDispatch, useSelector } from 'react-redux'

import {
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Button,
  ListGroupItem,
} from 'react-bootstrap'

const CartScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  let location = useLocation()
  const qty = location ? Number(location.search.split('=')[1]) : 1
  const newItems = useSelector(state => state.cart)
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const { cartItems } = newItems
  // load cart items
  const navigate = useNavigate()
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty))
    }
  }, [dispatch, id, qty, navigate])

  // display cart item

  //Remove item from cart
  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    if (userInfo) {
      navigate('/shipping')
    } else {
      navigate('/login')
    }
  }

  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message variant={'danger'}>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <Row>
            {cartItems.map(item => (
              <Col md={4}>
                <Card>
                  <Link to={`/product/${item.product}`}>
                    <Card.Img src={item.image} alt={item.name} />
                  </Link>
                  <Card.Body>
                    <Card.Title>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Card.Title>

                    <ListGroup className='list-group-flush'>
                      <ListGroupItem as='h5'>${item.price}</ListGroupItem>
                      <ListGroupItem>
                        <Form.Select
                          as='select'
                          value={item.qty}
                          onChange={e =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }>
                          {[...Array(item.countInStock).keys()].map(y => {
                            return (
                              <option key={y + 1} value={y + 1}>
                                {y + 1}
                              </option>
                            )
                          })}
                        </Form.Select>
                      </ListGroupItem>
                      <div className='d-grid gap-2'>
                        <Button
                          type='button'
                          variant='dark'
                          onClick={() => removeFromCartHandler(item.product)}>
                          Remove
                        </Button>
                      </div>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({' '}
                {cartItems.reduce((acc, item) => {
                  return acc + item.qty
                }, 0)}{' '}
                ) items
              </h2>
              <h4>
                $ (
                {cartItems.reduce((acc, item) => {
                  return acc + item.qty * item.price
                }, 0)}
                )
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className='d-grid gap-2'>
                <Button
                  type='button'
                  variant='dark'
                  className='btn-block'
                  onClick={checkoutHandler}
                  disabled={cartItems.length === 0}>
                  Check Out
                </Button>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
