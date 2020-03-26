import React, { useState } from "react";
import { useAuth } from "reactfire";
import { Formik, Form, Field } from "formik";
import classnames from "classnames";

interface AccessCodeDto {
  email: string;
}

const AccessCodeEmailForm: React.FC<{}> = () => {
  const [isError, setError] = useState<string | null>(null);
  const [isSuccess, setSuccess] = useState(null);

  const auth = useAuth();

  const checkCode = ({ email }: AccessCodeDto) => {
    setError(null);
    setSuccess(null);
  };

  return (
    <>
      <h1>Enter your password</h1>
      <Formik
        initialValues={{
          email: ""
        }}
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
                placeholder="Email"
                className={classnames([
                  "form-control",
                  { "is-invalid": errors.email && touched.email }
                ])}
              />
              {errors.email && touched.email ? (
                <div className="invalid-feedback">{errors.email}</div>
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
export default AccessCodeEmailForm;
