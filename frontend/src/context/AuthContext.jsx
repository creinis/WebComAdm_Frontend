import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('AUTH_TOKEN');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('AUTH_TOKEN', token);
    setIsAuthenticated(true);
    console.log('User logged in with token:', token);
    navigate('/admin');
  };

  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    setIsAuthenticated(false);
    console.log('User logged out');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
