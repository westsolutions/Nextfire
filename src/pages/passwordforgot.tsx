import React from 'react';
import Head from 'next/head';
import AuthLayout from '@layouts/AuthLayout';
import ForgotPasswordForm from '@components/Auth/ForgotPasswordForm';

const PasswordForgot: React.FC<unknown> = () => (
  <AuthLayout>
    <div className="sign-in">
      <Head>Forgot password form</Head>
      <ForgotPasswordForm />
    </div>
  </AuthLayout>
);

export default PasswordForgot;
