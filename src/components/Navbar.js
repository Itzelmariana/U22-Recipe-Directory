import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useTheme } from '../hooks/useTheme';

import './Navbar.css';

export default function Navbar() {
  // const { color } = useContext(ThemeContext); we transfer this to a hook
  const { color } = useTheme();

  return (
    <nav className='navbar' style={{ background: color }}>
      <h1>
        <Link to='/'>Recipe Directory </Link>
      </h1>
      <SearchBar />
      <NavLink to='/create?action=create' className='box'>
        Create Recipe
      </NavLink>
    </nav>
  );
}
