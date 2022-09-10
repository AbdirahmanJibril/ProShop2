import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const searchBoxSlice = createSlice({
  name: 'SearchBox',
  initialState: { product: {} },
  reducers: {
    PRODUCT_FIND_REQUEST: state => {
      state.status = 'LOADING'
    },
    PRODUCT_FIND_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.product = action.payload
    },
    PRODUCT_FIND_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
    PRODUCT_FIND_RESET: state => {
      state.product = {}
    },
  },
})

export const searchProduct = keyword => async dispatch => {
  try {
    dispatch(PRODUCT_FIND_REQUEST())

    const { data } = await axios.get(`/api/search/${keyword}`)
    dispatch(PRODUCT_FIND_SUCCESS(data))
  } catch (error) {
    dispatch(
      PRODUCT_FIND_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const searchProductReset = () => async dispatch => {
  dispatch(PRODUCT_FIND_RESET())
}

export const searProductFail = () => async dispatch => {
  dispatch(PRODUCT_FIND_FAIL())
}
searchProduct()
searchProductReset()
export const {
  PRODUCT_FIND_REQUEST,
  PRODUCT_FIND_SUCCESS,
  PRODUCT_FIND_FAIL,
  PRODUCT_FIND_RESET,
} = searchBoxSlice.actions

export default searchBoxSlice.reducer
