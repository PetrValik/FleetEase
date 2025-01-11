import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthForm from '../../components/auth/AuthForm';
import AuthInput from '../../components/auth/AuthInput';
import * as Database from '../../database/database';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../../utils/firebase';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';

const SignUp: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      await Database.register(email, password, firstName, lastName);
      navigate('/signin');
    } catch (error) {
      console.error('Registration error:', error);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || 'An error occurred during registration');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const response = await Database.googleLogin(user);
      setUser(response.user);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during Google sign-up');
      }
    }
  };

  return (
    <div className="w-full max-w-[400px] px-4 mx-auto py-6">
      <div className="w-full max-w-[400px] px-4 mx-auto">
        <AuthHeader />
        <AuthForm
          title="Sign Up"
          onSubmit={handleSubmit}
          googleButtonText="Sign up with Google"
          onGoogleClick={handleGoogleSignUp}
          linkText="Already have an account? Sign In"
          linkTo="/signin"
        >
          <div className="space-y-3">
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
          </div>
          {error && <p className="text-red-500 text-xs md:text-sm mt-2">{error}</p>}
        </AuthForm>
      </div>
    </div>
  );
};

export default SignUp;

