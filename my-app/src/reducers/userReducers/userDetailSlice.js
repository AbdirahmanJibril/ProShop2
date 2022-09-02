import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

<<<<<<< HEAD
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: { user: userInfoFromStorage },
  reducers: {
    USER_PROFILE_REQUREST: state => {
      state.status = 'REQUEST'
    },
    USER_PROFILE_SUCCESS: (state, action) => {
      state.status = 'SUCCESS'
      state.user = action.payload
    },
    USER_PROFILE_FAIL: (state, action) => {
      state.status = 'FAIL'
      state.user = action.payload
    },
    USER_DETAILS_RESET: state => {
      state.user = {}
=======
//local storage set with user data
// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: { user: {} },
  reducers: {
    USER_PROFILE_REQUREST: state => {
      state.status = 'USER_PROFILE REQUEST'
    },
    USER_PROFILE_SUCCESS: (state, action) => {
      state.status = 'USER_PROFILE SUCCESS'
      state.user = action.payload
    },
    USER_PROFILE_FAIL: (state, action) => {
      state.status = 'USER_PROFILE FAILED'
      state.error = action.payload
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
    },
  },
})

// Tank function for user USER_PROFILE

const getUserProfile = id => async (dispatch, getState) => {
  try {
    dispatch(USER_PROFILE_REQUREST())

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, config)
    dispatch(USER_PROFILE_SUCCESS(data))

<<<<<<< HEAD
    localStorage.setItem('userInfo', JSON.stringify(data))
=======
    // localStorage.setItem('userInfo', JSON.stringify(data))
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
  } catch (error) {
    dispatch(
      USER_PROFILE_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
<<<<<<< HEAD
const clearUserDetail = () => async dispatch => {
  dispatch(USER_DETAILS_RESET())
}

getUserProfile()

export { getUserProfile, clearUserDetail }
=======
getUserProfile()
export { getUserProfile }
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
export const {
  USER_PROFILE_REQUREST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
<<<<<<< HEAD
  USER_DETAILS_RESET,
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
} = userProfileSlice.actions

export default userProfileSlice.reducer
