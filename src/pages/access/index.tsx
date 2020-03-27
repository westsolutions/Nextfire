import React from "react";
import Head from "next/head";
import AccessLayout from "@layouts/AccessLayout";
import AccessCodeForm from "@components/Auth/AccessCodeForm";

const Step1: React.FC<{}> = () => (
  <AccessLayout>
    <div className="sign-in">
      <Head>Step 1 | Enter your access code</Head>
      <AccessCodeForm />
    </div>
  </AccessLayout>
);

export default Step1;
