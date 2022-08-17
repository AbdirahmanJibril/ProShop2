import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//local storage set with user data
// const userInfoFromStorage = localStorage.getItem('userInfo')
//   ? JSON.parse(localStorage.getItem('userInfo'))
//   : null

export const updateUserProfileSlice = createSlice({
  name: 'updateUserProfile',
  initialState: {},
  reducers: {
    UPDATE_USER_PROFILE_REQUREST: state => {
      state.status = 'UPDATE_USER_PROFILE REQUEST'
    },
    UPDATE_USER_PROFILE_SUCCESS: (state, action) => {
      state.status = 'UPDATE_USER_PROFILE SUCCESS'
      state.userInfo = action.payload
    },
    UPDATE_USER_PROFILE_FAIL: (state, action) => {
      state.status = 'UPDATE_USER_PROFILE FAILED'
      state.error = action.payload
    },
  },
})

// Tank function for user USER_PROFILE

const updateUserProfile = user => async (dispatch, getState) => {
  try {
    dispatch(UPDATE_USER_PROFILE_REQUREST())

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

    // localStorage.setItem('userInfo', JSON.stringify(data))
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
updateUserProfile()
export { updateUserProfile }
export const {
  UPDATE_USER_PROFILE_REQUREST,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAIL,
} = updateUserProfileSlice.actions

export default updateUserProfileSlice.reducer
