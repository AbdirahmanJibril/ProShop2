import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

import { logout } from './userLoginSlice'

export const userDeletSlice = createSlice({
  name: 'DELETEUSER',
  initialState: { userDelete: {} },
  reducers: {
    USER_DELETE_REQUEST: state => {
      state.status = 'REQUEST'
    },
    USER_DELETE_SUCCESS: state => {
      state.status = 'SUCCESS'
    },
    USER_DELETE_FAIL: (state, action) => {
      state.status = 'FAIL'
    },
    USER_DELETE_RESET: state => {
      return state
    },
  },
})

const resetListUsers = () => async dispatch => {
  dispatch(USER_DELETE_RESET())
}

const deleteUser = id => async (dispatch, getState) => {
  try {
    dispatch(USER_DELETE_REQUEST())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch(USER_DELETE_SUCCESS())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch(USER_DELETE_FAIL(message))
  }
}

deleteUser()
resetListUsers()
export { deleteUser, resetListUsers }

export const {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_RESET,
} = userDeletSlice.actions
export default userDeletSlice.reducer
