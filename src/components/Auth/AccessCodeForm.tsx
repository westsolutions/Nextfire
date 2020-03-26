import React, { useState } from "react";
import { useAuth } from "reactfire";
import { Formik, Form, Field } from "formik";
import classnames from "classnames";
import { ACCESS_STEP2 } from "@constants/routes";
import { useRouter } from "next/router";

interface AccessCodeDto {
  code: string;
}

const AccessCodeForm: React.FC<{}> = () => {
  const [isError, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(null);

  const router = useRouter();

  const checkCode = ({ code }: AccessCodeDto) => {
    setError(null);
    setSuccess(null);
    if (code === process.env.ACCESS_CODE) {
      router.push(ACCESS_STEP2);
    } else {
      setError("Code is invalid");
    }
  };

  return (
    <>
      <h1>Enter your password</h1>
      <Formik
        initialValues={{
          code: ""
        }}
        onSubmit={values => {
          checkCode(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="form">
            <div className="form-group">
              <Field
                name="code"
                type="text"
                placeholder="Code"
                className={classnames([
                  "form-control",
                  { "is-invalid": errors.code && touched.code }
                ])}
              />
              {errors.code && touched.code ? (
                <div className="invalid-feedback">{errors.code}</div>
              ) : null}
            </div>
            <button className="btn btn-primary btn-block" type="submit">
              <span>Verify Access Code</span>
            </button>
          </Form>
        )}
      </Formik>
      {isError && <div className="alert alert-danger mt-4">{isError}</div>}
      {isSuccess && <div className="alert alert-success mt-4">{isSuccess}</div>}
    </>
  );
};
export default AccessCodeForm;
