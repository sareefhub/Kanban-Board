import React, { useState } from 'react';
import './AuthModal.css';
import { registerUser, loginUser } from '../../api/auth';
import { useAuth } from '../../context/AuthContext';
import { showLoginSuccess } from '../../utils/SweetAlertHelper';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        const data = await loginUser({
          username: form.username,
          password: form.password,
        });
        login(data.access_token, data.user);
        await showLoginSuccess(data.user.username);
      } else {
        const data = await registerUser({
          username: form.username,
          email: form.email,
          password: form.password,
        });
      }
      setLoading(false);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Something went wrong');
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
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              disabled={loading}
            />
          </div>

          {tab === 'register' && (
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>
          )}

          <div className="form-group">
            <label>{tab === 'login' ? 'Password' : 'Create Password'}</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder={tab === 'login' ? 'Enter your password' : 'Create a password'}
              required
              disabled={loading}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Please wait...' : (tab === 'login' ? 'Sign In' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
