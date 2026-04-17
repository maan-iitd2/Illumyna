import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Map, User, X } from 'lucide-react';
import './SideNav.css';

interface SideNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideNav: React.FC<SideNavProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div className={`sidenav-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <div className={`sidenav ${isOpen ? 'open' : ''}`}>
        <div className="sidenav-header">
          <button className="icon-button" onClick={onClose} aria-label="Close Menu">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="sidenav-menu">
          <NavLink to="/" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Home size={20} strokeWidth={1.5} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/task" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <BookOpen size={20} strokeWidth={1.5} />
            <span>Current Task</span>
          </NavLink>
          <NavLink to="/knowledge" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <Map size={20} strokeWidth={1.5} />
            <span>Knowledge Base</span>
          </NavLink>
          <NavLink to="/profile" onClick={onClose} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            <User size={20} strokeWidth={1.5} />
            <span>Profile</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};
