import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// product reviews slice
export const productReviewCreate = createSlice({
  name: 'productReview',
  initialState: { review: {} },
  reducers: {
    PRODUCT_CREATE_REVIEW_REQUEST: state => {
      state.status = 'LOADING'
    },
    PRODUCT_CREATE_REVIEW_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.review = action.payload
    },
    PRODUCT_CREATE_REVIEW_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
    PRODUCT_CREATE_REVIEW_RESET: state => {
      state.review = {}
    },
  },
})

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(PRODUCT_CREATE_REVIEW_REQUEST())

      const {
        userLogin: { userInfo },
      } = getState()

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      await axios.post(`/api/products/${productId}/reviews`, review, config)

      dispatch(PRODUCT_CREATE_REVIEW_SUCCESS())
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
      }
      dispatch(PRODUCT_CREATE_REVIEW_FAIL(message))
    }
  }

export const productReviewReset = () => async dispatch => {
  dispatch(PRODUCT_CREATE_REVIEW_RESET())
}
createProductReview()
productReviewReset()

export const {
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} = productReviewCreate.actions

export default productReviewCreate.reducer
