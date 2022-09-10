import React from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Row>
      <Col>
        <Card className='my-3 p-3 rounded'>
          <Link to={`/product/${product._id}`}>
            <Card.Img variant='top' src={product.image} />
          </Link>
          <Card.Body>
            <Card.Text>
              <Link to={`/product/${product._id}`}>
                <Card.Title as='h5'>{product.name}</Card.Title>
              </Link>
            </Card.Text>

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
    </Row>
  )
}

export default Product
