import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// product list slice
export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: { product: {}, review: {} },
  reducers: {
<<<<<<< HEAD
    PRODUCT_DETAIL_REQUEST: state => {
      state.status = 'LOADING'
    },
    PRODUCT_DETAIL_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.product = action.payload
    },
    PRODUCT_DETAIL_FAIL: (state, action) => {
=======
    REQUEST: state => {
      state.status = 'LOADING'
    },
    SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.product = action.payload
    },
    FAIL: (state, action) => {
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
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
<<<<<<< HEAD
    dispatch(PRODUCT_DETAIL_REQUEST())
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(PRODUCT_DETAIL_SUCCESS(data))
  } catch (error) {
    dispatch(
      PRODUCT_DETAIL_FAIL(
=======
    dispatch(REQUEST())
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(SUCCESS(data))
  } catch (error) {
    dispatch(
      FAIL(
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
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

<<<<<<< HEAD
export { getProduct, productDetailReset }
export const {
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_RESET,
} = productDetailSlice.actions
=======
export { getProduct }
export const { REQUEST, SUCCESS, FAIL } = productDetailSlice.actions
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7

export default productDetailSlice.reducer
