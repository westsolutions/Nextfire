import React from 'react';
import Head from 'next/head';
import AuthLayout from '@layouts/AuthLayout';
import SignUpForm from '@components/Auth/SignUpForm';

const SignUp: React.FC<unknown> = () => (
  <AuthLayout>
    <div className="sign-in">
      <Head>
        <title>Sign Up</title>
      </Head>

      <SignUpForm />
    </div>
  </AuthLayout>
);

export default SignUp;
