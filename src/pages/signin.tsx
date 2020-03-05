import React from 'react';
import Head from 'next/head';
import AuthLayout from '@layouts/AuthLayout'; 

const SignIn: React.FC<{}> = () => {
  return (
    <AuthLayout>
      <div className="sign-in">
        <Head>
          Sign In
        </Head>
        sign In
      </div>
    </AuthLayout>
  );
};

export default SignIn;
