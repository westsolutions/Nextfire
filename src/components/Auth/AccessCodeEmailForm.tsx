import React, { useState } from "react";
import { useAuth, useFirestore } from "reactfire";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import { useRouter } from "next/router";
import { INDEX } from "@constants/routes";
import { codeIsCorrect } from "@constants/checkAccessCode";
import { UserTable } from "@constants/db";

const AccessCodeEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("This field is required")
});

interface AccessEmailDto {
  email: string;
}

const AccessCodeEmailForm: React.FC<{}> = () => {
  const [isError, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();

  const checkCode = ({ email }: AccessEmailDto) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const accessCode: string = router.query.code as string;
    if (!accessCode) {
      setError("Access code is missing");
      return;
    }
    if (!codeIsCorrect(accessCode, process.env.ACCESS_CODE)) {
      setError("Access Code is invalid");
      return;
    }
    let _accessCode = accessCode.toLowerCase();

    auth
      .createUserWithEmailAndPassword(email, _accessCode)
      .then((user: any) => {
        localStorage.setItem(email, "TRUE");
        setSuccess("Your account is created... we're signing you in...");
        if (process.browser) {
          firestore
            .collection(UserTable)
            .add({
              email,
              // password,
              platform: window.location.origin
            })
            .then(() => {
              router.push(INDEX);
              setLoading(false);
            });
          return;
        }
        setLoading(false);
      })
      .catch(err => {
        if (err && err.code === "auth/email-already-in-use") {
          auth
            .signInWithEmailAndPassword(email, _accessCode)
            .then(() => {
              localStorage.setItem(email, "TRUE");
              router.push(INDEX);
              setLoading(false);
            })
            .catch(err => {
              setLoading(false);
              setError(err?.message ? err?.message : "Something went wrong");
              console.log(err?.message);
            });
        } else {
          setLoading(false);
          setError(err?.message ? err?.message : "Something went wrong");
          console.log(err?.message);
        }
      });
  };

  return (
    <>
      <h1>
        Step 2 | <span>Enter your email address.</span>
      </h1>
      <Formik
        initialValues={{
          email: ""
        }}
        validationSchema={AccessCodeEmailSchema}
        onSubmit={values => {
          checkCode(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="form-group">
              <Field
                name="email"
                type="email"
                placeholder="Email Address"
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
              {!isLoading && <span>Get Access</span>}
            </button>
          </Form>
        )}
      </Formik>
      {isError && <div className="alert alert-danger mt-4">{isError}</div>}
      {isSuccess && <div className="alert alert-success mt-4">{isSuccess}</div>}
    </>
  );
};
export default AccessCodeEmailForm;
