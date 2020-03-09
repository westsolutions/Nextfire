import React from "react";
import Head from "next/head";
import AuthLayout from "@layouts/AuthLayout";
import SignUpForm from "@components/Auth/SignUpForm";

const SignUp: React.FC<{}> = () => (
  <AuthLayout>
    <div className="sign-in">
      <Head>Sign Up</Head>
      <SignUpForm />
    </div>
  </AuthLayout>
);

export default SignUp;
