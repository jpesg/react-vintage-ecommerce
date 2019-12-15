import React from "react";
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import CartLink from './Cart/CartLink';

import { UserContext } from '../context/user';

import LoginLink from './LoginLink';

export default function Header() {
  const { user } = React.useContext(UserContext);
  return <header className='header'>
    <img src={logo} alt="vintage tech logo" className='logo' />

    <nav>
      <ul>
        <div>
          <li><Link to='/home'>home</Link></li>
          <li><Link to='/products'>products</Link></li>
          <li><Link to='/about'>about</Link></li>
          {
            user.token && <li><Link to='/checkout'>checkout</Link></li>
          }
        </div>
        <div>
          {/*<li><Link to='/login'>login</Link></li>*/}
          {/*<li><Link to='/cart'>cart</Link></li>*/}
          <CartLink />
          <LoginLink />
        </div>
      </ul>
    </nav>
  </header>;
}
