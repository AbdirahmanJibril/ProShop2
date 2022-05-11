import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//local storage set with user data
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

// user loggin info  slice
export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: { userInfo: userInfoFromStorage },
  reducers: {
    LoginRequest: state => {
      state.status = 'login in'
    },
    LoginSuccess: (state, action) => {
      state.status = 'login success'
      state.userInfo = action.payload
    },
    LoginFail: (state, action) => {
      state.status = 'login failed'
      state.error = action.payload
    },
    USER_LOGOUT: state => {
      state.status = 'loged out'
      state.userInfo = null
    },
  },
})

// thunk function - user email and password - fetches data from database via backend
const login = (email, password) => async dispatch => {
  try {
    dispatch(LoginRequest())
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )
    dispatch(LoginSuccess(data))

    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      LoginFail(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

login()

const logout = () => async dispatch => {
  dispatch(USER_LOGOUT())
  localStorage.removeItem('userInfo')
}

logout()
export { login, logout }

export const { LoginRequest, LoginSuccess, LoginFail, USER_LOGOUT } =
  userLoginSlice.actions

export default userLoginSlice.reducer
