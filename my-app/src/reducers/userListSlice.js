import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logout } from './userReducers/userLoginSlice'

export const userListSlice = createSlice({
  name: 'userList',
  initialState: { users: [] },
  reducers: {
    USER_LIST_REQUEST: state => {
      state.status = 'LOADING'
    },
    USER_LIST_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.users = action.payload
    },
    USER_LIST_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.users = action.payload
    },
    USER_LIST_CLEAR: state => {
      state.users = []
    },
  },
})

const userListClear = async () => dispatch => {
  dispatch(USER_LIST_CLEAR())
}

const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(USER_LIST_REQUEST())

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get('/api/users', config)

    dispatch(USER_LIST_SUCCESS(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch(USER_LIST_FAIL(error))
  }
}

listUsers()
userListClear()
export { listUsers, userListClear }

export const {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_CLEAR,
} = userListSlice.actions

export default userListSlice.reducer
