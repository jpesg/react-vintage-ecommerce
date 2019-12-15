import React from "react";

import { CartContext } from '../context/cart';
import EmptyCart from '../components/Cart/EmptyCart';
import CartItem from '../components/Cart/CartItem';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/user';

export default function Cart() {
  const { user } = React.useContext(UserContext);
  const { total, cart } = React.useContext(CartContext);

  if (cart.length === 0) return <EmptyCart />


  return <section className='cart-items section'>
    <h2>your cart</h2>
    {cart.map(item => <CartItem key={item.id} {...item} />)}
    <h2>total: {total}</h2>
    {user.token ?
      <Link to='checkout' className='btn btn-primary btn-block'>checkout</Link> :
      <Link to='login' className='btn btn-primary btn-block'>login</Link>
    }
  </section>;
}
