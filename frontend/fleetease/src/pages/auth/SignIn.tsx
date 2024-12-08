import React from 'react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthForm from '../../components/auth/AuthForm';
import AuthInput from '../../components/auth/AuthInput';

const SignIn: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign in logic
    console.log('Sign in submitted');
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
        />
        <AuthInput
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />
      </AuthForm>
    </div>
  );
};

export default SignIn;

