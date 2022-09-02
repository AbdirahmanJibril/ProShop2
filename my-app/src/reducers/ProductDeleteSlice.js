import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// product delete slice
export const productDeleteSlice = createSlice({
  name: 'productdelete',
  initialState: { product: {} },
  reducers: {
    PRODUCT_DELETE_REQUEST: state => {
      state.status = 'LOADING'
    },
    PRODUCT_DELETE_SUCCESS: state => {
      state.status = 'SUCCESS'
    },
    PRODUCT_DELETE_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
  },
})

// thunk function - product action - fetches data from database via backend
const deleteProduct = id => async (dispatch, getState) => {
  dispatch(PRODUCT_DELETE_REQUEST())
  try {
    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch(PRODUCT_DELETE_SUCCESS())
  } catch (error) {
    dispatch(
      PRODUCT_DELETE_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
deleteProduct()

export { deleteProduct }
export const {
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
} = productDeleteSlice.actions

export default productDeleteSlice.reducer
