import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import classnames from "classnames";
import { ACCESS_STEP2 } from "@constants/routes";
import { codeIsCorrect } from "@constants/checkAccessCode";
import { useRouter } from "next/router";

const AccessCodeSchema = Yup.object().shape({
  code: Yup.string().required("This field is required")
});

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
    if (codeIsCorrect(code, process.env.ACCESS_CODE)) {
      router.push({
        pathname: ACCESS_STEP2,
        query: { code }
      });
    } else {
      setError("Code is invalid");
    }
  };

  return (
    <>
      <h1>Step 1 | Enter your Access code</h1>
      <Formik
        initialValues={{
          code: ""
        }}
        validationSchema={AccessCodeSchema}
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
                placeholder="Access Code"
                className={classnames([
                  "form-control",
                  { "is-invalid": errors.code && touched.code }
                ])}
              />
              {errors.code && touched.code ? (
                <div className="invalid-feedback">{errors.code}</div>
              ) : null}
            </div>
            <button className="btn btn-danger btn-block" type="submit">
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
