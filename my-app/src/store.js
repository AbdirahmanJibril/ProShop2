import { configureStore } from '@reduxjs/toolkit'

import productListSlice from './reducers/productLisreducer'
import productDetailSlice from './reducers/productDetailReducer'
import cartReducerSlice from './reducers/cartReducer'
import userLoginSlice from './reducers/userReducers/userLoginSlice'
import userRegisterSlice from './reducers/userReducers/userRegisterSlice'
import userProfileSlice from './reducers/userReducers/userDetailSlice'
import updateUserProfileSlice from './reducers/userReducers/UpdateUserDetails'
import orderCreateSlice from './reducers/orderReucer'
import OrderDetailSlice from './reducers/orderDetailReducer'
import paymentSlice from './reducers/paymentReducer'
import shippingSlice from './reducers/shippingRducer'
import orderPaySlice from './reducers/orderPayReducer'
import myOrderListSlice from './reducers/MyOrdersReducer'
import OrderStatusSlice from './reducers/OrderStatusSlice'

export default configureStore({
  reducer: {
    productList: productListSlice,
    productDetail: productDetailSlice,
    cart: cartReducerSlice,
    payment: paymentSlice,
    orderpay: orderPaySlice,
    orderList: myOrderListSlice,
    orderStatus: OrderStatusSlice,
    shipping: shippingSlice,
    userLogin: userLoginSlice,
    userRegister: userRegisterSlice,
    userProfile: userProfileSlice,
    updateUserProfile: updateUserProfileSlice,
    createdOrder: orderCreateSlice,
    viewOrderDetail: OrderDetailSlice,
  },
})
