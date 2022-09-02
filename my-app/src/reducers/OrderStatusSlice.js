import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logout } from './userReducers/userLoginSlice'

export const OrderStatusSlice = createSlice({
  name: 'orderStatus',
  initialState: { orderState: {} },
  reducers: {
    ORDER_STATUS_REQUEST: state => {
      state.status = 'LOADING'
    },
    ORDER_STATUS_SUCCESS: (state, action) => {
      return {
        ...state,
        status: 'SUCCESS',
        orderState: action.payload,
      }
    },
    ORDER_STATUS_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.orderState = action.payload
    },
  },
})

const getOrderStatus = id => async (dispatch, getState) => {
  try {
    dispatch(ORDER_STATUS_REQUEST())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch(ORDER_STATUS_SUCCESS(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch(
      ORDER_STATUS_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

getOrderStatus()

export { getOrderStatus }

export const { ORDER_STATUS_REQUEST, ORDER_STATUS_SUCCESS, ORDER_STATUS_FAIL } =
  OrderStatusSlice.actions

export default OrderStatusSlice.reducer
