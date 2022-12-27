import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';

import './Navbar.css';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <h1>
        <NavLink to='/recipes/:id'>Recipe Directory </NavLink>
      </h1>

      <SearchBar />

      <NavLink to='/create' className='box'>
        Create Recipe
      </NavLink>
    </nav>
  );
}
