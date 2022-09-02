import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { editProduct, productEditReset } from '../reducers/ProductEditSlice'
import {
  getProduct,
  productDetailReset,
} from '../reducers/productDetailReducer'

const ProductEditScreen = () => {
  const params = useParams()
  const productId = params.id
  const navigate = useNavigate()

  const productDetail = useSelector(state => state.productDetail)
  const { product: Product, error, status: productDetailstatus } = productDetail

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productedit = useSelector(state => state.productedit)
  const { product: productEdited, status: productEditStatus } = productedit

  useEffect(() => {
    if (productEditStatus === 'SUCCESS') {
      dispatch(productEditReset())
      navigate('/admin/productlist')
    } else {
      dispatch(getProduct(productId))

      setName(Product.name)
      setPrice(Product.price)
      setImage(Product.image)
      setBrand(Product.brand)
      setCategory(Product.category)
      setCountInStock(Product.countInStock)
      setDescription(Product.description)
    }
  }, [
    dispatch,
    navigate,
    productId,
    productEditStatus,
    Product.brand,
    Product.name,
    Product.price,
    Product.image,
    Product.category,
    Product.countInStock,
    Product.description,
  ])

  const submitHandler = e => {
    e.preventDefault()
    dispatch(
      editProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        countInStock,
      })
    )
  }
  const uploadFileHandler = async e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <h1>Edit Product</h1>
      {productEditStatus === 'LOADING' && <Loader />}
      {productEditStatus === 'FAIL' && <Alert variant='danger'>{error}</Alert>}
      {productDetailstatus === 'LOADING' && <Loader />}
      {productDetailstatus === 'FAIL' && (
        <Alert variant='danger'>{error}</Alert>
      )}
      <Form enctype='multipart/form-data' onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={name}
            onChange={e => setName(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter price'
            value={price}
            onChange={e => setPrice(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='image'>
          <Form.Label>current Image</Form.Label>
          <Form.Control
            type='text'
            label='Choose File'
            value={image}
            onChange={e => setImage(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group controlId='setNewImage'>
          <Form.Label>Choose New Image</Form.Label>
          <Form.Control
            type='file'
            label='Choose File'
            custom
            onChange={uploadFileHandler}></Form.Control>
        </Form.Group>
        {uploading && <Loader />}
        <Form.Group controlId='brand'>
          <Form.Label>Brand</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter brand'
            value={brand}
            onChange={e => setBrand(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='countInStock'>
          <Form.Label>Count In Stock</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter countInStock'
            value={countInStock}
            onChange={e => setCountInStock(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter category'
            value={category}
            onChange={e => setCategory(e.target.value)}></Form.Control>
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter description'
            value={description}
            onChange={e => setDescription(e.target.value)}></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
      </Form>
    </>
  )
}

export default ProductEditScreen
