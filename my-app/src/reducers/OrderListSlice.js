import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const orderListSlice = createSlice({
  name: 'Orders',
  initialState: { orders: [] },
  reducers: {
    ORDER_LIST_REQUEST: state => {
      state.status = 'LOADING'
    },
    ORDER_LIST_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.orders = action.payload
    },
    ORDER_LIST_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.error = action.payload
    },
    ORDER_LIST_CLEAR: state => {
      state.orders = []
    },
  },
})

const getOrderList = () => async (dispatch, getState) => {
  try {
    dispatch(ORDER_LIST_REQUEST())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/orders', config)

    dispatch(ORDER_LIST_SUCCESS(data))
  } catch (error) {
    dispatch(
      ORDER_LIST_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

const clearOrderList = () => async dispatch => {
  dispatch(ORDER_LIST_CLEAR())
}

getOrderList()
clearOrderList()
export { getOrderList, clearOrderList }

export const {
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_CLEAR,
} = orderListSlice.actions

export default orderListSlice.reducer
