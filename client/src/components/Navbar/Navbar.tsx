import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';

export interface NavbarProps {
  boardTitle: string;
  statusLabel: string;
  username?: string;
  notifyCount?: number;
  onNotifyClick?: () => void;
  onSignIn?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  boardTitle,
  statusLabel,
  username,
  notifyCount = 0,
  onNotifyClick,
  onSignIn,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">
          {boardTitle}
          <span className="status-label">{statusLabel}</span>
        </h1>
      </div>
      <div className="navbar-actions">
        <button
          className="btn icon-btn notify-btn"
          title="Notifications"
          onClick={onNotifyClick}
        >
          <i className="fas fa-bell"></i>
          {notifyCount > 0 && <span className="badge">{notifyCount}</span>}
        </button>
        <div className="user-menu" ref={ref}>
          <button
            className="btn icon-btn"
            onClick={() => setMenuOpen(o => !o)}
          >
            <i className="fas fa-user"></i>
          </button>
          {menuOpen && (
            <ul className="user-dropdown">
              <li className="username">{username || 'Guest'}</li>
              <li onClick={onSignIn}>Sign In</li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
