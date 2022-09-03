import React from 'react'
<<<<<<< HEAD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
=======
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7

import { useSelector } from 'react-redux'
const CartHeader = () => {
  const items = useSelector(state => state.cart)

  return (
    <div>
<<<<<<< HEAD
      <span className='fa-layers fa-fw fa-2x'>
        <i className='fa-solid fa-cart-shopping'></i>
        {items.cartItems && items.cartItems.length > 0 ? (
          <span className='fa-layers-counter fa-layers-top-right fa-2x'>
=======
      <span className='fa-layers fa-fw fa-3x'>
        <i className='fa-solid fa-cart-shopping'></i>
        {items.cartItems && items.cartItems.length > 0 ? (
          <span className='fa-layers-counter fa-layers-top-right '>
>>>>>>> b5b01b4bda59fb890e8f98da7b2d30f5ca984fe7
            {items.cartItems.reduce((acc, item) => {
              return Number(acc + item.qty)
            }, 0)}
          </span>
        ) : null}
      </span>
    </div>
  )
}

export default CartHeader
