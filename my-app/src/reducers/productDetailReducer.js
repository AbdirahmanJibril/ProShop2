import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// product list slice
export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: { product: {}, review: {} },
  reducers: {
    REQUEST: state => {
      state.status = 'LOADING'
    },
    SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.product = action.payload
    },
    FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
  },
})

// thunk function - product action - fetches data from database via backend
const getProduct = id => async dispatch => {
  try {
    dispatch(REQUEST())
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(SUCCESS(data))
  } catch (error) {
    dispatch(
      FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
getProduct()

export { getProduct }
export const { REQUEST, SUCCESS, FAIL } = productDetailSlice.actions

export default productDetailSlice.reducer
