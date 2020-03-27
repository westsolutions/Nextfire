import React from "react";
import Head from "next/head";
import AccessLayout from "@layouts/AccessLayout";
import AccessCodeEmailForm from "@components/Auth/AccessCodeEmailForm";

const Step2: React.FC<{}> = () => (
  <AccessLayout>
    <div className="sign-in">
      <Head>Step 2 | Enter your email</Head>
      <AccessCodeEmailForm />
    </div>
  </AccessLayout>
);

export default Step2;
