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
<<<<<<< HEAD
      state.error = action.payload
    },
    MY_ORDERS_LIST_RESET: (state, action) => {
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
      state.orders = action.payload
    },
  },
})

<<<<<<< HEAD
const getMyOrderList = () => async (dispatch, getState) => {
=======
const getMyOrderList = id => async (dispatch, getState) => {
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
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

<<<<<<< HEAD
const resetMyOrderList = () => async dispatch => {
  dispatch(MY_ORDERS_LIST_RESET())
}
getMyOrderList()
resetMyOrderList()
export { getMyOrderList, resetMyOrderList }
=======
getMyOrderList()

export { getMyOrderList }
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7

export const {
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
<<<<<<< HEAD
  MY_ORDERS_LIST_RESET,
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
} = myOrderListSlice.actions

export default myOrderListSlice.reducer
