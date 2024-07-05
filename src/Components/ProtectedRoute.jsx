import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtVerify } from 'jose';
import SecureLS from 'secure-ls';
import PropTypes from 'prop-types';

const ls = new SecureLS({ encodingType: 'aes' });

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = ls.get('authToken');

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      try {
        const secret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
        await jwtVerify(token, secret);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Invalid token:', error);
        ls.remove('authToken');
        setIsAuthenticated(false);
      }
    };

    verifyToken();
  }, []);

  if (isAuthenticated === null) {
    // Still verifying, you might want to show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;