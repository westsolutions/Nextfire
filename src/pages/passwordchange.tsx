import React from "react";
import Head from "next/head";
import AuthLayout from "@layouts/AuthLayout";
// import Re from "@components/Auth/Rese";

const ResetPassword: React.FC<{}> = () => (
  <AuthLayout>
    <div className="sign-in">
      <Head>Reset password Up</Head>
      {/* <SignInForm /> */}
    </div>
  </AuthLayout>
);

export default ResetPassword;
