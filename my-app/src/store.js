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
import UserDeletSlice from './reducers/userReducers/UserDeletSlice'
import userListSlice from './reducers/userListSlice'
import UserUpdateSlice from './reducers/userReducers/UserUpdateSlice'
import ProductDeleteSlice from './reducers/ProductDeleteSlice'
import productCreateSlice from './reducers/ProductCreateSlice'
import producEditSlice from './reducers/ProductEditSlice'
import OrderListSlice from './reducers/OrderListSlice'
import orderDeliverSlice from './reducers/orderDeliverSlice'

export default configureStore({
  reducer: {
    productList: productListSlice,
    productDetail: productDetailSlice,
    productDelete: ProductDeleteSlice,
    productcreate: productCreateSlice,
    productedit: producEditSlice,
    cart: cartReducerSlice,
    payment: paymentSlice,
    orderpay: orderPaySlice,
    orderdeliver: orderDeliverSlice,
    Orders: OrderListSlice,
    orderList: myOrderListSlice,
    userdelete: UserDeletSlice,
    shipping: shippingSlice,
    userLogin: userLoginSlice,
    userRegister: userRegisterSlice,
    userList: userListSlice,
    userProfile: userProfileSlice,
    updateUserProfile: updateUserProfileSlice,
    userUpdate: UserUpdateSlice,
    createdOrder: orderCreateSlice,
    viewOrderDetail: OrderDetailSlice,
  },
})
