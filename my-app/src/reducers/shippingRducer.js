import { createSlice } from '@reduxjs/toolkit'

const shippingAddressFromStorage = localStorage.getItem('shippingRecords')
  ? JSON.parse(localStorage.getItem('shippingRecords'))
  : {}
<<<<<<< HEAD
=======

>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
export const shippingSlice = createSlice({
  name: 'Shipping Details',
  initialState: { Shipping: shippingAddressFromStorage },
  reducers: {
    SHIPPING_DETAILS: (state, action) => {
      state.Shipping = action.payload
    },
  },
})

const registerShipping = data => dispatch => {
  dispatch(SHIPPING_DETAILS(data))

  localStorage.setItem('shippingRecords', JSON.stringify(data))
}

registerShipping()
export { registerShipping }
export const { SHIPPING_DETAILS } = shippingSlice.actions
export default shippingSlice.reducer
