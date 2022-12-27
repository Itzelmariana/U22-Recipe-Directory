import React from 'react';
import './ThemeSelector.css';
import { useTheme } from '../hooks/useTheme';

const themeColors = ['#58429c', '#249c6b', '#b70233', 'hotpink'];

export default function ThemeSelector() {
  const { changeColor } = useTheme();
  return (
    <div className='theme-selector'>
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
