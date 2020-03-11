import React, { useState } from "react";
import { useAuth } from "reactfire";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import classnames from "classnames";
import Link from "next/link";
import { SIGN_UP, SIGN_IN } from "@constants/routes";
import { useRouter } from "next/router";

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Too Short!")
    .required("This field is required"),
  passwordConfirmation: Yup.string()
    .required("This field is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
});

interface ChangePasswordDto {
  password: string;
  passwordConfirmation: string;
}

const ResetPasswordForm: React.FC<{}> = () => {
  const [isError, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const router = useRouter();
  const auth = useAuth();

  const forgotChangeConfirmationRequest = ({ password }: ChangePasswordDto) => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    const oobCode: string = router.query.oobCode as string;
    auth
      .confirmPasswordReset(oobCode, password)
      .then(res => {
        setLoading(false);
        setSuccess(
          "Your password is changed. You will landed to login page in 5 seconds"
        );
        setTimeout(() => {
          router.push(SIGN_IN);
        }, 5000);
      })
      .catch(err => {
        setLoading(false);
        setError(err?.message ? err?.message : "Something went wrong");
        console.log(err?.message);
      });
  };

  return (
    <>
      <h1>Type your new password</h1>
      <Formik
        initialValues={{
          password: "",
          passwordConfirmation: ""
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={values => {
          forgotChangeConfirmationRequest(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="form-group">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className={classnames([
                  "form-control",
                  {
                    "is-invalid": errors.password && touched.password
                  }
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
export default ResetPasswordForm;
