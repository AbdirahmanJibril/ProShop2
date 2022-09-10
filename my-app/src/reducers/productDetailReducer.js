import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// product list slice
export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: { product: { reviews: [] } },
  reducers: {
    PRODUCT_DETAIL_REQUEST: state => {
      state.status = 'LOADING'
    },
    PRODUCT_DETAIL_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.product = action.payload
    },
    PRODUCT_DETAIL_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
    PRODUCT_DETAIL_RESET: state => {
      state.product = {}
    },
  },
})

// thunk function - product action - fetches data from database via backend
const getProduct = id => async dispatch => {
  try {
    dispatch(PRODUCT_DETAIL_REQUEST())
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(PRODUCT_DETAIL_SUCCESS(data))
  } catch (error) {
    dispatch(
      PRODUCT_DETAIL_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

const productDetailReset = () => async dispatch => {
  dispatch(PRODUCT_DETAIL_RESET())
}
getProduct()

export { getProduct, productDetailReset }
export const {
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_RESET,
} = productDetailSlice.actions

export default productDetailSlice.reducer
