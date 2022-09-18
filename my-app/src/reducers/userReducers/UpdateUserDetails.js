import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { logout } from './userLoginSlice'
//local storage set with user data
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

export const updateUserProfileSlice = createSlice({
  name: 'updateUserProfile',
  initialState: { userInfo: userInfoFromStorage },
  reducers: {
    UPDATE_USER_PROFILE_REQUREST: state => {
      state.status = 'UPDATE_USER_PROFILE_REQUEST'
    },
    UPDATE_USER_PROFILE_SUCCESS: (state, action) => {
      state.status = 'UPDATE_USER_PROFILE_SUCCESS'
      state.userInfo = action.payload
    },
    UPDATE_USER_PROFILE_FAIL: (state, action) => {
      state.status = 'UPDATE_USER_PROFILE_FAILED'
      state.error = action.payload
    },
    UPDATE_USER_PROFILE_RESET: state => {
      state.userInfo = {}
    },
  },
})

// Tank function for user USER_PROFILE

const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch(UPDATE_USER_PROFILE_RESET())

    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put('/api/users/profile', user, config)
    dispatch(UPDATE_USER_PROFILE_SUCCESS(data))
    dispatch(logout())
  } catch (error) {
    dispatch(
      UPDATE_USER_PROFILE_FAIL(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

const updateUserProfileReset = () => async dispatch => {
  dispatch(UPDATE_USER_PROFILE_RESET())
}
updateUserProfile()
updateUserProfileReset()

export { updateUserProfile, updateUserProfileReset }
export const {
  UPDATE_USER_PROFILE_REQUREST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
  UPDATE_USER_PROFILE_RESET,
} = updateUserProfileSlice.actions

export default updateUserProfileSlice.reducer
