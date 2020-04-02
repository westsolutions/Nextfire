import React from "react";
import Head from "next/head";
import AuthLayout from "@layouts/AuthLayout";
import ResetPasswordForm from "@components/Auth/ResetPasswordForm";

const ResetPassword: React.FC<{}> = () => (
  <AuthLayout>
    <div className="sign-in">
      <Head>Reset password Up</Head>
      <ResetPasswordForm />
    </div>
  </AuthLayout>
);

export default ResetPassword;
