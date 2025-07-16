import React, { useState, useRef, useEffect } from 'react';
import { confirmLogout, showLogoutSuccess } from '../../utils/SweetAlertHelper';
import './Navbar.css';

export interface NavbarProps {
  boardTitle: string;
  statusLabel: string;
  username?: string | null;
  notifyCount?: number;
  onNotifyClick?: () => void;
  onSignIn?: () => void;
  onLogout?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  boardTitle,
  statusLabel,
  username,
  notifyCount = 0,
  onNotifyClick,
  onSignIn,
  onLogout,
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

  const handleLogoutClick = async () => {
    const confirmed = await confirmLogout();
    if (confirmed && onLogout) {
      onLogout();
      showLogoutSuccess();
    }
  };

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
              <li className="username">{username ?? 'Guest'}</li>
              {username ? (
                <li onClick={handleLogoutClick}>Logout</li>
              ) : (
                <li onClick={onSignIn}>Sign In</li>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
