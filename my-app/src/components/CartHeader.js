import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useSelector } from 'react-redux'
const CartHeader = () => {
  const items = useSelector(state => state.cart)

  return (
    <div>
      <span className='fa-layers fa-fw fa-2x'>
        <i className='fa-solid fa-cart-shopping'></i>
        {items.cartItems && items.cartItems.length > 0 ? (
          <span className='fa-layers-counter fa-layers-top-right fa-2x'>
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
