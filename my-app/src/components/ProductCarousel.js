import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../reducers/productTopRatedSlice'
const ProductCarousel = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector(state => state.productTopRated)
  const { products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return products.status === 'LOADING' ? (
    <Loader />
  ) : products.status === 'FAIL' ? (
    <Message variant='danger'>{products.error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
