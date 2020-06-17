import React from "react";
import AccessLayout from "@layouts/AccessLayout";
import SignUpForm from "@components/Auth/SignUpForm";

const SignUp: React.FC<{}> = () => (
  <AccessLayout>
    <div className="sign-in">
      <SignUpForm />
    </div>
  </AccessLayout>
);

export default SignUp;
