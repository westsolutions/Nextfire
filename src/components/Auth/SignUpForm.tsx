import React, { useState } from "react";
import { useAuth } from "reactfire";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { SIGN_IN, INDEX } from "@constants/routes";

const SignupSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("This field is required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("This field is required"),
  passwordConfirmation: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
});

interface User {
  email: string;
  password: string;
  displayName?: string;
}

const SignUpForm: React.FC<{}> = () => {
  const [isError, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const auth = useAuth();

  const signUp = ({ email, password, displayName }: User) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user: any) => {
        auth.currentUser.updateProfile({
          displayName: displayName
        });
        setSuccess("Your account is created. Wait a few seconds you");
        auth
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            setLoading(false);
            localStorage.setItem(email, "TRUE");
            router.push(INDEX);
          })
          .catch(err => {
            setLoading(false);
            setError(err?.message ? err?.message : "Something went wrong");
            console.log(err?.message);
          });
      })
      .catch(err => {
        setLoading(false);
        setError(err?.message ? err?.message : "Something went wrong");
        console.log(err?.message);
      });
  };

  return (
    <>
      <h1>Create Your Free account to access the live stream</h1>
      <Formik
        initialValues={{
          displayName: "",
          email: "",
          password: "",
          passwordConfirmation: ""
        }}
        validationSchema={SignupSchema}
        onSubmit={values => {
          signUp(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="form-group">
              <Field
                name="displayName"
                placeholder="Full name"
                className={classnames([
                  "form-control",
                  { "is-invalid": errors.displayName && touched.displayName }
                ])}
              />
              {errors.displayName && touched.displayName ? (
                <div className="invalid-feedback">{errors.displayName}</div>
              ) : null}
            </div>
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
            <div className="form-group">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={classnames([
                  "form-control",
                  { "is-invalid": errors.password && touched.password }
                ])}
              />
              {errors.password && touched.password ? (
                <div className="invalid-feedback">{errors.password}</div>
              ) : null}
            </div>
            <div className="form-group">
              <Field
                name="passwordConfirmation"
                type="password"
                placeholder="Password confirmation"
                className={classnames([
                  "form-control",
                  {
                    "is-invalid":
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                  }
                ])}
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <div className="invalid-feedback">
                  {errors.passwordConfirmation}
                </div>
              ) : null}
            </div>
            <button
              className="btn btn-primary btn-block"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && (
                <div
                  className="spinner-border text-light spinner-border-sm"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div>
              )}
              {!isLoading && <span>Sign Up</span>}
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-2">
        Already a member?&nbsp;
        <Link href={SIGN_IN}>
          <a>Login</a>
        </Link>
      </div>
      {isError && <div className="alert alert-danger mt-4">{isError}</div>}
      {isSuccess && <div className="alert alert-success mt-4">{isSuccess}</div>}
    </>
  );
};
export default SignUpForm;
