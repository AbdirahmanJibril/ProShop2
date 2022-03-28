import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []
export const cartReducerSlice = createSlice({
  name: 'CartItems',
  initialState: { cartItems: cartItemsFromStorage },
  reducers: {
    CART_ADD_ITEM: (state, action) => {
      const item = action.payload

      const newItem = state.cartItems.find(x => {
        return x.product === item.product
      })

      if (newItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x =>
            x.product === newItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    },
    CART_REMOVE_ITEM: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(x => {
          return x.product !== action.payload
        }),
      }
    },
  },
})

const removeFromCart = id => (dispatch, getState) => {
  dispatch(CART_REMOVE_ITEM(id))
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

removeFromCart()

const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch(
    CART_ADD_ITEM({
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    })
  )

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
addToCart()

export { addToCart, removeFromCart }
export const { CART_ADD_ITEM, CART_REMOVE_ITEM } = cartReducerSlice.actions
export default cartReducerSlice.reducer
