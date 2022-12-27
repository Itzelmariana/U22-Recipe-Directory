import React from 'react';
import './ThemeSelector.css';
import { useTheme } from '../hooks/useTheme';
import modeIcon from '../assets/modeIcon.svg';

const themeColors = ['#58429c', '#249c6b', '#b70233', 'hotpink', 'purple'];

export default function ThemeSelector() {
  const { changeColor, changeMode, mode } = useTheme();
  function toggleMode() {
    changeMode(mode === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='theme-selector'>
      <div className='mode-toggle'>
        <img
          src={modeIcon}
          alt='mode icon dark/light'
          onClick={toggleMode}
          style={{ filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)' }}
        />
      </div>
      <div className='theme-buttons'>
        {themeColors.map((color) => (
          <div
            key={color}
            onClick={() => changeColor(color)}
            style={{ background: color }}
          />
        ))}
      </div>
    </div>
  );
}
