import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../reducers/productDetailReducer'
import {
  createProductReview,
  productReviewReset,
} from '../reducers/ProductReviewCreateSlice'
import { Form, Container } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Rating from '../components/Rating'
import Meta from '../components/Meta'
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
  const dispatch = useDispatch()
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector(state => state.productReviewCreate)

  const {
    status: productReviewStatus,

    error: errorProductReview,
  } = productReviewCreate

  const productDetail = useSelector(state => state.productDetail)
  const { product, status, error } = productDetail
  const { id } = useParams()

  useEffect(() => {
    if (!product._id || product._id !== id) {
      dispatch(getProduct(id))
      dispatch(productReviewReset())
    }
    if (productReviewStatus === 'SUCCESS') {
      setRating(0)
      setComment('')
    }
  }, [dispatch, product._id, id, productReviewStatus])
  const navigate = useNavigate()

  const cartHandler = () => {
    dispatch(addToCart(id, Number(qty)))

    navigate('/cart')
  }

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
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
        <>
          <Meta title={product.name} />
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
          <Container>
            <Row>
              <Col md={12}>
                <h3 style={{ textAlign: 'center', marginTop: '30px' }}>
                  Reviews
                </h3>
                {product.reviews.length === 0 && <Message>No Reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map(review => (
                    <ListGroup.Item key={review._id}>
                      <h5>{review.name}</h5>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h4>Write a Customer Review</h4>
                    {productReviewStatus === 'SUCCESS' && (
                      <Message variant='info'>
                        Review submitted successfully
                      </Message>
                    )}
                    {productReviewStatus === 'LOADING' && <Loader />}
                    {errorProductReview && (
                      <Message variant='danger'>{errorProductReview}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId='rating'>
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as='select'
                            value={rating}
                            onChange={e => setRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='comment'>
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as='textarea'
                            row='3'
                            value={comment}
                            onChange={e =>
                              setComment(e.target.value)
                            }></Form.Control>
                        </Form.Group>
                        <Button
                          disabled={productReviewStatus === 'LOADING'}
                          type='submit'
                          variant='primary'>
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message>
                        Please <Link to='/login'>sign in</Link> to write a
                        review{' '}
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  )
}

export default ProductScreen
