import React from 'react'
import { useSelector } from 'react-redux'
const CartHeader = () => {
  const newItems = useSelector(state => state.cart)
  const { cartItems } = newItems
  return (
    <div>
      <span class='fa-layers fa-fw' style={{ fontSize: '30px' }}>
        <i class='fa-solid fa-cart-shopping '></i>
        {cartItems && cartItems.length > 0 ? (
          <span
            class='fa-layers-counter '
            style={{ fontSize: '40px', verticalAlign: 'super' }}>
            {cartItems.reduce((acc, item) => {
              return acc + item.qty
            }, 0)}
          </span>
        ) : null}
      </span>
    </div>
  )
}

export default CartHeader
