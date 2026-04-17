import React from 'react';
import { Menu } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  onMenuClick: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="app-header">
      <div className="header-actions">
        <div className="toggle-wrapper" onClick={toggleDarkMode}>
          <span className="toggle-label">Light</span>
          <div className={`theme-toggle ${isDarkMode ? 'dark' : ''}`}>
            <div className="toggle-knob"></div>
          </div>
        </div>
        <button className="icon-button" onClick={onMenuClick} aria-label="Menu">
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>
    </header>
  );
};
