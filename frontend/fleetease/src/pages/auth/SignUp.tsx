import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthForm from '../../components/auth/AuthForm';
import AuthInput from '../../components/auth/AuthInput';
import * as Database from '../../database/database';
import axios from 'axios';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Form submitted'); // Debug log

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await Database.register(email, password, firstName, lastName);
      // Registration successful, redirect to sign in page
      navigate('/signin');
    } catch (error) {
      console.error('Registration error:', error); // Debug log
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred during registration');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="w-full max-w-md px-4 mx-auto h-full flex flex-col justify-center">
      <AuthHeader />
      <AuthForm
        title="Sign Up"
        onSubmit={handleSubmit}
        googleButtonText="Sign up with Google"
        onGoogleClick={() => console.log('Google sign up clicked')}
        linkText="Already have an account? Sign In"
        linkTo="/signin"
      >
        <AuthInput
          id="firstName"
          type="text"
          label="First Name"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <AuthInput
          id="lastName"
          type="text"
          label="Last Name"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        <AuthInput
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </AuthForm>
    </div>
  );
};

export default SignUp;