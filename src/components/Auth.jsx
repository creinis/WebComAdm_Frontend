import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Auth = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Auth;
