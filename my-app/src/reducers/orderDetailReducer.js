import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logout } from './userReducers/userLoginSlice'

const orderDetailFromStorage = localStorage.getItem('orderDetail')
  ? JSON.parse(localStorage.getItem('orderDetail'))
  : {}
export const OrderDetailSlice = createSlice({
  name: 'OrderDetailSlice',
  initialState: { orderDetail: {} },
  reducers: {
    ORDER_DETAILS_REQUEST: state => {
      state.status = 'LOADING'
    },
    ORDER_DETAILS_SUCCESS: (state, action) => {
      return {
        ...state,
        status: 'SUCCESS',
        orderDetail: action.payload,
      }
    },
    ORDER_DETAILS_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.orderDetail = action.payload
    },
  },
})

const getOrderDetails = id => async (dispatch, getState) => {
  try {
    dispatch(ORDER_DETAILS_REQUEST())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch(ORDER_DETAILS_SUCCESS(data))

    localStorage.setItem('orderDetail', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch(
      ORDER_DETAILS_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

getOrderDetails()

export { getOrderDetails }

export const {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
} = OrderDetailSlice.actions

export default OrderDetailSlice.reducer
