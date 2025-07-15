import React, { useState } from 'react';
import './AuthModal.css';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 'login') {
      // TODO: call login API
      console.log('Logging in with', form);
    } else {
      // TODO: call register API
      console.log('Registering with', form);
    }
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Welcome to Kanban Board</h2>
        <p>Sign in to your account or create a new one to get started.</p>

        <div className="tabs">
          <button
            className={tab === 'login' ? 'active' : ''}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={tab === 'register' ? 'active' : ''}
            onClick={() => setTab('register')}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>{tab === 'login' ? 'Password' : 'Create Password'}</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder={tab === 'login' ? 'Enter your password' : 'Create a password'}
              required
            />
          </div>
          {tab === 'register' && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}
          <button type="submit" className="submit-btn">
            {tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
