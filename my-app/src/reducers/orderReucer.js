import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const orderCreateSlice = createSlice({
  name: 'OrderSlice',
  initialState: {
    order: {},
  },
  reducers: {
    ORDER_CREATE_REQUEST: state => {
      state.status = 'LOADING'
    },
    ORDER_CREATE_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.order = action.payload
    },

    ORDER_CREATE_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.order = action.payload
    },
    ORDER_CLEAR_ITEMS: state => {
      state.order = {}
    },
  },
})

// thunk function order create

// Create order
const createOrder = newOrder => async (dispatch, getState) => {
  try {
    dispatch(ORDER_CREATE_REQUEST())

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post('/api/orders', newOrder, config)

    dispatch(ORDER_CREATE_SUCCESS(data))

    localStorage.setItem('order', JSON.stringify(data))
  } catch (error) {
    dispatch(
      ORDER_CREATE_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
const clearOrder = () => async dispatch => {
  dispatch(ORDER_CLEAR_ITEMS())
<<<<<<< HEAD
=======
  localStorage.removeItem('cartItems')
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
}
createOrder()
clearOrder()
export { createOrder, clearOrder }

export const {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CLEAR_ITEMS,
} = orderCreateSlice.actions

export default orderCreateSlice.reducer
