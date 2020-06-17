import React from "react";
import AccessLayout from "@layouts/AccessLayout";
import SignInForm from "@components/Auth/SignInForm";

const SignIn: React.FC<{}> = () => (
  <AccessLayout>
    <div className="sign-in">
      <SignInForm />
    </div>
  </AccessLayout>
);

export default SignIn;
