import React from 'react';
import { NavLink } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <h1> Recipe Directory </h1>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/create'>Create</NavLink>
      <NavLink to='/search'>Search</NavLink>
      <NavLink to='/recipes/:id'>Recipes</NavLink>
    </nav>
  );
}
