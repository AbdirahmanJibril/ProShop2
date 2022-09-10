import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { searProductFail } from '../reducers/SearchBoxSlice'
import Loader from '../components/Loader'
import { Card, Row, Col, Alert, ListGroup, Image } from 'react-bootstrap'
import Rating from '../components/Rating'

const SearchProdScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const foundProd = useSelector(state => state.searchProduct)
  const { product, status, error } = foundProd

  useEffect(() => {
    if (!product || product.length === 0) {
      dispatch(searProductFail())
    }
  }, [dispatch, navigate, product, status])

  return (
    <>
      {status === 'LOADING' && <Loader />}
      {status === 'FAIL' && <Alert variant='danger'>{error}</Alert>}

      <Row>
        {product.map(prod => (
          <Row key={prod._id}>
            <Col md={6}>
              <Image src={prod.image} alt={product.name} fluid />
            </Col>
            <Col md={6}>
              <Row>
                <Col>
                  <Card>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>{prod.price}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            {prod.countInStock > 0
                              ? 'In Stock'
                              : 'Out of Stock'}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Qty</Col>
                          <Col>{prod.countInStock}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Col>{prod.description}</Col>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 style={{ textAlign: 'center', marginTop: '30px' }}>
                    Reviews
                  </h3>
                  {prod.reviews.length === 0 && (
                    <Alert variant='info'>No Reviews</Alert>
                  )}
                  <ListGroup variant='flush'>
                    {prod.reviews.map(review => (
                      <ListGroup.Item key={review._id}>
                        <h5>{review.name}</h5>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
      </Row>
    </>
  )
}

export default SearchProdScreen
