import React from "react";
import Head from "next/head";
import AuthLayout from "@layouts/AuthLayout";
import AccessCodeEmailForm from "@components/Auth/AccessCodeEmailForm";

const Step2: React.FC<{}> = () => (
  <AuthLayout>
    <div className="sign-in">
      <Head>Step 2 | Enter your email</Head>
      <AccessCodeEmailForm />
    </div>
  </AuthLayout>
);

export default Step2;
