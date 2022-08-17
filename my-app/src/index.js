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
import OrderStatus from './screens/OrderStatus'

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
          <Route path='viewOrder/:id' element={<Orderdetail2 />} />
          <Route path='status/:id' element={<OrderStatus />} />
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
