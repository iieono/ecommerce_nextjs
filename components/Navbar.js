import React from 'react'
import { useStateContext } from '../context/StateContext'

import Link from 'next/link'
import { AiOutlineShopping } from 'react-icons/ai'
import { Cart } from './'


export default function Navbar() {
  const {showCart, setShowCart, totalQuantities} = useStateContext()
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Headphone Store</Link>
      </p>
      <button type='button' className='cart-icon' onClick={()=>setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities < 99 ? totalQuantities : "99"}</span>
      </button>

    {showCart && <Cart />}

    </div>
  )
}
