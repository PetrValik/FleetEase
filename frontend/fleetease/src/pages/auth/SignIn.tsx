import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthForm from '../../components/auth/AuthForm';
import AuthInput from '../../components/auth/AuthInput';
import * as Database from '../../database/database';
import { useUser } from '../../contexts/UserContext';
import { supabase } from '../../utils/supabaseClient';
import axios from 'axios';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await Database.login(email, password);
      
      // Set the user in context
      setUser(response.user);
      // Redirect to dashboard
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'Invalid email or password');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) throw error;

      // The user will be redirected to Google for authentication
      // After successful authentication, they will be redirected back to your app
      // You can handle this in your app's callback route
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during Google sign-in');
      }
    }
  };

  return (
    <div className="w-full max-w-md px-4 mx-auto h-full flex flex-col justify-center">
      <AuthHeader />
      <AuthForm
        title="Sign In"
        onSubmit={handleSubmit}
        googleButtonText="Sign in with Google"
        onGoogleClick={handleGoogleSignIn}
        linkText="Don't have an account? Sign Up"
        linkTo="/signup"
      >
        <AuthInput
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </AuthForm>
    </div>
  );
};

export default SignIn;

