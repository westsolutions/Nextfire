import React, { useState } from "react";
import { useAuth, useFirestore, useFirebaseApp } from "reactfire";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserTable } from "@constants/db";
import { pushUserToFullStory } from "../../helpers";
//TODO: fix this later
import * as firebase from "firebase";

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

const SignUpForm: React.FC<{
  onSubmit: () => void;
  chnangeAction: () => void;
}> = ({ onSubmit, chnangeAction }) => {
  const [isError, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const auth = useAuth();
  const firestore = useFirestore();

  const signUpWithFacebook = () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        setLoading(false);
        let user = result.user;
        const { displayName, email } = user;
        if (process.browser) {
          firestore
            .collection(UserTable)
            .add({
              displayName,
              email,
              // password,
              platform: window.location.origin
            })
            .then(() => {
              localStorage.setItem(email, "TRUE");
              onSubmit();
            });
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err?.message ? err?.message : "Something went wrong");
        console.log(err?.message);
      });
  };

  const signUp = ({ email, password, displayName }: User) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((user: any) => {
        pushUserToFullStory({
          id: email,
          email,
          displayName,
          platform: window.location.origin
        });
        auth.currentUser.updateProfile({
          displayName: displayName
        });
        setSuccess("Your account is created... we're signing you in...");
        auth
          .signInWithEmailAndPassword(email, password)
          .then(res => {
            setLoading(false);
            if (process.browser) {
              firestore
                .collection(UserTable)
                .add({
                  displayName,
                  email,
                  // password,
                  platform: window.location.origin
                })
                .then(() => {
                  localStorage.setItem(email, "TRUE");
                  onSubmit();
                });
            }
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
      <h1>Create an account to access content</h1>
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
              className="btn btn-danger btn-block"
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

            {process.env.FACEBOOK_AUTH_ENABLED && (
              <button
                onClick={() => signUpWithFacebook()}
                className="btn btn-primary btn-block btn-facebook"
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
                {!isLoading && <span>Sign Up with Facebook</span>}
              </button>
            )}
          </Form>
        )}
      </Formik>
      <div className="text-center mt-2">
        Already a member?&nbsp;
        <button className="btn btn-link" onClick={chnangeAction}>
          Login
        </button>
      </div>
      {isError && <div className="alert alert-danger mt-4">{isError}</div>}
      {isSuccess && <div className="alert alert-success mt-4">{isSuccess}</div>}
    </>
  );
};
export default SignUpForm;
