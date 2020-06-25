import React from 'react';
import Head from 'next/head';
import AuthLayout from '@layouts/AuthLayout';
import SignInForm from '@components/Auth/SignInForm';

const SignIn: React.FC<unknown> = () => (
  <AuthLayout>
    <Head>
      <title>Sign In</title>
    </Head>
    <div className="sign-in">
      <SignInForm />
    </div>
  </AuthLayout>
);

export default SignIn;
