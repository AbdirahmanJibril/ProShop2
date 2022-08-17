import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../reducers/productDetailReducer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  FormControl,
} from 'react-bootstrap'
import { addToCart } from '../reducers/cartReducer'

const ProductScreen = () => {
  const productDetail = useSelector(state => state.productDetail)
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const { product, status, error } = productDetail
  const { id } = useParams()
  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id])
  const navigate = useNavigate()

  const cartHandler = () => {
    dispatch(addToCart(id, Number(qty)))

    navigate('/cart')
  }

  return (
    <div>
      <Button variant='light' type='button' href='/' className='my-3'>
        Go back
      </Button>
      {status === 'loading' ? (
        <Loader />
      ) : error ? (
        <Message variant={'danger'}>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>{product.name}</ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {product.countInStock > 0 && (
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <FormControl
                          as='select'
                          value={qty}
                          onChange={e => setQty(e.target.value)}>
                          {[...Array(product.countInStock).keys()].map(x => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </FormControl>
                      </Col>
                    </Row>
                  )}
                </ListGroup.Item>
                <div className='d-grid gap-2'>
                  <Button
                    variant='dark'
                    onClick={cartHandler}
                    disabled={product.countInStock === 0}>
                    Add to cart
                  </Button>
                </div>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default ProductScreen
