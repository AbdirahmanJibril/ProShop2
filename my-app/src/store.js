import { configureStore } from '@reduxjs/toolkit'

import productListReducers from './reducers/productLisreducer'
import productDetailReducer from './reducers/productDetailReducer'
import cartReducers from './reducers/cartReducer'

export default configureStore({
  reducer: {
    productList: productListReducers,
    productDetail: productDetailReducer,
    cart: cartReducers,
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
