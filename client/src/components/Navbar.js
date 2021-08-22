import React, { useState } from 'react';
import './Navbar.css';
import { NavLink as Link } from 'react-router-dom';

const activeStyle = {
  textDecoration: 'underline',
  fontWeight: 'bold',
};
const Navbar = () => {
  return (
    <div className='navbar-container'>
      <Link activeStyle={activeStyle} className='nav-link' exact to='/'>
        Home
      </Link>
      <Link activeStyle={activeStyle} className='nav-link' to='/admin'>
        Admin
      </Link>
      <Link activeStyle={activeStyle} className='nav-link' to='/stats'>
        Stats
      </Link>
    </div>
  );
};
export default Navbar;
