import React, { useState } from "react";
import { useAuth } from "reactfire";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import Link from "next/link";
import { SIGN_UP, PASSWORD_FORGOT, INDEX } from "@constants/routes";
import "@firebase/auth";
import { useRouter } from "next/router";
import * as firebase from "firebase";

const SignInSchema = Yup.object().shape({
  email: Yup.string().required("This field is required"),
  password: Yup.string().required("This field is required")
});

interface Login {
  email: string;
  password: string;
}

const SignInForm: React.FC<{}> = () => {
  const [isError, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const auth = useAuth();
  const provider = new firebase.auth.FacebookAuthProvider();

  const signInWithFacebook = () => {
    setError(null);
    setSuccess(null);
    setLoading(true);
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        setLoading(false);
        localStorage.setItem(result.user.email, "TRUE");
        router.push(INDEX);
      })
      .catch(err => {
        setLoading(false);
        setError(err?.message ? err?.message : "Something went wrong");
        console.log(err?.message);
      });
  };

  const signIn = ({ email, password }: Login) => {
    setError(null);
    setSuccess(null);
    setLoading(true);
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
  };

  return (
    <>
      <h1>Login to your account</h1>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={SignInSchema}
        onSubmit={values => {
          signIn(values);
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
              <div className="text-center">
                <small>
                  Don't know your password?&nbsp;
                  <Link href={PASSWORD_FORGOT}>
                    <a>Forgot password</a>
                  </Link>
                </small>
              </div>
              {errors.password && touched.password ? (
                <div className="invalid-feedback">{errors.password}</div>
              ) : null}
            </div>
            <button
              className="btn btn-danger btn-block"
              disabled={isLoading}
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
              {!isLoading && <span>Login</span>}
            </button>
            <button
              onClick={() => signInWithFacebook()}
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
              {!isLoading && <span>Login with Facebook</span>}
            </button>
          </Form>
        )}
      </Formik>
      <div className="text-center mt-2">
        Don't have account yet?&nbsp;
        <Link href={SIGN_UP}>
          <a>Create account</a>
        </Link>
      </div>
      {isError && <div className="alert alert-danger mt-4">{isError}</div>}
      {isSuccess && <div className="alert alert-success mt-4">{isSuccess}</div>}
    </>
  );
};
export default SignInForm;
