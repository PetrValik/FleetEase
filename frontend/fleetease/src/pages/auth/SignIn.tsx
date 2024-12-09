import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthForm from '../../components/auth/AuthForm';
import AuthInput from '../../components/auth/AuthInput';
import { login } from '../../database/users/users';
import { useUser } from '../../contexts/UserContext';
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
      const response = await login(email, password);
      
      // Set the user in context
      console.log(response.user);
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

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign in logic
    console.log('Google sign in clicked');
  };

  return (
    <div className="w-full max-w-md px-4">
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

