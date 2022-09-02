import { createSlice } from '@reduxjs/toolkit'

const paymentDetailFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}
export const paymentSlice = createSlice({
  name: 'Payment Method',
  initialState: { Payment: paymentDetailFromStorage },
  reducers: {
    REGISTER_PAYMENT: (state, action) => {
<<<<<<< HEAD
      return {
        ...state,
        Payment: action.payload,
      }
=======
      state.Payment = action.payload
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
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
