import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

const Header = () => {
  return (
    <nav className='nav'>
      <Link to="/">Home</Link>
      <Link to="/Register">Sign up</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Header;