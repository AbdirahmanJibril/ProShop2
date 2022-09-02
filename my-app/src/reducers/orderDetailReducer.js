<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit/'
=======
import { createSlice } from '@reduxjs/toolkit'
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
import axios from 'axios'
import { logout } from './userReducers/userLoginSlice'

const orderDetailFromStorage = localStorage.getItem('orderDetail')
  ? JSON.parse(localStorage.getItem('orderDetail'))
  : {}
<<<<<<< HEAD

export const OrderDetailSlice = createSlice({
  name: 'orderdetail',
  initialState: {
    orderDetail: orderDetailFromStorage,
  },
  reducers: {
    ORDER_DETAILS_REQUEST: state => {
      state.status = 'REQUEST'
    },
    ORDER_DETAILS_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.orderDetail = action.payload
    },
    ORDER_DETAILS_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
    ORDER_DETAILS_RESET: state => {
      state.status = 'RESET'
      state.orderDetail = {}
=======
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
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
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
<<<<<<< HEAD
const orderDetailReset = () => async dispatch => {
  dispatch(ORDER_DETAILS_RESET())
}
getOrderDetails()
orderDetailReset()

export { getOrderDetails, orderDetailReset }
=======

getOrderDetails()

export { getOrderDetails }
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7

export const {
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
<<<<<<< HEAD
  ORDER_DETAILS_RESET,
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
} = OrderDetailSlice.actions

export default OrderDetailSlice.reducer
