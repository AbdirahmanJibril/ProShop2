import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// product reviews slice
export const productTopRated = createSlice({
  name: 'productTop',
  initialState: { products: [] },
  reducers: {
    PRODUCT_TOP_REQUEST: state => {
      state.status = 'LOADING'
    },
    PRODUCT_TOP_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.products = action.payload
    },
    PRODUCT_TOP_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.products = action.payload
    },
  },
})

export const listTopProducts = () => async dispatch => {
  try {
    dispatch(PRODUCT_TOP_REQUEST())

    const { data } = await axios.get('/api/products/top')

    dispatch(PRODUCT_TOP_SUCCESS(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch(PRODUCT_TOP_FAIL(message))
  }
}

export const { PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL } =
  productTopRated.actions

export default productTopRated.reducer
