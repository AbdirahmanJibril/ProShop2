import { createSlice } from '@reduxjs/toolkit'
import { login } from './userLoginSlice'
import axios from 'axios'

//local storage set with user data
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

export const userRegisterSlice = createSlice({
  name: 'Register',
  initialState: { userInfo: userInfoFromStorage },
  reducers: {
    REGISTER_REQUREST: state => {
      state.status = 'REGISTER REQUEST'
    },
    REGISTER_SUCCESS: (state, action) => {
      state.status = 'REGISTER SUCCESS'
      state.userInfo = action.payload
    },
    REGISTER_FAIL: (state, action) => {
      state.status = 'REGISTER FAILED'
      state.error = action.payload
    },
  },
})

// Tank function for user register

const register = (name, email, password) => async dispatch => {
  try {
    dispatch(REGISTER_REQUREST())
    const config = {
      headers: { 'Content-Type': 'application/json' },
    }
    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    )
    dispatch(REGISTER_SUCCESS(data))
    dispatch(login(email, password))
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      REGISTER_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
register()
export { register }
export const { REGISTER_REQUREST, REGISTER_SUCCESS, REGISTER_FAIL } =
  userRegisterSlice.actions

export default userRegisterSlice.reducer
