import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// product list slice
export const productCreateSlice = createSlice({
  name: 'prodcreate',
  initialState: { product: {} },
  reducers: {
    PRODUCT_CREATE_REQUEST: state => {
      state.status = 'LOADING'
    },
    PRODUCT_CREATE_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.product = action.payload
    },
    PRODUCT_CREATE_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
    PRODUCT_CREATE_RESET: state => {
      state = {}
    },
  },
})

// thunk function - product action - fetches data from database via backend
const productCreate = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    dispatch(PRODUCT_CREATE_REQUEST())
    const { data } = await axios.post('/api/products/', {}, config)

    dispatch(PRODUCT_CREATE_SUCCESS(data))
  } catch (error) {
    dispatch(
      PRODUCT_CREATE_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

const productCreateReset = () => dispatch => {
  dispatch(PRODUCT_CREATE_RESET())
}

productCreate()
productCreateReset()
export { productCreate, productCreateReset }
export const {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
} = productCreateSlice.actions

export default productCreateSlice.reducer
