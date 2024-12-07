import React from 'react';
import AuthHeader from '../../components/auth/AuthHeader';
import AuthForm from '../../components/auth/AuthForm';
import AuthInput from '../../components/auth/AuthInput';

const SignUp: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign up logic
    console.log('Sign up submitted');
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google sign up logic
    console.log('Google sign up clicked');
  };

  return (
    <div className="w-full max-w-md px-4">
      <AuthHeader />
      <AuthForm
        title="Sign Up"
        onSubmit={handleSubmit}
        googleButtonText="Sign up with Google"
        onGoogleClick={handleGoogleSignUp}
        linkText="Already have an account? Sign In"
        linkTo="/signin"
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
        <AuthInput
          id="confirmPassword"
          type="password"
          label="Confirm Password"
          placeholder="Confirm your password"
        />
      </AuthForm>
    </div>
  );
};

export default SignUp;

