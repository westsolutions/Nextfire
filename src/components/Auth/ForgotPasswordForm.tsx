import React, { useState } from "react";
import { useAuth } from "reactfire";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import Link from "next/link";
import { SIGN_UP } from "@constants/routes";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("This field is required")
});

interface ResetPasswordDto {
  email: string;
}

const ForgotPasswordForm: React.FC<{}> = () => {
  const [isError, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const auth = useAuth();

  const forgotPasswordRequest = ({ email }: ResetPasswordDto) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    auth
      .sendPasswordResetEmail(email)
      .then(res => {
        setLoading(false);
        setSuccess("Check your email");
        console.log(res);
      })
      .catch(err => {
        setLoading(false);
        setError(err?.message ? err?.message : "Something went wrong");
        console.log(err?.message);
      });
  };

  return (
    <>
      <h1>Enter your password</h1>
      <Formik
        initialValues={{
          email: ""
        }}
        validationSchema={ForgotPasswordSchema}
        onSubmit={values => {
          forgotPasswordRequest(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="form-group">
              <Field
                name="email"
                type="email"
                placeholder="E-mail"
                className={classnames([
                  "form-control",
                  { "is-invalid": errors.email && touched.email }
                ])}
              />
              {errors.email && touched.email ? (
                <div className="invalid-feedback">{errors.email}</div>
              ) : null}
            </div>
            <button
              disabled={isLoading}
              className="btn btn-primary btn-block"
              type="submit"
            >
              {isLoading && (
                <div
                  className="spinner-border text-light spinner-border-sm"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              {!isLoading && <span>Reset password</span>}
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-2">
        Don't have account yet?&nbsp;
        <Link href={SIGN_UP}>
          <a> Create account</a>
        </Link>
      </div>
      {isError && <div className="alert alert-danger mt-4">{isError}</div>}
      {isSuccess && <div className="alert alert-success mt-4">{isSuccess}</div>}
    </>
  );
};
export default ForgotPasswordForm;
