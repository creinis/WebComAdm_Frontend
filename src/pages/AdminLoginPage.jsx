import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Attempting login with', { username, password });

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        login(data.token);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed');
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="relative -mx-4 flex flex-col p-4">
        <div className="pb-6 flex flex-col items-center justify-center">
          <h1 className="buynow-card-title">Admin Login</h1>
          <div className="buynow-input-text"></div>
          <form onSubmit={handleLogin}>
            <div className="buynow-input-text">
              <input
                className="w-full p-1 text-white"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="AdminName"
              />
            </div>
            <div className="buynow-input-text">
              <input
                className="w-full p-1 text-white"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div>
              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
              {error && <p>{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
