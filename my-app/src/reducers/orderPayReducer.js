import { createSlice } from '@reduxjs/toolkit'
import { logout } from './userReducers/userLoginSlice'
import axios from 'axios'

export const orderPaySlice = createSlice({
  name: 'PayOrder',
  initialState: { Pay: {} },
  reducers: {
    ORDER_PAY_REQUEST: state => {
      state.status = 'LOADING'
    },
    ORDER_PAY_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.Pay = action.payload
    },
    ORDER_PAY_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.Pay = action.payload
    },
    ORDER_PAY_RESET: (state, action) => {
      state.status = 'RESET'
<<<<<<< HEAD
      state.Pay = {}
=======
      action.payload = {}
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
    },
  },
})

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(ORDER_PAY_REQUEST())

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
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      )

      dispatch(ORDER_PAY_SUCCESS(data))
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch(ORDER_PAY_FAIL())
    }
  }
<<<<<<< HEAD
export const orderPayReset = () => async dispatch => {
  dispatch(ORDER_PAY_RESET())
}
payOrder()
orderPayReset()
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7

export const {
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
} = orderPaySlice.actions

export default orderPaySlice.reducer
