import React from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useTheme } from '../hooks/useTheme';

import './Navbar.css';

export default function Navbar() {
  // const { color } = useContext(ThemeContext); we transfer this to a hook
  const { color } = useTheme();

  return (
    <nav className='navbar' style={{ background: color }}>
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
