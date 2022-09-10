import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { logout } from './userLoginSlice'

const userUpdateSlice = createSlice({
  name: 'userUpdate',
  initialState: { user: {} },
  reducers: {
    USER_UPDATE_REQUEST: state => {
      return { status: 'REQUEST' }
    },
    USER_UPDATE_SUCCESS: (state, action) => {
      return { status: 'SUCCESS', user: action.payload }
    },
    USER_UPDATE_FAIL: (state, action) => {
      return { status: 'FAIL', user: action.payload }
    },
    USER_UPDATE_RESET: state => {
      return { user: {} }
    },
  },
})

const updateUser = user => async (dispatch, getState) => {
  try {
    dispatch(USER_UPDATE_REQUEST())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch(USER_UPDATE_SUCCESS(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout)
    }
    dispatch(USER_UPDATE_FAIL(error))
  }
}

const userUpdateclear = async () => dispatch => {
  dispatch(USER_UPDATE_RESET())
}
updateUser()
userUpdateclear()
export { updateUser, userUpdateclear }

const {
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
} = userUpdateSlice.actions

export default userUpdateSlice.reducer
