import { createSlice } from '@reduxjs/toolkit'
import { logout } from './userReducers/userLoginSlice'
import axios from 'axios'

export const orderDeliverSlice = createSlice({
  name: 'deliverOrder',
  initialState: { Deliver: {} },
  reducers: {
    ORDER_DELIVER_REQUEST: state => {
      state.status = 'LOADING'
    },
    ORDER_DELIVER_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.Deliver = action.payload
    },
    ORDER_DELIVER_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.Deliver = action.payload
    },
    ORDER_DELIVER_RESET: state => {
      state.status = 'RESET'
      state.Deliver = {}
    },
  },
})

export const deliverOrder = order => async (dispatch, getState) => {
  try {
    dispatch(ORDER_DELIVER_REQUEST())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    )

    dispatch(ORDER_DELIVER_SUCCESS(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch(ORDER_DELIVER_FAIL())
  }
}

export const orderDeliverReset = () => async dispatch => {
  dispatch(ORDER_DELIVER_RESET())
}

deliverOrder()
orderDeliverReset()
export const {
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_RESET,
} = orderDeliverSlice.actions

export default orderDeliverSlice.reducer
