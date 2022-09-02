import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const myOrderListSlice = createSlice({
  name: 'MyOrders',
  initialState: { orders: [] },
  reducers: {
    MY_ORDER_LIST_REQUEST: state => {
      state.status = 'LOADING'
    },
    MY_ORDER_LIST_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.orders = action.payload
    },
    MY_ORDER_LIST_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
    MY_ORDERS_LIST_RESET: (state, action) => {
      state.orders = action.payload
    },
  },
})

const getMyOrderList = () => async (dispatch, getState) => {
  try {
    dispatch(MY_ORDER_LIST_REQUEST())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/orders/myorders', config)

    dispatch(MY_ORDER_LIST_SUCCESS(data))
  } catch (error) {
    dispatch(
      MY_ORDER_LIST_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

const resetMyOrderList = () => async dispatch => {
  dispatch(MY_ORDERS_LIST_RESET())
}
getMyOrderList()
resetMyOrderList()
export { getMyOrderList, resetMyOrderList }

export const {
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  MY_ORDERS_LIST_RESET,
} = myOrderListSlice.actions

export default myOrderListSlice.reducer
