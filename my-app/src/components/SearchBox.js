import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { searchProduct, searchProductReset } from '../reducers/SearchBoxSlice'

const SearchBox = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  let [searchParams, setSearchParams] = useSearchParams()
  let prodFind = searchParams.get('keyword')

  const submitHandler = e => {
    e.preventDefault()
    dispatch(searchProductReset())
    dispatch(searchProduct(prodFind))
    navigate(`search/${prodFind}`)
  }

  return (
    <Form className='d-flex' onSubmit={submitHandler}>
      <Form.Control
        value={searchParams.get('keyword') || ''}
        onChange={event => {
          let keyword = event.target.value
          if (keyword) {
            setSearchParams({ keyword })
          } else {
            setSearchParams({})
          }
        }}
        placeholder='search by product...'
        className='mr-sm-2 ml-sm-5'></Form.Control>
      <Button type='submit' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
