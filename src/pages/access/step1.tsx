import React from "react";
import Head from "next/head";
import AuthLayout from "@layouts/AuthLayout";
import AccessCodeForm from "@components/Auth/AccessCodeForm";

const Step1: React.FC<{}> = () => (
  <AuthLayout>
    <div className="sign-in">
      <Head>Step 1 | Enter your access code</Head>
      <AccessCodeForm />
    </div>
  </AuthLayout>
);

export default Step1;
