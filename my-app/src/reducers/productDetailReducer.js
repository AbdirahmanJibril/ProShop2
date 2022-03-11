import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// product list slice
export const productDetailReducer = createSlice({
  name: 'productDetail',
  initialState: { product: {}, review: {} },
  reducers: {
    Request: state => {
      state.status = 'loading'
    },
    Success: (state, action) => {
      state.status = 'complete'
      state.product = action.payload
    },
    Fail: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

// thunk function - product action - fetches data from database via backend
const getProduct = id => async dispatch => {
  try {
    dispatch(Request())
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(Success(data))
  } catch (error) {
    dispatch(
      Fail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
getProduct()

export { getProduct }
export const { Request, Success, Fail } = productDetailReducer.actions

export default productDetailReducer.reducer
