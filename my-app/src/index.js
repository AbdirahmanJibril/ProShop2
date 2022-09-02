import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import store from './store'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import './bootstrap.min.css'
import './index.css'
import App from './App'
import ProductScreen from './screens/productScreen'
import CartScreen from './screens/CartScreen'
import ShippingScreen from './screens/shippingScreen'
import reportWebVitals from './reportWebVitals'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import Profile from './screens/Profile'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import Orderdetail2 from './screens/Orderdetail2'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import MyOrders from './screens/MyOrders'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderList from './screens/OrderList'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomeScreen />} />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='product/:id' element={<ProductScreen />} />
          <Route path='cart' element={<CartScreen />} />
          <Route path='shipping' element={<ShippingScreen />} />
          <Route path='payment' element={<PaymentScreen />} />
          <Route path='placeorder' element={<PlaceOrderScreen />} />
          <Route path='admin/orderlist' element={<OrderList />} />
          {/* <Route path='admin/orders/:id' element={<OrderListDetail/>}/> */}
          <Route path='viewOrder/:id' element={<Orderdetail2 />} />

          <Route path='admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          <Route
            path='/admin/product/:id/edit'
            element={<ProductEditScreen />}
          />
          <Route path='admin/productlist' element={<ProductListScreen />} />

          <Route path='/myorders' element={<MyOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
