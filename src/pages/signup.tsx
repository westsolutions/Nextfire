import React from 'react';
import Head from 'next/head';
import AuthLayout from '@layouts/AuthLayout'; 
import dynamic from 'next/dynamic';
import SignUpForm from '@components/Auth/SignUpForm';
// const SignUpForm = dynamic(() => import('@components/Auth/SignUpForm'), {
// });

const SignUp: React.FC<{}> = () => {

  // const auth = useAuth();

  const signIn = () => {
    console.log('sign in click');
    //auth.signInWithEmailAndPassword('t.kumpanenko@gmail.com', 'password');
  };

  return (
    <AuthLayout>
      <div className="sign-in">
        <Head>
          Sign Up
        </Head>
        <SignUpForm />
      </div>
    </AuthLayout>
  );
};

export default SignUp;
