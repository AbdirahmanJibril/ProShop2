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
  Container,
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
          <Container fluid>
            {cartItems.map(item => (
              <Container fluid key={item.product}>
                <Row>
                  <Col sm={3}>
                    <Link to={`/product/${item.product}`}>
                      <Card.Img src={item.image} alt={item.name} />
                    </Link>
                  </Col>
                  <Col sm={6}>
                    <h5>
                      {' '}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </h5>

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
                          {[...Array(item.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col sm={3}>
                    <Button
                      variant='light'
                      type='button'
                      onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fa-solid fa-trash-can fa-lg'></i>
                    </Button>
                  </Col>
                </Row>
              </Container>
            ))}
          </Container>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => {
                  return Number(acc + item.qty)
                }, 0)}{' '}
                )
                {cartItems.reduce((counter, item) => {
                  return counter + item.qty === 1 ? 'item' : 'items'
                }, 0)}
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
