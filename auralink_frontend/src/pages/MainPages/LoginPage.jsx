import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '@/components/site/Login';

function LoginPage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.logged_in) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  return <Login />;
}

export default LoginPage;
