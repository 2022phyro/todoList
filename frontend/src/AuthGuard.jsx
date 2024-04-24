import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../utils/auth';
import { Loader } from './Loader';

const AuthGuard = ({ children }) => {
  const [currentToken, setCurrentToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        setCurrentToken(token);
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false);
      }
      // const token = await getToken();
      // setCurrentToken(token);
      // setLoading(false);
    };

    fetchToken();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return currentToken ? children : <Navigate to="/" />;
};

export default AuthGuard;