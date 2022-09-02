import { createSlice } from '@reduxjs/toolkit'
import { getProduct } from './productDetailReducer'
import { logout } from './userReducers/userLoginSlice'
import axios from 'axios'

export const producEditSlice = createSlice({
  name: 'productUpdate',
  initialState: { product: {} },
  reducers: {
    PRODUCT_UPDATE_REQUEST: state => {
      state.status = 'REQUEST'
    },
    PRODUCT_UPDATE_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.product = action.payload
    },
    PRODUCT_UPDATE_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
    PRODUCT_UPDATE_RESET: (state, action) => {
      state.status = 'RESET'
      state.product = {}
    },
  },
})

const editProduct = product => async (dispatch, getState) => {
  try {
    dispatch(PRODUCT_UPDATE_REQUEST)

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )

    dispatch(PRODUCT_UPDATE_SUCCESS(data))

    dispatch(getProduct(product._id))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch(PRODUCT_UPDATE_FAIL(message))
  }
}

const productEditReset = () => async dispatch => {
  dispatch(PRODUCT_UPDATE_RESET())
}
editProduct()
productEditReset()
export { editProduct, productEditReset }

export const {
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
} = producEditSlice.actions
export default producEditSlice.reducer
