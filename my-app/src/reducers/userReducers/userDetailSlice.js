import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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

    localStorage.setItem('userInfo', JSON.stringify(data))
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
const clearUserDetail = () => async dispatch => {
  dispatch(USER_DETAILS_RESET())
}

getUserProfile()

export { getUserProfile, clearUserDetail }
export const {
  USER_PROFILE_REQUREST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  USER_DETAILS_RESET,
} = userProfileSlice.actions

export default userProfileSlice.reducer
