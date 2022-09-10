import React, { useEffect } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../reducers/productLisreducer'
import { deleteProduct } from '../reducers/ProductDeleteSlice'
import {
  productCreate,
  productCreateReset,
} from '../reducers/ProductCreateSlice'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

const ProductListScreen = () => {
  const params = useParams()
  const keyword = params.keyword
  const pageNumber = params.pageNumber

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const productDelete = useSelector(state => state.productDelete)
  const { product: productDeleted, status: productDeletedStatus } =
    productDelete

  const productList = useSelector(state => state.productList)
  const { products, page, pages } = productList

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const createdProduct = useSelector(state => state.productcreate)
  const { product, status: productCreateStatus } = createdProduct

  useEffect(() => {
    dispatch(productCreateReset())
    if (userInfo && userInfo.isAdmin) {
      dispatch(getProducts('', pageNumber))
    } else {
      navigate('/login')
    }
    if (productCreateStatus === 'SUCCESS') {
      navigate(`/admin/product/${product._id}/edit`)
    }
  }, [
    dispatch,
    userInfo,
    createdProduct,
    product,
    navigate,
    productCreateStatus,
    productDeleted,
    keyword,
  ])

  const createProductHandler = () => {
    if (!userInfo.isAdmin) {
      navigate('/loging')
    }
    dispatch(productCreate())
  }
  const deleteHandler = id => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
      if (productDeletedStatus === 'success') {
        navigate('/admin/productlist')
      }
    }
  }

  return (
    <>
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {productCreateStatus === 'LOADING' && <Loader />}
      {productCreateStatus === 'SUCCESS' && (
        <Alert variant='info'>create product successful</Alert>
      )}
      {productCreateStatus === 'FAIL' && (
        <Alert variant='danger'>create product failed</Alert>
      )}

      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteHandler(product._id)}>
                  <i className='fas fa-trash'></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Paginate
        page={page}
        pages={pages}
        pageNumber={pageNumber}
        isAdmin={true}
      />
    </>
  )
}

export default ProductListScreen
