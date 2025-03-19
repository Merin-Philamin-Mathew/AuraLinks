// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { AUTH_URLS } from '@/config/apis/urls';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle Google OAuth login
  const handleGoogleLogin = () => {
    setIsLoading(true);
    setError('');
    
    // Redirect to Django's Google OAuth endpoint
    window.location.href = AUTH_URLS.google_login
  };

  return (
    <div className="min-h-screen flex items-center justify-center shadow-2xl bg-background">
      <div className="max-w-md w-full space-y-8 p-8 bg-card rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img 
            src="/aura_links.svg" 
            alt="AuraLinks Logo" 
            className="h-24 mb-2" 
          />
          <h1 className="text-3xl font-bold gradient-text">AuraLinks</h1>
          <p className="mt-2 text-muted-foreground">Connect with your tools</p>
        </div>
        
        {error && (
          <div className="p-3 rounded bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}
        
        <div className="mt-8 space-y-6">
          
          <div className="space-y-4">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="group aura-glow w-full flex justify-center items-center gap-3 py-3 px-4 border border-input rounded-md bg-card text-foreground hover:bg-secondary transition-colors"
            >
              <FaGoogle className="text-chart-3 text-xl" />
              <span className="font-medium">Continue with Google</span>
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or</span>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/about" 
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Learn more about AuraLinks
            </Link>
          </div>
          
          <p className="mt-2 text-center text-sm text-muted-foreground">
            By continuing, you agree to AuraLinks'<br />
            <Link to="/terms" className="font-medium text-primary hover:text-primary/80">
              Terms of Service
            </Link> and{' '}
            <Link to="/privacy" className="font-medium text-primary hover:text-primary/80">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;