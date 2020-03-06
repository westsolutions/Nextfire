import React from "react";
import Head from "next/head";
import AuthLayout from "@layouts/AuthLayout";
import SignInForm from "@components/Auth/SignInForm";

const SignIn: React.FC<{}> = () => (
  <AuthLayout>
    <div className="sign-in">
      <Head>Sign Up</Head>
      <SignInForm />
    </div>
  </AuthLayout>
);

export default SignIn;
