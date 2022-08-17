import { createSlice } from '@reduxjs/toolkit'

const paymentDetailFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}
export const paymentSlice = createSlice({
  name: 'Payment Method',
  initialState: { Payment: paymentDetailFromStorage },
  reducers: {
    REGISTER_PAYMENT: (state, action) => {
      state.Payment = action.payload
    },
  },
})

const registerPaymentMethod = data => dispatch => {
  dispatch(REGISTER_PAYMENT(data))

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}

registerPaymentMethod()
export { registerPaymentMethod }
export const { REGISTER_PAYMENT } = paymentSlice.actions
export default paymentSlice.reducer
