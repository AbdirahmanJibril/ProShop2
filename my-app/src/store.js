import { configureStore } from '@reduxjs/toolkit'

import productListSlice from './reducers/productLisreducer'
import productDetailSlice from './reducers/productDetailReducer'
import cartReducerSlice from './reducers/cartReducer'
import userLoginSlice from './reducers/userReducers/userLoginSlice'
import userRegisterSlice from './reducers/userReducers/userRegisterSlice'

export default configureStore({
  reducer: {
    productList: productListSlice,
    productDetail: productDetailSlice,
    cart: cartReducerSlice,
    userLogin: userLoginSlice,
    userRegister: userRegisterSlice,
  },
})

// import { applyMiddleware, combineReducers, createStore } from 'redux'
// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

// const reducer = combineReducers({
//   productList: productListReducers,
// })
// const initialState = {
//   products: [],
// }

// const middleware = [thunk]
// const store = createStore(
//   reducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// )
