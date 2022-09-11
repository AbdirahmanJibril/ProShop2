import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Rating from '../components/Rating'
import Paginate from '../components/Paginate'
import { getProducts } from '../reducers/productLisreducer'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
const HomeScreen = () => {
  const params = useParams()
  const pageNumber = params.pageNumber || 1
  const keyword = params.keyword
  console.log(keyword)
  const productList = useSelector(state => state.productList)
  const dispatch = useDispatch()
  const { products, status, error, pages, page } = productList

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}

      <>
        <Row>
          {status === 'loading' ? (
            <Loader />
          ) : status === 'failed' ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={3}>
                <Card className='my-3 p-3 rounded'>
                  <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant='top' />
                  </Link>
                  <Card.Body>
                    <Link to={`/product/${product._id}`}>
                      <Card.Title as='div'>{product.name}</Card.Title>
                    </Link>
                    <Card.Text as='div'>
                      <div className='my-3'>
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                      </div>
                    </Card.Text>
                    <Card.Text as='h3'>${product.price}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
      </>
    </>
  )
}

export default HomeScreen
